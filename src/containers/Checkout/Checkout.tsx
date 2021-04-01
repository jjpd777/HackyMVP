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
import {DailyRecordDB, newMHDMY, 
  RegisterPurchase, CreateCabinGuest,
   InsertGlobalTally} from '../../SaaS/Database/DatabaseFunctions';
import {generateWhatsAppURL, honoluluWhatsAppURL} from '../../SaaS/HelperFunctions/CheckoutHelpers';
import { keyMaper } from '../../SaaS/HelperFunctions/BasicHelpers';

interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;

}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;
  const [additionalNotes, setAdditionalNotes] = useState("- Ninguna.");
  const {insertCabinGuest, readCabinGuests, setMasterCabin} = CreateCabinGuest();
  const {insertPurchase} = RegisterPurchase();
  const [elements, setElements] = useState<any>([]);
  const [cabin, setCabin] = useState<any>();
  const {insert2Daily} = DailyRecordDB();
  const {insert2Global} = InsertGlobalTally();

  const cabinList = [
    "cabin-01", "cabin-02", "cabin-03",
    "cabin-04", "cabin-05", "cabin-06", 
    "cabin-07", "cabin-08", "cabin-09",
    "cabin-10", "cabin-11", "cabin-12",
    "cabin-13", "cabin-14", "cabin-15", 
  ]


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
  console.log(cabin, "CABIN UMBER")
  
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
      total: total,
      cabinNumber: cabin,
    }
    // const orderPath = insertPurchase(cabin.cabin, cabin.insertionID, data);
    // // Insert a reference to the order
    // insert2Daily(orderPath);
    insert2Global(data);

    // const shoppingCart = {
    //   timestamp: "11:11&13-03-2021",
    //   cabinNumber: cabin,
    //   order: [{name:"Pescado frito", price:"100",quantity:"4"}],
    //   notes: "- Ninguna",
    //   total: 250
    // } ; 
    const popout = honoluluWhatsAppURL("19043000741",data)
    window.open(popout)

    
  }
 
  const logAndReset = ()=>{
    if(!cabin) return;
    processOrder(); setCabin(null);
    props.setCartItems([])
    props.onBack();
    
  }

  const parseCabinString = (x)=>{
    const single = x.split('-')[1];
    return single.slice(0,1) === '0' ? single.slice(1) : single;
  }
  
  return (
    <div className="checkout-container">
      <div className="order-summary">
        <ListGroup>
          {getCartItems().map((item, index) => {
            return (
              <ListGroupItem className="list-item" key={index}>
                <div className="review">
            ({item.quantity})   {item.name}
                </div>
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
        {!!cabin ? <h2>Cabaña {parseCabinString(cabin)}</h2> : <h3> Escoger cabaña</h3>}
        {cabinList.map(x=><Button className="cabins" onClick={()=> {setCabin(x)}}> {parseCabinString(x)}</Button>)}
     
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
