import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './menu';
import Header from './containers/Header/Header';

// -- JUAN's NEW IMPORTS
import CRUD from './SaaS/DevModules/CRUD';
import Inventory from './SaaS/Inventory/Inventory';
import {InventoryDB} from './SaaS/Database/DatabaseFunctions';
import {keyMaper} from './SaaS/HelperFunctions/BasicHelpers'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import ReceiptRecords from './SaaS/ReceiptRecords/ReceiptRecords'

// --

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

  const {readInventory} = InventoryDB();

 


useEffect(() => {
  const ref = readInventory();
  const refVal = ref.on('value', function (snapshot) {
    if(!snapshot.val())return;
    const snapVal = snapshot.val(); const data = keyMaper(snapVal);
    setMenuItems(data);
  });
  return () => ref.off('value', refVal);
}, [])


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
    <>
    <div className="App">
   
      <Router>
      <div className="App-header">
            <Header/>
      </div>
      <Switch>
            <Route path={["/crud"]}>
              <CRUD/>
            </Route>
          </Switch>
      <Switch>
            <Route path={["/inventario"]}>
              <Inventory/>
            </Route>
          </Switch>
          <Switch>
            <Route path={["/ordenes"]}>
              <ReceiptRecords/>
            </Route>
          </Switch>

      <Switch>
    <Route exact path={["/"]}>
      <section className="container">
        {currentPage === PageEnum.MENU && (
          <>
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
            setCartItems={setCartItems}
          ></Checkout>
        )}
      </section>
      </Route>
      </Switch>

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
            Ver la orden - Qtz.{getTotalCartValue()}
          </Button>
        </div>
      )) ||
        null}
        </Router>
    </div>
    </>
  );
}

export default App;
