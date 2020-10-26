import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './menu';
import Header from './containers/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart, faBroom, faQuidditch, faFireAlt, faFire, faFighterJet,
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
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuItemsMock);
  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<PageEnum>(PageEnum.MENU);
  const [seeMenu, setSeeMenu] = useState(true);
  const [storePhone, setStorePhone] = useState("");
  const [storeDep, setStoreDep] = useState("");
  const [siteTab, setSiteTab] = useState("Cerdo")
  const [otherList, setOther] = useState<MenuItem[]>();

  useEffect(() => {
    const filtered = menuItems.filter((x) =>
      x.category === siteTab
    );
    setOther(filtered);
  }, [siteTab]);

  const displayMenu = () => setSeeMenu(true);

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
          <header className="App-header">
          <img src={"https://instagram.fgua5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/118739365_1466235423576643_2454423755812122033_n.jpg?_nc_ht=instagram.fgua5-1.fna.fbcdn.net&_nc_ohc=M1OqN-BssPIAX_ZOilO&oh=da923c6e8b6fcb5ca5b7d60108877d1e&oe=5FC004BA"} />
          </header>
          {currentPage === PageEnum.MENU && (
            <>
              {seeMenu && (
                <>
              <Header 
              displayMenu={displayMenu}
              isDisplaying={seeMenu}
              setStorePhone={setStorePhone}
              setStoreDep={setStoreDep} 
              setSiteTab={setSiteTab}
              />
              <Menu
                menuItems={menuItems}
                cart={cart}
                setCartItems={setCartItems}
                siteTab={siteTab}
              ></Menu>
              </>
              ) || null}
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
              storePhone={storePhone}
              storeDep={storeDep}
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
              Ver el pedido{'  '} <FontAwesomeIcon icon={faShoppingCart} />{'  '} Qtz.{getTotalCartValue()}
            </Button>
          </div>
        )) ||
          null}
      </div>
      <div className="App-footer" id="footer">
        <h6><b>Pronto Software </b><FontAwesomeIcon icon={faQuidditch} /></h6>
      </div>
    </>
  );
}

export default App;
