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
import DBservice from "../../services/DBservice";


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
  const [entrance, setEntrance] = useState("");
  const [payMethod, setPayment] = useState(true);
  const minPaymentAmount = props.totalCartValue > 59;
  const [taxInfo, setTaxInfo] = useState(false);
  const [tax, setTaxText] = useState(false);

  function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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

  const getPayment = () => payMethod ? 'efectivo' : 'tarjeta';
  const getShopCartJSON = () => {
    let response: any[] = [];
    getCartItems().map((item, key) => {
      response.push({
        id:item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      });
    })
    console.log(response)
    return response;
  }

  const writeOrder = () => {
    if (!name || !address || !phone) return

    const payment = getPayment();
    const order = getShopCartJSON();
    const time = getFormattedDate();
 
    const newRow = {
      "id": "",
      "name": name,
      "address": address,
      "phone": phone,
      "payment": payment,
      "total": props.totalCartValue,
      "date": time,
      "pedido": order,
    }
    DBservice.create(newRow, "/ventas-borgona")
      .then(() => {
        console.log(newRow)
      })
      .catch(e => {
        console.log(e);
      });
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
          </ListGroupItem>
          <ListGroupItem
            style={{ fontWeight: 600 }}
            className="list-item"
            key={'total'}
          >
            <div>Total</div>
            <div>Qtz. {props.totalCartValue}</div>
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
            <p>Detalle para entrar a la garita:</p>
            <FormTextarea
              className="input"
              placeholder="(no es requerido)"
              onChange={(e) => {
                setEntrance(e.target.value);
              }}
            />
            <b><p>Información tributaria:</p></b>
            <FormRadio
              inline
              name="cf"
              checked={!taxInfo}
              onChange={() => {
                setTaxInfo(!taxInfo);
              }}
            >
              C.F
      </FormRadio>
            <FormRadio
              inline
              className="nit"
              name="nit"
              checked={taxInfo}
              onChange={() => {
                setTaxInfo(!taxInfo);
              }}
            >
              # Nit
      </FormRadio>
            {taxInfo && (
              <FormTextarea
                className="input"
                placeholder="taxinfo"
                onChange={(e) => {
                  setTaxText(e.target.value);
                }}
              />
            )}
            <FormTextarea
              className="input"
              placeholder="Celular"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Button
              onClick={() => writeOrder()}
              // href={writeOrder(name, address, phone, payMethod)}
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