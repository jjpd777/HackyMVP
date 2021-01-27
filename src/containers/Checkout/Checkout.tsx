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

import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
import {TransactionRecordDB, newMHDMY} from '../../SaaS/Database/DatabaseFunctions';
import {generateWhatsAppURL} from '../../SaaS/HelperFunctions/CheckoutHelpers';

interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;
  const FINCAS = [["GUANACASTE","50000621"],["ANDARES","55100361"],["PEÑA BLANCA","45058365"]];
  const PAYMENT_OPTION = ["PAGO CONTADO", "CRÉDITO 8 DÍAS", "CRÉDITO 15 DÍAS", "CRÉDITO 30 DÍAS"]
  const [ptr, setPtr] = useState(0);
  const [paymentPtr, setPaymentPtr] = useState(0);
  const [currentFarm, setCurrentFarm] = useState(FINCAS[ptr]);
  const [currentPayment, setCurrentPayment] = useState(PAYMENT_OPTION[ptr]);
  const [name, setName] = useState();
  const [address,setAddress] = useState();
  const [phone,setPhone] = useState();
  const {createTransaction} = TransactionRecordDB();
  const [additionalNotes, setAdditionalNotes] = useState("- Ninguna.")

  const [payMethod,setPayment] = useState(true)
  
  const getCartItems = () => {
    let cartItems: any[] = [];
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          cartItems.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: cartItem.quantity,
          });
        }
      });
    });
    return cartItems;
  };
  const craftString = (message) =>{
    var blank = / /gi;
    var hashtag = /#/gi;
    message = message.replace(hashtag,"%23")
    message = message.replace(hashtag,"%20")
    return message;
  }
  const nextFarm = ()=>{
    const t = (ptr+1)% FINCAS.length;
    setPtr(t); setCurrentFarm(FINCAS[t]);
  };
  const nextPayment = ()=>{
    const t = (paymentPtr+1)% PAYMENT_OPTION.length;
    setPaymentPtr(t); setCurrentPayment(PAYMENT_OPTION[t]);
  }
  const writeOrder=(checkName,checkAddress,thisphone,payment)=>{
    const getPayment = payment ? 'efectivo' : 'tarjeta';
    let order = {}
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          order[menuItem.name] = {
            quantity: cartItem.quantity,
            price: menuItem.price,
          }
        }
      });
    });
    const time = newMHDMY();
    const newRow = {
      "nombre" : checkName,
      "status" : true,
      "finca" : currentFarm[0],
      "celular" : currentFarm[1],
      "pago" : currentPayment,
      "total": props.totalCartValue,
      "fecha" : time,
      "pedido": order,
    };
    createTransaction(newRow)
    const x = [cart, menuItems, additionalNotes, name, currentFarm[0],currentPayment ]
    const redirectURL = generateWhatsAppURL(currentFarm[1],x )
    console.log(redirectURL)
  }
  const letsCheckout = () =>{
    // name,address,phone,payMethod
    if(!name) return
    const x = [cart, menuItems, additionalNotes, name, currentFarm[0],currentPayment ]
    const redirectURL = generateWhatsAppURL(currentFarm[1],x )
    return redirectURL;
  }
  
  return (
    <div className="checkout-container">
      <div className="order-summary">
        <ListGroup>
          {getCartItems().map((item, index) => {
            return (
              <ListGroupItem className="list-item" key={index}>
                <div>
                  ( x{item.quantity} )  {item.name}
                </div>
                <div>Qtz. {item.price * item.quantity}</div>
              </ListGroupItem>
            );
          })}

          <ListGroupItem
            style={{ fontWeight: 600 }}
            className="list-item"
            key={'total'}
          >
            <div>Total</div>
            <div>Qtz. {props.totalCartValue}</div>
          </ListGroupItem>
        </ListGroup>
      </div>
      <br />
      <div>
      {/* <FormRadio
            inline
            name="cash"
            checked={payMethod}
            onChange={() => {
              setPayment(true);
            }}
          >
            Efectivo
      </FormRadio>
      <FormRadio
            inline
            name="card"
            checked={!payMethod}
            onChange={() => {
              setPayment(false);
            }}
          >
            Tarjeta
      </FormRadio> */}
      <div>
      <Button onClick={nextFarm}>
        {currentFarm[0]}
      </Button>  <Button onClick={nextPayment}>
        {currentPayment}
      </Button>
      </div>
      </div>
      <div className="shipping-info">
        <FormInput
          className="input"
          placeholder="Nombre del quien recibe"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {/* <FormTextarea
          className="input"
          placeholder="Dirección del domicilio"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
         <FormTextarea
          className="input"
          placeholder="Celular"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        /> */}
          <FormTextarea
          className="input"
          placeholder="Notas adicionales"
          onChange={(e) => {
            setAdditionalNotes(e.target.value);
          }}
        />
      </div>
      <br></br>
      <Button 
        onClick={()=>writeOrder(name,address,phone,payMethod)} 
        href={letsCheckout()} 
        className="button" block>
        Enviar via WhatsApp
      </Button>
      <Button onClick={props.onBack} className="button-secondary" outline block>
        Regresar al Menu
      </Button>
    </div>
  );
}

export default Checkout;
