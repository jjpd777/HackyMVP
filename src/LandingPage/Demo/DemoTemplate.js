import React, { useEffect, useState } from 'react';
import {
    Button,
    FormInput
} from 'shards-react';
import {
    Link
  } from "react-router-dom";
import {
    faLocationArrow, faMoneyBillAlt, faCreditCard,

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DemoTemplate.scss';
import fireLogo from '../../fire-logo.png';


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
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_MENTHODS[paymentPTR]);
    const [apiCallLoading, setAPILoading] = useState(false);

    const TEXT_HELPER = ["Nombre cliente:", "Consumo:", "Total consumido Qtz:", "Número de NIT:", "Dirección:", "Número celular:"];
    const FIELDS_HELPER = [name, consumption, total, nit, address, phoneNum];
    const METHODS_HELPER = [setName, setConsumption, setTotal, setNIT, setAddress, setPhoneNum]
    const [isCashSelected, setCashOrCard] = useState(true);


    const generateReceipt = () => {
        if (!phoneNum || total === 0) return;
        setAPILoading(true);
        setRedirectURL("0")


    }
    const resetVariables = () => {

        setRedirectURL("");
    };

    const nextPaymentMethod = () => {
        const newPointer = (paymentPTR + 1) % PAYMENT_MENTHODS.length;
        setPaymentPTR(newPointer);
        setPaymentMethod(PAYMENT_MENTHODS[newPointer])
    };

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
                {!apiCallLoading &&
                    <Button
                        onClick={() => readyFlag ? resetVariables() : generateReceipt()}
                        href={redirectURL}
                        className="button" block>
                        {readyFlag ? "Enviar por WhatsApp" : "Generar factura"}
                    </Button>}
                {apiCallLoading &&
                    <Button
                        className="button" block>
                        Verificando con la SAT...
        </Button>}
            </div>
        </div>
    );
}

export default DemoTemplate;