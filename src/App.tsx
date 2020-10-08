import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './menu';
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
        <img src="https://instagram.fgua2-1.fna.fbcdn.net/v/t51.2885-19/s320x320/58733194_394157244518079_7491451054840610816_n.jpg?_nc_ht=instagram.fgua2-1.fna.fbcdn.net&_nc_ohc=F3Nkv9fWUZQAX8uNUT1&oh=96767fa6d0f76c4fc3bcbb4f0aba44de&oe=5FA8426A" />
        <h3></h3>
        <h6>Servicio a toda Guatemala</h6>
        <p><a href="https://www.instagram.com/taquerialostios/">Instagram 📸</a></p>
        <p><b>📞 z.10:</b> 2212-9175</p>
        <p><b>📞 z.15:</b> 2219-3840</p>
        <p> Lunes a domingo de 12PM a 8PM </p>
        <p>Para llevar, a domicilio y Glovo</p>
        <p>  💰Efectivo, o 💳 tarjeta</p>
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
