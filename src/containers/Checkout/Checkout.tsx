import React, { useEffect, useState } from 'react';
import './Checkout.scss';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Button,
} from 'shards-react';
import {
  Card,
  FormTextarea,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'shards-react';
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormGroup,
} from 'shards-react';

import { CartItem } from '../../App';
import { groupBy } from 'lodash';
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

  const letsCheckout = (checkName,checkAddress) =>{
    if(!checkName || !checkAddress) return
    
    let baseURL = "https://wa.me/50247627381?text=";
    let textBody="Hola Taqueriía los Tíos!%0AMi nombre es *" +String(checkName)+"* y me interesa hacer un pedido a *"+String(checkAddress)+"*.%0A%0AMi pedido es el siguiente:%0A";
    let finalpart = "*Total*%20Qtz.%20" +String(props.totalCartValue)+ "%0A%0AMuchas gracias de antemano%21"

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
                  {item.name} x {item.quantity}
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
            <p>here</p>
            <div>Total</div>
            <div>Qtz. {props.totalCartValue}</div>
          </ListGroupItem>
        </ListGroup>
      </div>
      <br />
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
      </div>
      <br></br>
      <Button href={letsCheckout(name,address)} className="button" block>
        Pedir via WhatsApp
      </Button>
      <Button onClick={props.onBack} className="button-secondary" outline block>
        Regresar al Menu
      </Button>
    </div>
  );
}

export default Checkout;
