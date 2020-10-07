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
        <img src= "https://drive.google.com/uc?export=view&id=1rRwn6h7f7tGsGuZflxz7CtTughrvMtgX" />
        <h3>Don Taco Fiestón</h3>
        <h6>Servicio en zonas:</h6>
        <p>9,10,13,14,15,16 y Carretera a El Salvador</p>
        <p> lunes a domingo de 12:00-8:00PM </p>
        <p> Efectivo, débito</p>
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
