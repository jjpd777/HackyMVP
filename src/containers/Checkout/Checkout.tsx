import React, { useState, useEffect } from 'react';
import './Checkout.scss';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
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
import {TransactionRecordDB, newMHDMY, RegisterPurchase, CreateCabinGuest} from '../../SaaS/Database/DatabaseFunctions';
import {generateWhatsAppURL} from '../../SaaS/HelperFunctions/CheckoutHelpers';
import { keyMaper } from '../../SaaS/HelperFunctions/BasicHelpers';

interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;
  const [additionalNotes, setAdditionalNotes] = useState("- Ninguna.");
  const {insertCabinGuest, readCabinGuests, setMasterCabin} = CreateCabinGuest();
  const {insertPurchase} = RegisterPurchase();
  const [elements, setElements] = useState<any>([]);
  const [cabin, setCabin] = useState<any>();


  useEffect(()=>{
      const ref = readCabinGuests();
      const valRef = ref.on('value', (x) => {
          const snapVal = x.val();
          if(!snapVal)return;
          const data = keyMaper(snapVal);
          setElements(data.filter(t=> t.status));

        });
      return ()=> ref.off('value', valRef)
  },[]);



  
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
  
  
  const processOrder =()=>{
    let order:any= []; var total=0;
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          total += (menuItem.price * cartItem.quantity);
          order.push({
            name: menuItem.name,
            quantity: cartItem.quantity,
            price: menuItem.price,
          })
        }
      });
    });
    const data = {
      notes: additionalNotes,
      status: true,
      timestamp: newMHDMY(),
      order: order,
      total: total
    }
    insertPurchase(cabin.cabin, cabin.insertionID, data)
    
  }
 
  const logAndReset = ()=>{
    if(!cabin) return;
    processOrder(); setCabin(null);
    props.onBack();
    
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
        {!!cabin ? <h2>Cabaña {cabin.cabin.split('-')[1]}</h2> : <h3> Escoger cabaña</h3>}
        {elements.map(x=><Button className="cabins" onClick={()=> {setCabin(x)}}> {x.cabin.split('-')[1]}</Button>)}
     
      </div>
      <div className="shipping-info">
          <FormTextarea
          className="input"
          placeholder="Notas adicionales"
          onChange={(e) => {
            setAdditionalNotes(e.target.value);
          }}
        />
      </div>
      <br></br>

      <Button 
        onClick={()=>{logAndReset()}} 
        className="button" block>
        Registrar
      </Button>

      <Button onClick={props.onBack} className="button-secondary" outline block>
        Regresar
      </Button>
    </div>
  );
}

export default Checkout;
