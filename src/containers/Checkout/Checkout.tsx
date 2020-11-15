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
  faRedo, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
import DBservice from "../../services/DBservice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, Route, Link } from "react-router-dom";



interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  emptyCart: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;

  const [name, setName] = useState();
  const [address, setAddress] = useState("Ciudad de Guatemala");
  const [phone, setPhone] = useState("+502");
  const [nextPayment, setNextPayment] = useState(false);
  const [payMethod, setPayment] = useState(true);
  const [taxInfo, setTaxInfo] = useState(false);
  const [tax, setTaxText] = useState("");

  function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
  }
  function getDateforSection() {
    var date = new Date();
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

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
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      });
    })
    return response;
  }
  const getTaxInfo = () => taxInfo ? tax : "C.F.";
  const registerSale = () => {
    if (!name) return
    setName("");
    setAddress("");
    setPhone("");
    setTaxText("");
    setTaxInfo(false);
  }
  const writeOrder = () => {
    if (!name) return

    const payment = getPayment();
    const order = getShopCartJSON();
    const time = getFormattedDate();
    const taxString = getTaxInfo();
    const dateCategory = getDateforSection();

    const newRow = {
      "id": "",
      "name": name,
      "address": address,
      "phone": phone,
      "payment": payment,
      "taxInfo": taxString,
      "total": props.totalCartValue,
      "date": time,
      "pedido": order,
      "category": dateCategory,
      "valid": true,
    }
    DBservice.create(newRow, "/ventas-borgona")
      .then(() => {
        console.log(newRow)
      })
      .catch(e => {
        console.log(e);
      });
      setNextPayment(true);
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
      </div>
      {nextPayment ? ( 
        <>
        <div className="finalize">
          <br></br>
           <h4 className="done"> <FontAwesomeIcon icon={faCheckCircle} />{'  '} Compra Registrada</h4>
           <br></br>
           <Link to="/">
            <Button className="next" theme ="success" onClick={()=>  props.emptyCart()}> 
            Registrar otra compra</Button>
            </Link>
      
            </div>
           

            </>
            ):(
        <>
        <div className="order-summary">
        <br></br>
        <Link to={"/"}>
            <Button className="button-secondary" outline block> <FontAwesomeIcon icon={faRedo}/>{'  '}
              Regresar al Menu
            </Button>
          </Link>
      </div>
      <br></br>
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
                placeholder="Número de NIT"
                onChange={(e) => {
                  setTaxText(e.target.value);
                }}
              />
            )}
            {/* <FormTextarea
              className="input"
              placeholder="Celular"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            /> */}
            <Button
              onClick={() => { writeOrder(); registerSale(); }}
              // href={writeOrder(name, address, phone, payMethod)}
              className="button" block>
              Registrar compra
            </Button>
          </div>
        </div>
      </>
      )}
          
         
    </div>
  );
}

export default Checkout;