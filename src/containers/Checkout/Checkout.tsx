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

interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;

  const [name, setName] = useState();
  const [address,setAddress] = useState();
  const [phone,setPhone] = useState();

  const [payMethod,setPayment] = useState(true)
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
    var blank = / /gi;
    var hashtag = /#/gi;
    message = message.replace(hashtag,"%23")
    message = message.replace(hashtag,"%20")
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
    var url = 'https://sheet2api.com/v1/WExfuaSVRrOs/ventaslalloronagt/venta-hora';
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
  const letsCheckout = (checkName,checkAddress,thisphone,payment) =>{
    if(!checkName || !checkAddress || !thisphone) return
    const getPayment = payment ? 'efectivo' : 'tarjeta';

    let baseURL = "https://wa.me/50241288133?text=";
    let textBody="Hola La Llorona!%0A%0AMi nombre es *" +String(checkName)+"* y me interesa hacer un pedido a *"+String(checkAddress)+"*" + ".%0A%0AMi pedido es el siguiente:%0A";
    let finalpart = "*Total*%20Qtz.%20" +String(props.totalCartValue)+ "%0A%0AQuiero por favor pagar en *"+ getPayment+ "*.%0A%0AMuchas gracias de antemano%21"

    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const tmp = "-(%20*x*%20"+ String(cartItem.quantity) +")%20" + menuItem.name + "%0A"
          textBody+=tmp
        }
      });
    });
    textBody=craftString(textBody);
    var purchase = baseURL+textBody+"%0A"+finalpart;

    return purchase;
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
      <FormRadio
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
      </FormRadio>
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
        />
      </div>
      <br></br>
      <Button 
        onClick={()=>writeOrder(name,address,phone,payMethod)} 
        href={letsCheckout(name,address,phone,payMethod)} 
        className="button" block>
        Pedir via WhatsApp
      </Button>
      <Button onClick={props.onBack} className="button-secondary" outline block>
        Regresar al Menu
      </Button>
    </div>
  );
}

export default Checkout;
