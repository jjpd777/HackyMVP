import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './cp-menut';
import Header from './containers/Header/Header'
import Report from './containers/Report/Report'
import DBservice from "./services/DBservice";
import DBseed from "./services/seedDB"
import { useList } from "react-firebase-hooks/database";

import {
  faCashRegister,
  faEnvelope,
  faMoneyBill,
  faCreditCard,
  faSearchDollar,
  faMoneyBillAlt,
  faCoins,
  faMoneyBillWave
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
  const [salesItems, setSalesItems] = useState<any[]>([]);

  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<PageEnum>(PageEnum.MENU);
  const [dbElements, loading, error] = useList(DBservice.getAll("/inventario-borgona"));
  const [dbSales, salesLoading, salesError] = useList(DBservice.getAll("/ventas-borgona"));
  const [justSee, setJustSee] = useState(true);
  const [pos, setPos] = useState(true);

  const [loaded, setLoaded] = useState(false)


  useEffect(() => {
    placeItems(dbElements);
    placeSales(dbSales);
    setLoaded(true);
  }, [dbElements, dbSales]);


  const placeSales = (dboject) => {
    const obj = dboject.map((tutorial) => tutorial.val());
    const uniqd = dboject.map((tutorial) => tutorial.key);
    obj.map((item, ix) => item.id = uniqd[ix]);
    const sales = obj.reverse();
    setSalesItems(sales);
  }
  const placeItems = (dboject) => {
    // THIS IS SO HACKY LOOOOOOL BY FAR THE MOST VULNERABLE PART OF THE APPLICATION
    const obj = dboject.map((tutorial) => tutorial.val());
    const uniqd = dboject.map((tutorial) => tutorial.key);
    obj.map((item, ix) => item.id = uniqd[ix]);
    setMenuItems(obj);
  }

  const emptyCart = () => setCartItems([]);

  const buttonSales = justSee ? "danger" : "warning";
  const displayText = () => !justSee ? <FontAwesomeIcon icon={faCashRegister}/> : <FontAwesomeIcon icon={faMoneyBillAlt}/>;

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
          <Header />
        </header>
        {loading ? (
        <>
          <Button className="navig"> Cargando...</Button>
        </>) :
        (pos && <Button className="navig" theme={buttonSales}
          onClick={() => {
            setJustSee(!justSee);
          }}>
          Cambiar a {displayText()}</Button>)
      }
      { !justSee && !salesLoading &&
              <Report salesItems={salesItems}/>
      }
      
      {!loading && (
        <>
          {salesItems.length !== 0 && currentPage === PageEnum.MENU && !justSee && (
            <>
              <Menu
                menuItems={salesItems}
                cart={cart}
                setCartItems={setCartItems}
                pos={false}
              ></Menu>
            </>
          )}
          <section className="container">
            {(currentPage === PageEnum.MENU && justSee) && (
              <>
                <Menu
                  menuItems={menuItems}
                  cart={cart}
                  setCartItems={setCartItems}
                  pos={true}
                ></Menu>
              </>
            )}
            {currentPage === PageEnum.CHECKOUT && (
              <Checkout
                menuItems={menuItems}
                cart={cart}
                totalCartValue={getTotalCartValue()}
                emptyCart={() => emptyCart()}
                onBack={() => {
                  setCurrentPage(PageEnum.MENU);
                  setPos(true);
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
                  setPos(false)
                }}
                className="checkout-button"
                block
              >
                Revisar la compra para enviar
          </Button>
            </div>
          )) ||
            null}
        </>
      )}
    </div>
  );
}

export default App;
