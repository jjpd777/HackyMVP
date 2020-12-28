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
  faArrowAltCircleLeft,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
import {InventoryDB, newMHDMY} from '../../services/DBservice';
import {generateWhatsAppURL, simplifyCart} from './CheckoutUtils';

interface CheckoutProps {
  menuItems: any[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;
  const locations = ["Plaza Gerona", "Plaza Comercia", "Plaza Novitá","Condado Fraijanes","Plazoleta"];

  const [additionalNotes, setAdditionalNotes] = useState("- Ninguna.");
  const [redirectURL, setRedirectURL] = useState("");
  const [pointer, setPointer] = useState(0);
  const [location, setLoc] = useState(locations[0])
  const {insert2factory} = InventoryDB();
  const simpleCart = simplifyCart(cart, menuItems);
  const readyFlag = redirectURL !== "";



  const generateCheckout = () => {
    const timestamp = newMHDMY();
    const whatsAppURL = generateWhatsAppURL(simpleCart, menuItems, additionalNotes, location);
    const newInventoryRequest = {
      "location": location,
      "additionalNotes": additionalNotes,
      "order" : simpleCart,
      "timestamp" : timestamp,
      "whatsAppURL": whatsAppURL,
    };
   setRedirectURL(whatsAppURL);
   insert2factory(newInventoryRequest);
  };

  const resetVariables = ()=>{
    setAdditionalNotes("-Ninguna");
    setRedirectURL("");
  }

  return (
    <div className="checkout-container">
      <div className="order-summary">
        <ListGroup>
          {simpleCart.map((item, index) => {
            return (
              <ListGroupItem className="list-item" key={index}>
                <div>
                  ( x{item.quantity} )  {item.name}
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <Button className="shop-location" onClick={()=>{ 
        const newPointer = pointer+1; 
        setPointer(newPointer);
        setLoc(locations[newPointer %5])
      }}>
          <FontAwesomeIcon icon={faTruck}/>{'  '}{location} 
      </Button>
      <h5>(Toca para cambiar localidad)</h5>
      </div>
      <br />
       <div className="shipping-info">
            <h2>Notas adicionales:</h2>
            <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Escribir notas"
              // value={additionalNotes}
              onChange={(e) => {
                setAdditionalNotes(e.target.value);
              }}
            />
            <Button onClick={props.onBack} className="button-secondary" outline block>
        <FontAwesomeIcon icon={faArrowAltCircleLeft}/>{'  '}Regresar
      </Button>
            <Button
              onClick={() => readyFlag ? resetVariables() :  generateCheckout()}
              href={redirectURL}
              className="button" block>
              {readyFlag ? "Enviar listado de inventario" : "Generar listado"}
            </Button>
          </div>

      <br></br>
    </div>
  );
}

export default Checkout;
