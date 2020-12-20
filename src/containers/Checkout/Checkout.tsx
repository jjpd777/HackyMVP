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
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
import {InventoryDB, newMHDMY} from '../../services/DBservice';

interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;

  const [additionalNotes, setAdditionalNotes] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const [payMethod, setPayment] = useState(true)
  const [locindex, setLocation] = useState(0);
  const {insert2factory} = InventoryDB();

  const locations = ["Plaza Gerona", "Plaza Comercia", "Plaza Novitá","Condado Fraijanes","Plazoleta"];
  const minPaymentAmount = props.totalCartValue > 0;
 
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

  const insert2Factory = () => {
    let factoryOrder: any[]=[];
    
    const time = newMHDMY();

    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const elementOrder = {
            "name" : menuItem.name,
            "quantity" : cartItem.quantity,
            "id" : menuItem.id,
          };
          factoryOrder.push(elementOrder); 
        }
      });
    });
    const newRow = {
      "location": locations[locindex],
      "additionalNotes": additionalNotes,
      "order" : factoryOrder,
      "timestamp" : time,
    }
   insert2factory(newRow) 
  }
  const letsCheckout = () => {
    let baseURL = "https://wa.me/50251740464?text=";
    let textBody = "Buenas noches de parte de *" + String(locations[locindex]) + "*. La lista de hoy es la siguiente:%0A%0A";

    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const tmp = "-%20*x*%20" + String(cartItem.quantity) + " %20" + menuItem.name + "%0A"
          textBody += tmp
        }
      });
    });
    textBody = textBody + "%0A%0A*NOTAS ADICIONALES* " + additionalNotes;
    textBody = craftString(textBody);
    var purchase = baseURL + textBody + "%0A%0A*BENDICIONES%20PARA%20TODOS*";

    return purchase;
  }
//Condado Fraijanes Plazoleta
  return (
    <div className="checkout-container">
      <img src='https://drive.google.com/uc?export=view&id=1wx14Fqu_4OovuKMELpHbiwe2SpaA8gDS' />
      <div className="order-summary">
        <ListGroup>
          {getCartItems().map((item, index) => {
            return (
              <ListGroupItem className="list-item" key={index}>
                <div>
                  ( x{item.quantity} )  {item.name}
                </div>
              </ListGroupItem>
            );
          })}

          {/* <ListGroupItem
            style={{ fontWeight: 600 }}
            className="list-item"
            key={'total'}
          >
          </ListGroupItem> */}
        </ListGroup>
        {!minPaymentAmount && (<Button className="pillyboy" disabled="true" theme="danger"><b>ATENCIÓN:</b> El pedido mínimo es de Qtz. 50</Button>)}
      </div>
      <br />

      {minPaymentAmount && (
        <div className="store-location" >
          <h5>Localidad</h5>
          <div className="finally">
          <FormRadio
            className="this-card"
            name="card"
            checked={locindex === 0}
            onChange={() => {
              setPayment(true);
              setLocation(0);
            }}
          >
            Plaza Gerona
      </FormRadio>
          <FormRadio
            className="this-card"
            name="card"
            checked={locindex === 1}
            onChange={() => {
              setPayment(false);
              setLocation(1);
            }}
          >
            Plaza Comercia
      </FormRadio> 
          <FormRadio
            className="this-card"
            name="card"
            checked={locindex === 2}
            onChange={() => {
              setPayment(false);
              setLocation(2);
            }}
          >
            Plaza Novitá
      </FormRadio>
      <FormRadio
            className="this-card"
            name="card"
            checked={locindex === 3}
            onChange={() => {
              setPayment(false);
              setLocation(3);
            }}
          >
            Condado Fraijanes
      </FormRadio>
      <FormRadio
            className="this-card"
            name="card"
            checked={locindex === 4}
            onChange={() => {
              setPayment(false);
              setLocation(4);
            }}
          >
            Plazoleta
      </FormRadio>
      </div>
          <div className="shipping-info">
            <h5>Notas adicionales:</h5>
            <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Escribir notas"
              value={additionalNotes}
              onChange={(e) => {
                setAdditionalNotes(e.target.value);
              }}
            />
            <Button onClick={props.onBack} className="button-secondary" outline block>
        <FontAwesomeIcon icon={faArrowAltCircleLeft}/>{'  '}Regresar al Menu
      </Button>
            <Button
              onClick={() => insert2Factory()}
              href={letsCheckout()}
              className="button" block>
              Enviar listado de inventario
            </Button>
          </div>
        </div>
      ) || null}

      <br></br>
    </div>
  );
}

export default Checkout;
