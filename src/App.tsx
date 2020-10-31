import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './menu';
import Header from './containers/Header/Header'

import {
  faLocationArrow,
  faClock,
  faMotorcycle,
  faHandshake,
  faPhone,
  faCreditCard,
  faMapPin,
  faShoppingBasket,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TutorialDataService from "./services/DBservice";

export interface CartItem {
  itemId: number;
  quantity: number;
}
export enum PageEnum {
  MENU,
  CHECKOUT,
}
function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<PageEnum>(PageEnum.MENU);

  useEffect(() => {
    // Call API to load the menu
    setMenuItems(menuItemsMock);
  }, []);

  const transcribe = () =>{
    let ptr=0;
    menuItemsMock.map((item)=>{
      var data = {
        id:0,
        name: "",
        availableUnits: 0,
        price: 0,
      };
      // data.title=item.title,
      data.id=ptr;
      data.name=item.name;
      data.availableUnits=0;
      data.price=item.price;
      ptr+=1;
      TutorialDataService.create(data)
      .then(() => {
        // setSubmitted(true);
        // console.log(data);
        console.log(data)
      })
      .catch(e => {
        console.log(e);
      });
    })
    
  }


  const getTotalCartValue = () => {
    let totalVal = 0;
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          totalVal += cartItem.quantity * menuItem.price;
        }
      });
    });
    return totalVal;
  };

  return (
    <div className="App">
      <button onClick={()=>transcribe()}> PUT IT IN</button>
      <section className="container">
        {currentPage === PageEnum.MENU && (
          <>
          <header className="App-header">
            <Header/>
          </header>
          <Menu
            menuItems={menuItems}
            cart={cart}
            setCartItems={setCartItems}
          ></Menu>
          </>
        )}
        {currentPage === PageEnum.CHECKOUT && (
          <Checkout
            menuItems={menuItems}
            cart={cart}
            totalCartValue={getTotalCartValue()}
            onBack={() => {
              setCurrentPage(PageEnum.MENU);
            }}
          ></Checkout>
        )}
      </section>
      <br />
      <br></br>
      <br></br>
      {(cart.length && currentPage === PageEnum.MENU && (
        <div className="fixed-checkout">
          <Button
            onClick={() => {
              setCurrentPage(PageEnum.CHECKOUT);
            }}
            className="checkout-button"
            block
          >
            Revisar la lista para enviar
          </Button>
        </div>
      )) ||
        null}
    </div>
  );
}

export default App;
