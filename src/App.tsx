import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './menu';
import Header from './containers/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBroom, faQuidditch, faFireAlt, faFire,faFighterJet,
faCamera,
} from '@fortawesome/free-solid-svg-icons';

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
  const [seeMenu, setSeeMenu]=useState(false);
  useEffect(() => {
    // Call API to load the menu
    setMenuItems(menuItemsMock);
  }, []);

  // let seeMenu=false;

  const displayMenu =()=> setSeeMenu(true);

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
      
      <section className="container">
        {currentPage === PageEnum.MENU && (
          <>
          <header className="App-header">
            <Header displayMenu={displayMenu} isDisplaying={seeMenu}/>
          </header>
          <div className="App-image">
          {!seeMenu&&(
            <img src="https://scontent.fgua5-1.fna.fbcdn.net/v/t1.0-9/120319394_3307503859332898_5997193339921423352_o.jpg?_nc_cat=102&_nc_sid=e3f864&_nc_ohc=-7siUk5HxToAX83JfAA&_nc_ht=scontent.fgua5-1.fna&oh=02db0d725d0183edafff0e252024693e&oe=5FAC7B6C"></img>
          ) || null}   
          </div>
          {seeMenu && (<Menu
            menuItems={menuItems}
            cart={cart}
            setCartItems={setCartItems}
          ></Menu> ) || null}
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
            Ver el pedido! - Qtz.{getTotalCartValue()}
          </Button>
        </div>
      )) ||
        null}
    </div>
    <div className="App-footer" id="footer">                          
      <h6><b>Pronto Software </b><FontAwesomeIcon icon={faQuidditch}/></h6>
    </div>
    </>
  );
}

export default App;
