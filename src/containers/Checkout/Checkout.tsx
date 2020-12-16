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
  enterOrExit: boolean;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart, registerItems, enterOrExit } = props;
  const ORIGINARRAY = ["FÁBRICA", "METROPLAZA", "P.F.", "MAJADAS"];
  const DESTARRAY = ["METROPLAZA", "P.F.", "MAJADAS"]

  const [name, setName] = useState("Anónimo");
  const [nextPayment, setNextPayment] = useState(false);
  const [taxInfo, setTaxInfo] = useState(false);


  const [originPTR, setOriginPtr]= useState(0);
  const [destPTR, setDestPtr]= useState(0);
  const [originMovement, setOrigin] = useState(ORIGINARRAY[originPTR]);
  const [destinationMovement, setDestination] = useState(DESTARRAY[destPTR]);  


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
  const handleEnterOrExit = () => {
    cart.forEach((cartItem) => {
      registerItems.map((register) => {
        if (cartItem.itemId === register.productID) {
          const destinationItem = props.registerItems.find((x)=> x.productID === register.productID);
          var tmp =0; 
          console.log("DEST",destinationItem)
          if(enterOrExit) tmp = cartItem.quantity + destinationItem.stock.inStock;
          else tmp = destinationItem.stock.inStock - cartItem.quantity;
          const dataUpdate = { "stock/inStock": tmp };

          DBservice.updateSoldUnits(destinationItem.insertionID, dataUpdate);
        }
      });
    });
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
    setName("");
    setTaxInfo(false);
    props.emptyCart();
  };
  const originOrDest = (flag) => <h1>{flag ? "ORIGEN: " + originMovement : "DESTINO: " + destinationMovement}</h1>

  const writeOrder = () => {
    const cartsJson = getShopCartJSON();
    const timestamp =  DBservice.newMHMY();
    const typeMovement = enterOrExit ? "INGRESO" : "EGRESO" 
    var inventoryMovement = {
      movementID:"",
      type: typeMovement,
      origin: originMovement,
      destination: destinationMovement,
      timestamp: timestamp,
      movementItems: cartsJson,
      notes: name,
      status: true,
    };
    DBservice.createMovement(inventoryMovement)

    handleEnterOrExit();
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
                  var ix = iterator %4;
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
                <br></br>
                <h2>Notas adicionales</h2>
                  <FormInput
                      className="input"
                      placeholder="Por favor mandar..."
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />

                <Button
                  onClick={() => { writeOrder(); registerSale();  }}
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
