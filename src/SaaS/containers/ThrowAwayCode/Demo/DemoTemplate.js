import React, { useEffect, useState } from 'react';
import {
    Button,
    FormInput,
    Card,
    CardBody,
} from 'shards-react';
import {
    Link
  } from "react-router-dom";
import {
    faLocationArrow, faMoneyBillAlt, faCreditCard, 
    faFilePdf,faCheckCircle, faDotCircle, faCheck, faPencilAlt, faPhone, faCashRegister, faEnvelope, faArrowLeft, faGlasses

} from '@fortawesome/free-solid-svg-icons';
import satLogo from '../../../../final-art-sat.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {callAPI4Receipt, buildAPIcall, request2API,parseAPIresponse} from './ReceiptUtils'
import {ReceiptDB} from '../../../../services/DBservice';
import GeneratePDF from './GeneratePDF/GeneratePDF'


import './DemoTemplate.scss';
import {createPDF, craftString }from './GeneratePDF/UtilsPDF';


function DemoTemplate(props) {
    const {navHelper} = props;
    const PAYMENT_MENTHODS = ["efectivo", "tarjeta"];
    const [redirectURL, setRedirectURL] = useState("");
    const readyFlag = redirectURL !== "";
    const [consumption, setConsumption] = useState("servicios profesionales");
    const [name, setName] = useState("Anónimo");
    const [total, setTotal] = useState(0);
    const [nit, setNIT] = useState("CF");
    const [address, setAddress] = useState("Ciudad de Guatemala");
    const [phoneNum, setPhoneNum] = useState("");
    const [paymentPTR, setPaymentPTR] = useState(1);
    const [apiCallLoading, setAPILoading] = useState(false);
    const [isCashSelected, setCashOrCard] = useState(true);
    const [pdfURL, setPDFurl] = useState("");
    const [reviewed, setReviewed] = useState(false);
    const [isDone, setDone] = useState(false);
    const [isReadyForNext, setIsReadyForNext] = useState(false);
    const [pdfFlag, setPDFFlag] = useState(false);

    const paymentMethod = isCashSelected ? "efectivo" : "tarjeta";

    const TEXT_HELPER = ["Nombre cliente:", "Consumo:", "Total consumido Qtz:", "Número de NIT:", "Dirección:", "Número celular:", "Método de pago:"];
    const FIELDS_HELPER = [name, consumption, total, nit, address, phoneNum, paymentMethod];
    const METHODS_HELPER = [setName, setConsumption, setTotal, setNIT, setAddress, setPhoneNum]

    const {insertReceipt} = ReceiptDB();


    const generateReceipt = () => {
        if(!phoneNum || total ===0) return;
        setReviewed(false);
        setDone(true);
        const APIreq = buildAPIcall(paymentMethod,name, nit, consumption, total);
        setAPILoading(true);
        
        request2API(APIreq).then(data=>{
        const TAX_DETAIL = parseAPIresponse(data);
        const whatsAppTaxURL = callAPI4Receipt(FIELDS_HELPER,TAX_DETAIL);

        
        var insertionData = {};
        insertionData['whatsAppURL'] = whatsAppTaxURL;
        insertionData['req'] = APIreq;
        insertionData['res'] = data;
        setRedirectURL(whatsAppTaxURL);
        insertReceipt(insertionData);
        setAPILoading(false);
        setIsReadyForNext(true);
        setPDFFlag(true);
        })
       


    }

    const nextPaymentMethod = () => {
        const newPointer = (paymentPTR + 1) % PAYMENT_MENTHODS.length;
        setPaymentPTR(newPointer);
    };
    console.log(paymentMethod)
    return (
        <>
        <div className="demo-container">
            <div className="header-demo">
                <Link to="/">
                {/* <img className="listo-logo" src={fireLogo} /> */}
                </Link>
                {(!reviewed && !isReadyForNext  && !apiCallLoading )&& <Button className="go-back" onClick={()=>navHelper("")}> <FontAwesomeIcon icon={faArrowLeft}/>Regresar </Button>}                
                </div>
           { reviewed && <div className="revision-text">
           <Card  className="card">
                <CardBody className="card-body">
                {TEXT_HELPER.map((x, ix) =>
                <>
                
                <h5><FontAwesomeIcon icon={faCheck}/> <b>{x}</b></h5>
                <h4>{x==="Total consumido Qtz:" && "Qtz. "}{FIELDS_HELPER[ix]}</h4>
                
                
                </>)
            }
            </CardBody>
                </Card>
            </div>}
            {!reviewed && !isReadyForNext  && !apiCallLoading && <div className="whatsApp-fields-demo">
                {METHODS_HELPER.map((helperFunction, ix) =>
                    <>
                        <div className="headery-demo"><h3>{TEXT_HELPER[ix]}</h3></div>
                        <FormInput
                            className="input"
                            type="text"
                            size="lg"
                            placeholder={FIELDS_HELPER[ix]}
                            // value={FIELDS_HELPER[ix]}
                            onChange={(e) => {
                                helperFunction(e.target.value);
                            }}
                        />
                    </>
                )}
            </div>}
           { !reviewed && !isDone && <div className="demo-summary">
                <Button pill className={isCashSelected ? "pill-btn" : "not-pill-btn"} onClick={() => {
                    setCashOrCard(!isCashSelected);
                }}
                >
                    <FontAwesomeIcon icon={faMoneyBillAlt} />{'  Efectivo'}
                </Button>
                <Button pill className={!isCashSelected ? "pill-btn" : "not-pill-btn"} onClick={() => {
                    setCashOrCard(!isCashSelected);
                }}

                >
                    <FontAwesomeIcon icon={faCreditCard} />{'  Tarjeta'}
                </Button>
            </div>}
            <div className="final-action-buttons-demo">
                {/* <Button onClick={props.onBack} className="button-secondary" outline block>
          <FontAwesomeIcon icon={faArrowAltCircleLeft}/>{'  '}Regresar
        </Button> */}
            {!reviewed && !isDone && !apiCallLoading && (
                <>
                 <Button
            onClick={() => setReviewed(true)}
            className="button-revision">
            <FontAwesomeIcon icon={faGlasses}/> {" Revisar factura"}
                 </Button>
                 </>
                 )
            }
                {!apiCallLoading && !readyFlag && reviewed &&
                  ( <> 
                  <Button
                        onClick={() => generateReceipt()}
                        href={redirectURL}
                        className="button-gen" block>
                      <FontAwesomeIcon icon={faEnvelope}/>  {"Certificar"}
                    </Button>
                    <Button
                onClick={() => setReviewed(false)}
                className="edit-receipt" block>
                <FontAwesomeIcon icon={faPencilAlt}/> {"Editar "}
                 </Button>
                    </>
                    )
                
                }
                {apiCallLoading &&
                <div className="loading-btns"> 
                    <Button
                        className="button" block>
                        Verificando...
                    </Button>
                    <img className="sat-logo" src={satLogo} />
                </div>
                }
            </div>
                <div className="pdf-section">
                {/* {readyFlag && <Button className="download-pdf" href={pdfURL}> Descargar PDF <FontAwesomeIcon icon={faFilePdf}/>  </Button>} */}
                {readyFlag && <GeneratePDF whatsAppURL={redirectURL} printingElements={FIELDS_HELPER} pdfFlag ={pdfFlag} />}
                { readyFlag && <Button className="go-back" onClick={()=>navHelper("")}> <FontAwesomeIcon icon={faArrowLeft}/>Regresar </Button>}            
                </div>
        </div>
        </>
    );
}

export default DemoTemplate;