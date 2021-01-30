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
    faFilePdf, faCheckCircle, faDotCircle, faCheck, faPencilAlt, faPhone, faCashRegister, faEnvelope, faArrowLeft, faGlasses, faPeopleCarry, faTshirt

} from '@fortawesome/free-solid-svg-icons';
import satLogo from '../../../../final-art-sat.jpeg';
import welcome from '../../../../welcomee.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { callAPI4Receipt, buildAPIcall, request2API, parseAPIresponse } from '../SpecialHelpers/ReceiptBuilder/ReceiptUtils'
// import {GeneratePDF }from '../SpecialHelpers/GeneratePDF/BuildPDF';
import FinalTaxSegment from './FinalTaxSegment';
import { Schemas } from '../Database/Schemas';


import './TaxSegment.scss';
import { createPDF, craftString } from '../SpecialHelpers/GeneratePDF/UtilsPDF';
import { ReceiptDB, DateUtils, SaasDB } from '../Database/DatabaseFunctions';


function TaxSegment(props) {
    const { navHelper, currentUser } = props;
    const {insertTaxSAT} = SaasDB(!!currentUser ? currentUser : "demostracion");
    const [redirectURL, setRedirectURL] = useState("");
    const readyFlag = redirectURL !== "";
    const [isConsumptionProduct, setConsumptionCategory] = useState(false);
    const [consumption, setConsumption] = useState("servicios profesionales");
    const [name, setName] = useState("Anónimo");
    const [total, setTotal] = useState(0);
    const [nit, setNIT] = useState("CF");
    const [address, setAddress] = useState("Ciudad de Guatemala");
    const [phoneNum, setPhoneNum] = useState("");
    const [apiCallLoading, setAPILoading] = useState(false);
    const [isCashSelected, setCashOrCard] = useState(true);
    const [reviewed, setReviewed] = useState(false);
    const [isDone, setDone] = useState(false);
    const [isReadyForNext, setIsReadyForNext] = useState(false);
    const [proceedHelper, setProceedH] = useState(false);

    const { insertReceipt } = ReceiptDB();
    const { ReceiptFormat } = Schemas();
    const { TIMESTAMP_GENERATOR } = DateUtils();

    const [seriesNum, setSeries] = useState("- En contingencia -");
    const [verifyNum, setVerify] = useState("- En contingencia -");
    const [authNum, setAuthNum] = useState("- En contingencia -")



    const paymentMethod = isCashSelected ? "efectivo" : "tarjeta";
    const typeOfReceipt = isConsumptionProduct ? "producto" : "servicio"

    const TEXT_HELPER = ["Nombre cliente:", "Consumo:", "Total consumido Qtz:", "Número de NIT:", "Dirección:", "Número celular:", "Método de pago:"];
    const FIELDS_HELPER = [name, consumption, total, nit, address, phoneNum, paymentMethod];
    const METHODS_HELPER = [setName, setConsumption, setTotal, setNIT, setAddress, setPhoneNum]

    const PDF_CUSTOMER_FIELDS = [name, nit, address];
    const PDF_SAT_RESPONSE = ["Qtz." + String(total), consumption, seriesNum, verifyNum, authNum];
    const PDF_PROPS = [PDF_CUSTOMER_FIELDS, PDF_SAT_RESPONSE]

    const generateReceipt = () => {
        if (!phoneNum || total === 0) return;
        setReviewed(false); setDone(true); setAPILoading(true);
        const APIreq = buildAPIcall(paymentMethod, name, nit, consumption, total, isConsumptionProduct, currentUser);
        const summary = {
            name: name,
            total: total,
            paymentMethod: paymentMethod,
            taxInfo: nit,
            consumption: consumption,
            address: address
        }
  
        var infoCall2SAT = {}; var whatsAppTaxURL = ""; var issuedInEmergency = false;
        const timestamp = TIMESTAMP_GENERATOR();


        request2API(APIreq).then(data => {
            infoCall2SAT = {
                req: APIreq,
                res: data
            };
            if (data.statusCode === 200) {
                const TAX_DETAIL = parseAPIresponse(data);
                whatsAppTaxURL = callAPI4Receipt(FIELDS_HELPER, TAX_DETAIL);
                const responseSAT = data.body.success;
                setSeries(responseSAT.Serie); setAuthNum(responseSAT.Autorizacion); setVerify(responseSAT.NUMERO)
            } else {
                whatsAppTaxURL = "https://wa.me/5032872167?text=Ayuda%hay%20estado%20de%20contingencia";
                issuedInEmergency = true;
            };
            var receiptProps = [timestamp, whatsAppTaxURL, summary, infoCall2SAT, issuedInEmergency]
            const RECEIPT_SCHEMA = ReceiptFormat(receiptProps);
            // insertReceipt(RECEIPT_SCHEMA);
            insertTaxSAT(RECEIPT_SCHEMA)
            setRedirectURL(whatsAppTaxURL); setAPILoading(false); setIsReadyForNext(true);

        })



    }

    return (
        <>
            <div className="demo-container">
                <div className="header-demo">
                    <Link to="/">
                        {/* <img className="listo-logo" src={fireLogo} /> */}
                    </Link>
                    {(!reviewed && !isReadyForNext && !apiCallLoading) && <Button className="go-back" onClick={() => navHelper("")}> <FontAwesomeIcon icon={faArrowLeft} />Regresar </Button>}

                </div>
                {reviewed && <div className="revision-text">
                    <Card className="card">
                        <CardBody className="card-body">
                            <h3>{typeOfReceipt} <FontAwesomeIcon icon={isConsumptionProduct ? faTshirt : faPeopleCarry} /></h3>
                            {TEXT_HELPER.map((x, ix) =>
                                <>

                                    <h5> <b>{x}</b></h5>
                                    <h4><FontAwesomeIcon icon={faCheck} /> {' '}{x === "Total consumido Qtz:" && "Qtz. "}{FIELDS_HELPER[ix]}</h4>
                                </>)
                            }
                        </CardBody>
                    </Card>
                </div>}
                {!reviewed && !isReadyForNext && !apiCallLoading && <div className="whatsApp-fields-demo">
                    {METHODS_HELPER.map((helperFunction, ix) =>
                        <>
                            <div className="headery-demo"><h3>{TEXT_HELPER[ix]}</h3></div>
                            <FormInput
                                className="input"
                                type={(FIELDS_HELPER[ix]=== total ||FIELDS_HELPER[ix]=== phoneNum
                                    ) ?  "number" : "text"}
                                size="lg"
                                placeholder={(FIELDS_HELPER[ix]=== total ||FIELDS_HELPER[ix]=== phoneNum
                                                ) ?  "" : FIELDS_HELPER[ix]}
                                // value={FIELDS_HELPER[ix]!==total ? FIELDS_HELPER[ix] : ""}
                                onChange={(e) => {
                                    helperFunction(e.target.value);
                                }}
                            />
                        </>
                    )}
                </div>}
                {!reviewed && !isDone && <div className="demo-summary">
                    <h3>Método de pago</h3>

                    <Button pill className={isCashSelected ? "pill-btn" : "not-pill-btn"} onClick={() => {
                        setCashOrCard(true);
                    }}
                    >
                        <FontAwesomeIcon icon={faMoneyBillAlt} />{'  Efectivo'}
                    </Button>
                    <Button pill className={!isCashSelected ? "pill-btn" : "not-pill-btn"} onClick={() => {
                        setCashOrCard(false);
                    }}

                    >
                        <FontAwesomeIcon icon={faCreditCard} />{'  Tarjeta'}
                    </Button>
                </div>}
                {!reviewed && !isDone && <div className="demo-summary">
                    <h3>Naturaleza de la factura</h3>
                    <Button pill className={!isConsumptionProduct ? "pill-btn" : "not-pill-btn"} onClick={() => {
                        setConsumptionCategory(false);
                    }}

                    >
                        <FontAwesomeIcon icon={faPeopleCarry} />{'  Servicios'}
                    </Button>
                    <Button pill className={isConsumptionProduct ? "pill-btn" : "not-pill-btn"} onClick={() => {
                        setConsumptionCategory(true);
                    }}
                    >
                        <FontAwesomeIcon icon={faTshirt} />{'  Bienes'}
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
                                <FontAwesomeIcon icon={faGlasses} /> {" Revisar"}
                            </Button>
                        </>
                    )
                    }
                    {!apiCallLoading && !readyFlag && reviewed &&
                        (<>
                            <Button
                                onClick={() => generateReceipt()}
                                href={redirectURL}
                                className="button-gen" block>
                                <FontAwesomeIcon icon={faEnvelope} />  {"Certificar"}
                            </Button>
                            <Button
                                onClick={() => setReviewed(false)}
                                className="edit-receipt" block>
                                <FontAwesomeIcon icon={faPencilAlt} /> {"Editar "}
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
                    {readyFlag && <FinalTaxSegment whatsAppURL={redirectURL} printingElements={FIELDS_HELPER} proceedH={setProceedH} pdfProps={PDF_PROPS} />}
                    {readyFlag && proceedHelper && <Button className="go-back" onClick={() => navHelper("")}> <FontAwesomeIcon icon={faArrowLeft} />Regresar </Button>}
                </div>
            </div>
        </>
    );
}

export default TaxSegment;