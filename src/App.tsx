import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import Header from './containers/Header/Header';
import { InventoryDB } from './services/DBservice';
import PreviousInventory from './containers/PreviousInventory/PreviousInventory'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";



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
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<PageEnum>(PageEnum.MENU);


  const { root4inventory } = InventoryDB();
  useEffect(() => {
    const ref = root4inventory();
    const refVal = ref.on('value', function (snapshot) {
      const snap = snapshot.val();
      const responseKeys = Object.keys(snap);
      setMenuItems(responseKeys.map((k) => snap[k]));
    });
    return () => ref.off('value', refVal)
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

  const checkoutFlag = currentPage === PageEnum.CHECKOUT;

  return (
    <>
      <div className="App">
      <header className="App-header">
                      <Header />
                    </header>
                    <br></br>
        <Router>
          <Link to="/">
            <Button theme="success">Inventario</Button>
          </Link>
          <Link to="/previas">
         { currentPage === PageEnum.MENU && <Button theme="success">Peticiones previas</Button>}
          </Link>
          <Switch>
            <Route exact path={["/previas"]}>
              <PreviousInventory/>
            </Route>
          </Switch>
          <Switch>
            <Route exact path={["/"]}>
              <section className="container">
                {currentPage === PageEnum.MENU && (
                  <>
                            { !menuItems.length && (
                            <>
                            <br></br>
                            <Button>Cargando...</Button>
                            </>
                            )}
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
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
