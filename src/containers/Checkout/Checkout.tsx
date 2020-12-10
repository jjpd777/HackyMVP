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
  faRedo, faCheckCircle, faTimes, faMoneyBillWave, faCreditCard, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
import DBservice from "../../services/DBservice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, Route, Link } from "react-router-dom";
import GenerateReceipt from "../../facturacion/facturacion"



interface CheckoutProps {
  menuItems: MenuItem[];
  cart: any[];
  totalCartValue: number;
  registerItems: any[];
  emptyCart: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;

  const [name, setName] = useState("Anónimo");
  const [address, setAddress] = useState("Ciudad de Guatemala");
  const [phone, setPhone] = useState("+502");
  const [nextPayment, setNextPayment] = useState(false);
  const [payMethod, setPayment] = useState(true);
  const [taxInfo, setTaxInfo] = useState(false);
  const [tax, setTaxText] = useState("");

  const dateForSection = DBservice.getDateforSection();
  function getFullDate() {
    return DBservice.newMHMY();
  }

  const getTaxInfo = () => taxInfo ? tax : "CF";
  const getPayment = () => payMethod ? 'efectivo' : 'tarjeta';

  const purchaseProof = !taxInfo  &&  payMethod;


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
  const addToCount = () => {
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const destinationItem = props.registerItems.find((x)=> x.productID === menuItem.id);
          const tmp = cartItem.quantity + destinationItem.quantityavailable;
          const dataUpdate = { "quantityavailable": tmp };
          DBservice.updateSoldUnits(destinationItem.uniqueIdentifier, dataUpdate);
        }
      });
    });
  }


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

  const registerSale = () => {
    if (!name) return
    setName("");
    setAddress("");
    setPhone("");
    setTaxText("");
    setTaxInfo(false);
    props.emptyCart();
  };
  const retPayButton = () => payMethod ?
    (
      <h1>Efectivo <FontAwesomeIcon icon={faMoneyBillWave} /></h1>
    ) : (
      <h1>Tarjeta <FontAwesomeIcon icon={faCreditCard} /> </h1>
    )

  const writeOrder = () => {
    if (!name) return

    const payment = getPayment();
    const order = getShopCartJSON();
    const time = getFullDate();
    const taxString = getTaxInfo();
    const dateCategory = dateForSection;


    const newRow = {
      "id": "", "name": name, "address": address,
      "phone": phone, "payment": payment,"taxInfo": taxString,
      "total": props.totalCartValue,"date": time, "pedido": order,
      "category": dateCategory, "valid": true,
    }
    DBservice.createSale(newRow)
    console.log(order)
    const receiptInfo = [name,payMethod, taxString, address, time, order];
    GenerateReceipt.generate(purchaseProof, receiptInfo)
    setNextPayment(true);
  }

  return (
    <div className="checkout-container">
      {nextPayment || !cart.length ? (
        <>
          <div className="finalize">
            <br></br>
            <h1 className="done"> <FontAwesomeIcon icon={faCheckCircle} />{'  '} Compra Registrada</h1>
            <br></br>
            <Link to="/">
              <Button className="next" theme="success">
                Registrar otra compra</Button>
            </Link>

          </div>
        </>
      ) : (
          <>
            <div className="order-summary">
              <ListGroup>
                {getCartItems().map((item, index) => {
                  return (
                    <ListGroupItem className="list-item" key={index}>
                      <div>
                        <h2>( x{item.quantity} )  {item.name}</h2>
                      </div>
                      <h2>Qtz. {item.price * item.quantity}</h2>
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
                  <h2>Total</h2>
                  <h1>Qtz. {props.totalCartValue}</h1>
                </ListGroupItem>
              </ListGroup>
            </div>
            <br></br>
            <div>
              <div className="shipping-info">
                <Button className="simple-pay" onClick={() => setPayment(!payMethod)}> {retPayButton()}</Button>
                <Button className="simple-pay" onClick={() => {setTaxInfo(!taxInfo); setTaxText("");setName("Anónimo")}}> <h1>{taxInfo ? "# NIT" : "C.F."}</h1></Button>

                {taxInfo && (
                  <>
                    <FormInput
                      className="input"
                      placeholder="Nombre completo"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <FormTextarea
                      className="input"
                      placeholder="Número de NIT"
                      onChange={(e) => {
                        setTaxText(e.target.value);
                      }}
                    />
                     <FormTextarea
                  className="input"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />

                  </>
                )
                }

                <Button
                  onClick={() => { writeOrder(); registerSale(); addToCount() }}
                  // href={writeOrder(name, address, phone, payMethod)}
                  className="button" block>
                  Registrar
            </Button>
                <div className="order-summary">
                  <Link to={"/"}>
                    <Button onClick={() => props.emptyCart()} className="button-cancel" theme="danger" >
                      <FontAwesomeIcon icon={faTimes} />{'  '}
                    </Button>
                  </Link>
                  <Link to={"/"}>
                    <Button className="button-secondary" >
                      <FontAwesomeIcon icon={faArrowLeft} />{'  '}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}


    </div>
  );
}

export default Checkout;
