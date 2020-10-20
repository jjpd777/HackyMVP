import React, { useState } from 'react';
import './Checkout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUndo,
} from '@fortawesome/free-solid-svg-icons';
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'shards-react';

import { CartItem } from '../../StoreFront';
import { MenuItem } from '../Menu/Menu';

interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
  storePhone:String;
  storeDep:String;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;
  const restDetails = 
  {
    "id": 1,
    "srcImage":"https://scontent.fgua5-1.fna.fbcdn.net/v/t1.0-9/120343287_3309878435762107_5997515660017944691_n.png?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=nZR8L1CgkJkAX8SjgId&_nc_ht=scontent.fgua5-1.fna&oh=df247ddbb7b331e79ca3a1b972b6a518&oe=5FABC0D3",
    "atrestaurant": ' @PolloGranjeroGuatemala',
    "instaURL": 'https://www.facebook.com/PolloGranjeroGuatemala/',
    "tagline": '¡Recién hecho y crujiente!',
    "serviceZones": ["Mixco", "Ciudad de Guatemala"],
    "schedule":'Delivery de martes a domingo de 12 a 7:30PM',
    "cellphones":["tel:+50241288133"],
    "otherApps":['hugo, ','glovo','ubereats'],
    "payments": 'Efectivo, tarjeta'
  };
  const department ={
    "Mixco" : [["6a Avenida 08-24 zona 1","56287983"],["calz. San Juan 14-06 zona 3","56287819"],["23 Avenida 11-55, zona 4","777777"],["Colonia El Naranjo C.C. Arboreto San Nicolás","56286877"]],
    "Ciudad de Guatemala" : [["1a Avenida 9-45, zona 1","41048525"],["San Raymundo, zona 1","42399603"],["Avenida Bolívar 39-20 zona 3","56253736"]]
  }


  const [name, setName] = useState();
  const [address,setAddress] = useState();
  const [phone,setPhone] = useState();
  const [payMethod,setPayment] = useState(true)

  const returnAddressField = ()=> "Escribe tu dirección en " + props.storeDep;
  const recurrString = (str)=> str[-1]!==" " ? str : recurrString(str.slice(0,-1));
  function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
}
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

    message = message.replace(/(?: ){2,}/g, ' ');
    message = message.replaceAll("#","%23")
    message = message.replaceAll(" ","%20")
    message = message.replaceAll("+","%2B")
    return message;
  }
  
  const writeOrder=(checkName,checkAddress,thisphone,payment)=>{
    if(!checkName || !checkAddress || !thisphone) return
    const getPayment = payment ? 'efectivo' : 'tarjeta';
    let order = "";
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const tmp = "[(x"+ String(cartItem.quantity) +") " + menuItem.name + " ]"
          order+=tmp
        }
      });
    });
    const time = getFormattedDate();
    const newRow = {
      "nombre" : checkName,
      "direccion" : checkAddress,
      "celular" : thisphone,
      "pago" : getPayment,
      "total": props.totalCartValue,
      "fecha" : time,
      "pedido": order,
    }
    console.log(newRow)
    var url = 'https://sheet2api.com/v1/WExfuaSVRrOs/ventaslalloronagt/ventas-granjero';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRow),
    })
    .then(response => response.json())
    .then(newRow => {
      console.log('Success:', newRow);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  const callme = () => props.storePhone;
  const letsCheckout = (checkName,checkAddress,thisphone,payment) =>{
    if(!checkName || !checkAddress || !thisphone) return
    const getPayment = payment ? 'efectivo' : 'tarjeta';

    let baseURL = "https://wa.me/502"+props.storePhone+"?text=";
    let textBody="Hola Pollo Granjero!%0A%0AMi nombre es *" +String(checkName)+"* y me interesa hacer un pedido a *"+String(checkAddress)+"*" + ".%0A%0AMi pedido es el siguiente:%0A";
    let finalpart = "*Total*%20Qtz.%20" +String(props.totalCartValue)+ "%0A%0AMi pago será en *"+getPayment+"*, y mi número telefónico es *"+ thisphone+ "*.%0A%0AMuchas gracias de antemano%21"

    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const tmp = "-(%20*x*%20"+ String(cartItem.quantity) +"%20)%20" + menuItem.name + "%0A"
          textBody+=tmp
        }
      });
    });
    textBody=craftString(textBody);
    var purchase = baseURL+textBody+"%0A"+finalpart;

    return purchase;
  }
  
  return (
    <>
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
      <Button onClick={props.onBack} className="button-secondary" outline block>
        <FontAwesomeIcon icon={faUndo}/> {'  '}Volver al menú
      </Button>
      </div>
      <div className="shipping-info">
        <FormInput
          className="input"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <FormTextarea
          className="input"
          placeholder={returnAddressField()}
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
        />
      </div>
      <br></br>
      <h6>Método de pago</h6>
      <div>
        <FormRadio className="payment"
              inline
              name="cash"
              checked={payMethod}
              onChange={() => {
                setPayment(true);
              }}
            >
              Efectivo
        </FormRadio>
      </div>
      <br></br>
      <Button 
        onClick={()=>writeOrder(name,address,phone,payMethod)} 
        href={letsCheckout(name,address,phone,payMethod)} 
        className="button" block>
        Pedir via WhatsApp
      </Button>
    </div>
  </>
  );
}

export default Checkout;
