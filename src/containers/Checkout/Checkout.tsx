import React, { useState, useEffect } from 'react';
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

import DBservice, {MovementsDB, DateUtil} from "../../services/DBservice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, Route, Link } from "react-router-dom";
import GenerateReceipt from "../../facturacion/facturacion"



interface CheckoutProps {
  menuItems: MenuItem[];
  cart: any[];
  totalCartValue: number;
  registerItems: any[];
  emptyCart: () => void;
  enterOrExit: boolean;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart, registerItems, enterOrExit } = props;
  const ORIGINARRAY = ["FÁBRICA", "METROPLAZA", "P.F.", "MAJADAS", "Inventario existente"];
  const DESTARRAY = ["METROPLAZA", "P.F.", "MAJADAS"]

  const [nextPayment, setNextPayment] = useState(false);
  const [taxInfo, setTaxInfo] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("- Ninguna");
  const {newMHDMY, unixTime} = DateUtil();
  const {createMovement} = MovementsDB();
  const [originPTR, setOriginPtr]= useState(0);
  const [destPTR, setDestPtr]= useState(0);
  const [originMovement, setOrigin] = useState(ORIGINARRAY[originPTR]);
  const [destinationMovement, setDestination] = useState(DESTARRAY[destPTR]);

  const [firstEmployee, setFirstEmployee] = useState("");
  const [secondEmployee, setSecondEmployee] = useState("-");
  const INVENTORY_REG_FLAG = originMovement ==="Inventario existente";

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
    setFirstEmployee("");
    setSecondEmployee("-");
    setTaxInfo(false);
    props.emptyCart();
  };
  const inventoryOriginText = INVENTORY_REG_FLAG ? "" : "ORIGEN: ";
  const inventoryDestinationText = INVENTORY_REG_FLAG ? "Registrar en " : "DESTINO: ";
  const originOrDest = (flag) => <h1>{flag ? inventoryOriginText + originMovement : inventoryDestinationText + destinationMovement}</h1>

  const createMovementInLedger = () => {
    if(firstEmployee ==="") return;
    const cartsJson = getShopCartJSON();
    const timestamp =  newMHDMY();
    const unix = unixTime();
    var typeMovement = "DESPACHO";
    if(originMovement === "Inventario existente") typeMovement= "INGRESO_INVENTARIO";
 
    var inventoryMovement = {
      movementID:"",
      unix:unix,
      type: typeMovement,
      origin: originMovement,
      destination: destinationMovement,
      timestamp: timestamp,
      receivedTimestamp:'-',
      movementItems: cartsJson,
      received: false,
      notes: additionalNotes,
      status: true,
      firstEmployee: firstEmployee,
      secondEmployee: secondEmployee,
      thirdEmployee: "RECEIVER",

    };
    createMovement(inventoryMovement)

    setNextPayment(true);
    registerSale();
  }

  return (
    <div className="checkout-container">
      {nextPayment || !cart.length ? (
        <>
          <div className="finalize">
            <br></br>
            <h1 className="done"> <FontAwesomeIcon icon={faCheckCircle} />{'  '} Movimiento Registrado</h1>
            <br></br>
            <Link to="/">
              <Button className="next" theme="success">
                Registrar otro movimiento</Button>
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
                      {/* <h2>Qtz. {item.price * item.quantity}</h2> */}
                    </ListGroupItem>
                  );
                })}
                {/* <ListGroupItem
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
                </ListGroupItem> */}
              </ListGroup>
            </div>
            <br></br>
            <div>
              <div className="shipping-info">
                <Button className="simple-pay" 
                onClick={() => {
                  var iterator = originPTR +1;
                  var ix = iterator %5;
                  setOrigin(ORIGINARRAY[ix]);
                  setOriginPtr(iterator);
                }
                }>  {originOrDest(true)}</Button>
               <Button className="simple-pay" 
                onClick={() => {
                  var iterator = destPTR +1;
                  var ix = iterator %3;
                  setDestination(DESTARRAY[ix]);
                  setDestPtr(iterator);
                }
                }> {originOrDest(false)}</Button>

                {/* {taxInfo && (
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
                } */}
                <br></br>
                <br></br>
                <h2>Nombre de quien despacha</h2>
                  <FormInput
                      className="input"
                      placeholder="Persona que entrega producto"
                      onChange={(e) => {
                        setFirstEmployee(e.target.value);
                      }}
                    />
                <br></br>
                {!INVENTORY_REG_FLAG && 
                <>
                <h2>Mensajero (opcional)</h2>
                  <FormInput
                      className="input"
                      placeholder=""
                      onChange={(e) => {
                        setSecondEmployee(e.target.value);
                      }}
                    />
                    </>
                    }
                <br></br>
                <h2>Notas adicionales</h2>
                  <FormInput
                      className="input"
                      placeholder="Por favor mandar..."
                      onChange={(e) => {
                        setAdditionalNotes(e.target.value);
                      }}
                    />

                <Button
                  onClick={() => { createMovementInLedger(); }}
                  // href={writeOrder(name, address, phone, payMethod)}
                  className="button" block>
                  Registrar movimiento
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
