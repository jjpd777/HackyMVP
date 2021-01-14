import React, { useState } from 'react';
import './Checkout.scss';

import {
  Button,
} from 'shards-react';
import {
  FormTextarea,
} from 'shards-react';
import {
  ListGroup,
  ListGroupItem,
  FormInput,
  FormRadio,
} from 'shards-react';
import {
  faArrowAltCircleLeft,
  faTruck,
  faCashRegister
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
import {InventoryDB, newMHDMY, ReceiptDB} from '../../services/DBservice';
import {generateWhatsAppURL, simplifyCart} from './CheckoutUtils';
import {callAPI4Receipt, buildAPIcall, request2API,parseAPIresponse} from './ReceiptUtils'

interface CheckoutProps {
  menuItems: any[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;
  const locations = ["Plaza Gerona", "Plaza Comercia", "Plaza Novitá","Condado Fraijanes","Plazoleta"];
  const PAYMENT_MENTHODS = ["efectivo", "tarjeta"];
  const [additionalNotes, setAdditionalNotes] = useState("- Ninguna.");
  const [redirectURL, setRedirectURL] = useState("");
  const simpleCart = simplifyCart(cart, menuItems);
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

  const TEXT_HELPER = ["Nombre cliente:", "Consumo:",  "Total consumido Qtz:", "Número de NIT:", "Dirección", "Número celular"];
  const FIELDS_HELPER = [ name,consumption, total, nit, address, phoneNum];
  const METHODS_HELPER = [setName, setConsumption, setTotal, setNIT, setAddress, setPhoneNum]

  const {insertReceipt} = ReceiptDB();


  const generateReceipt = ()=>{
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
  const resetVariables = ()=>{

    setRedirectURL("");
  };

  const nextPaymentMethod = ()=>{
    const newPointer = (paymentPTR+1) % PAYMENT_MENTHODS.length; 
    setPaymentPTR(newPointer);
    setPaymentMethod(PAYMENT_MENTHODS[newPointer])
  };

  return (
    <div className="checkout-container">
      <div className="order-summary">
          <Button className="shop-location" onClick={()=>{ 
            nextPaymentMethod();}}>
            <FontAwesomeIcon icon={faCashRegister}/>{'  '}{paymentMethod} 
        </Button>
      </div>
      <div className="whatsApp-fields">
        {METHODS_HELPER.map((helperFunction, ix)=>
        <>
        <div className="headery"><h2>{TEXT_HELPER[ix]}</h2></div>
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
      <div className="final-action-buttons">
      {/* <Button onClick={props.onBack} className="button-secondary" outline block>
        <FontAwesomeIcon icon={faArrowAltCircleLeft}/>{'  '}Regresar
      </Button> */}
      {!apiCallLoading && 
        <Button
              onClick={() => readyFlag ? resetVariables() :  generateReceipt()}
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

export default Checkout;
