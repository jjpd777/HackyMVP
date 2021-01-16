import React, { useEffect, useState } from 'react';
import {
    Button,
    FormInput
} from 'shards-react';
import {
    Link
  } from "react-router-dom";
import {
    faLocationArrow, faMoneyBillAlt, faCreditCard, faFilePdf,

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {callAPI4Receipt, buildAPIcall, request2API,parseAPIresponse} from './ReceiptUtils'
import {ReceiptDB} from '../../services/DBservice';
import GeneratePDF from './GeneratePDF/GeneratePDF'


import './DemoTemplate.scss';
import fireLogo from '../../fire-logo.png';
import {createPDF, craftString }from './GeneratePDF/UtilsPDF';


function DemoTemplate() {
    const PAYMENT_MENTHODS = ["efectivo", "tarjeta"];
    const [redirectURL, setRedirectURL] = useState("");
    const readyFlag = redirectURL !== "";
    const [consumption, setConsumption] = useState("alimentos");
    const [name, setName] = useState("Anónimo");
    const [total, setTotal] = useState(0);
    const [nit, setNIT] = useState("CF");
    const [address, setAddress] = useState("Ciudad de Guatemala");
    const [phoneNum, setPhoneNum] = useState("");
    const [paymentPTR, setPaymentPTR] = useState(0);
    const [apiCallLoading, setAPILoading] = useState(false);
    const [isCashSelected, setCashOrCard] = useState(true);
    const [pdfURL, setPDFurl] = useState("");

    const paymentMethod = isCashSelected ? "efectivo" : "tarjeta";

    const TEXT_HELPER = ["Nombre cliente:", "Consumo:", "Total consumido Qtz:", "Número de NIT:", "Dirección:", "Número celular:"];
    const FIELDS_HELPER = [name, consumption, total, nit, address, phoneNum, paymentMethod];
    const METHODS_HELPER = [setName, setConsumption, setTotal, setNIT, setAddress, setPhoneNum]

    const {insertReceipt} = ReceiptDB();


    const generateReceipt = () => {
        if(!phoneNum || total ===0) return;
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
        })
       


    }
    const resetVariables = () => {

        setRedirectURL("");
    };

    const nextPaymentMethod = () => {
        const newPointer = (paymentPTR + 1) % PAYMENT_MENTHODS.length;
        setPaymentPTR(newPointer);
    };
    console.log(paymentMethod)
    return (
        <div className="demo-container">
            <div className="header-demo">
                <Link to="/">
                <img className="listo-logo" src={fireLogo} />
                </Link>
                <h2>Demostración</h2>
            </div>
            <div className="whatsApp-fields-demo">
                {METHODS_HELPER.map((helperFunction, ix) =>
                    <>
                        <div className="headery-demo"><h2>{TEXT_HELPER[ix]}</h2></div>
                        <FormInput
                            className="input"
                            type="text"
                            size="lg"
                            placeholder={FIELDS_HELPER[ix]}
                            value={FIELDS_HELPER[ix]}
                            onChange={(e) => {
                                helperFunction(e.target.value);
                            }}
                        />
                    </>
                )}
            </div>
            <div className="demo-summary">
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
            </div>
            <div className="final-action-buttons-demo">
                {/* <Button onClick={props.onBack} className="button-secondary" outline block>
          <FontAwesomeIcon icon={faArrowAltCircleLeft}/>{'  '}Regresar
        </Button> */}
                {!apiCallLoading && !readyFlag &&
                    <Button
                        onClick={() => generateReceipt()}
                        href={redirectURL}
                        className="button" block>
                        {"Generar factura"}
                    </Button>}
                {apiCallLoading &&
                    <Button
                        className="button" block>
                        Verificando con la SAT...
                </Button>}
            </div>
                <div className="pdf-section">
                {/* {readyFlag && <Button className="download-pdf" href={pdfURL}> Descargar PDF <FontAwesomeIcon icon={faFilePdf}/>  </Button>} */}
                {readyFlag && <GeneratePDF whatsAppURL={redirectURL} printingElements={FIELDS_HELPER} />}

                </div>
        </div>
    );
}

export default DemoTemplate;