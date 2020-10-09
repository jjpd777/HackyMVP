import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './menu';
import {
  faLocationArrow,
  faClock,
  faMotorcycle,
  faHandshake,
  faPhone,
  faCreditCard,
  faMapPin,
  faMoneyBill,
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

  useEffect(() => {
    // Call API to load the menu
    setMenuItems(menuItemsMock);
  }, []);

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
      <header className="App-header">
        <img src="https://images.squarespace-cdn.com/content/502eafb484ae7fae2e634f8b/1488919372181-XYOXZE2C90WDZYF4RRVG/LogoChinitoVeloz.png" />
        <h6><FontAwesomeIcon icon={faCamera}/><a href="https://www.instagram.com/elchinitoveloz.gt/"> @elchinitoveloz.gt 🇬🇹</a></h6>
        <p><FontAwesomeIcon icon={faMapPin} />zonas: 1,2,3,9,10,11,12,13,14, San Miguel Petapa, Mixco</p>
        <p><FontAwesomeIcon icon={faMapPin} /> Villa Nueva, Villa Hermosa, Bárcenas, San José</p>
        <p><FontAwesomeIcon icon={faMapPin} /> Antigua, Jocotenango, Pastores, San Felipe</p>
        <p><FontAwesomeIcon icon={faMapPin} /> Cobán, Carchá y alrededores </p>
        <p><FontAwesomeIcon icon={faClock} /> 10:30 - 8:30PM </p>
        <p><FontAwesomeIcon icon={faHandshake}/>{' '}Pedidos por glovo y hugo</p>
        <p><FontAwesomeIcon icon={faMoneyBill}/> Efectivo, débito</p>
      </header>
      <section className="container">
        {currentPage === PageEnum.MENU && (
          <Menu
            menuItems={menuItems}
            cart={cart}
            setCartItems={setCartItems}
          ></Menu>
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
            Ver tu pedido! - Qtz.{getTotalCartValue()}
          </Button>
        </div>
      )) ||
        null}
    </div>
  );
}

export default App;
