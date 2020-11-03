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
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [entrance,setEntrance]= useState("");
  const [payMethod, setPayment] = useState(true);
  const minPaymentAmount = props.totalCartValue > 59;
  function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
  }

  const deliveryCost = () => minPaymentAmount ? 5 : 15;
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
  const craftString = (message) => {
    var blank = / /gi;
    var hashtag = /#/gi;
    message = message.replace(hashtag, "%23")
    message = message.replace(":", "%3A")
    message = message.replace(hashtag, "%20")
    return message;
  }

  const writeOrder = (checkName, checkAddress, thisphone, payment) => {
    if (!checkName || !checkAddress || !thisphone ) return
    const getPayment = payment ? 'efectivo' : 'tarjeta';
    let order = "";
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const tmp = "[(x" + String(cartItem.quantity) + ") " + menuItem.name + " ]"
          order += tmp
        }
      });
    });
    const time = getFormattedDate();
    const newRow = {
      "nombre": checkName,
      "direccion": checkAddress,
      "celular": thisphone,
      "pago": getPayment,
      "total": props.totalCartValue,
      "fecha": time,
      "pedido": order,
    }
    console.log(newRow)
    var url = 'https://sheet2api.com/v1/WExfuaSVRrOs/ventaslalloronagt/ventas-borgona';
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
  const letsCheckout = (checkName, checkAddress, thisphone, payment) => {
    if (!checkName || !checkAddress || !thisphone) return
    const getPayment = payment ? 'efectivo' : 'tarjeta';



    let baseURL = "https://wa.me/50254664602?text=";
    let textBody = "Hola La Borgoña!%0A%0AMi nombre es *" + String(checkName) + "* y me interesa hacer un pedido a *" + String(checkAddress) + "*" + ".%0A%0AMi pedido es el siguiente:%0A";
    let finalpart = "*Total*%20Qtz.%20" + String(props.totalCartValue) + "%0A%0AMi número de contacto es: " + String(thisphone) + "%0A%0AQuiero por favor pagar en *" + getPayment + "*.%0A%0AMuchas gracias de antemano%21"

    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const tmp = "-(%20*x*%20" + String(cartItem.quantity) + ")%20" + menuItem.name + "%0A"
          textBody += tmp
        }
      });
    });
    if(entrance!==""){
      textBody= textBody + "%0A%0APara entrar a la garita:%20"+"*"+entrance+"*"
    }
    textBody = craftString(textBody);
    var purchase = baseURL + textBody + "%0A" + finalpart;

    return purchase;
  }

  return (
    <div className="checkout-container">
      <img src="https://scontent.fgua5-1.fna.fbcdn.net/v/t1.0-9/60454009_2403050509745003_1658534653943873536_o.png?_nc_cat=108&_nc_sid=85a577&_nc_ohc=E2i8isONLjYAX8WoHjo&_nc_ht=scontent.fgua5-1.fna&oh=aac791af829983b21b70abcdffb419e5&oe=5FB542FE" />
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
           key={'deliv'}>
            <div>Costo domicilio</div>
            <div>Qtz. {deliveryCost()}</div>
           </ListGroupItem>
          <ListGroupItem
            style={{ fontWeight: 600 }}
            className="list-item"
            key={'total'}
          >
            <div>Total</div>
            <div>Qtz. {props.totalCartValue + deliveryCost()}</div>
          </ListGroupItem>
        </ListGroup>
        {/* {!minPaymentAmount && (<Button className="pillyboy" disabled="true" theme="danger"><b>ATENCIÓN:</b> Pedidos  de Qtz. 50</Button>)} */}
      </div>
      <br />
      <br></br>
      <br></br>

      {true && (
        <div>
          <b><p>Método de pago:</p></b>
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
            <br></br>
            <p>Detalle para entrar a la garita:</p>
            <FormTextarea
              className="input"
              placeholder="(no es requerido)"
              onChange={(e) => {
                setEntrance(e.target.value);
              }}
            />
            <FormTextarea
              className="input"
              placeholder="Celular"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Button
              onClick={() => writeOrder(name, address, phone, payMethod)}
              href={letsCheckout(name, address, phone, payMethod)}
              className="button" block>
              Pedir via WhatsApp
            </Button>
          </div>
        </div>
      ) || null}

      <br></br>

      <Button onClick={props.onBack} className="button-secondary" outline block>
        Regresar al Menu
      </Button>
    </div>
  );
}

export default Checkout;
