import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { useList } from "react-firebase-hooks/database";
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import Expenditure from './containers/Checkout/Expenditure';
import Report from './containers/Report/Report'
import DBservice from "./services/DBservice";
import { Switch, Route, Link } from "react-router-dom";
import AddItem from './containers/AddItems/AddItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCashRegister,faBalanceScale,faStoreAlt} from '@fortawesome/free-solid-svg-icons';



export interface CartItem {
  itemId: number;
  quantity: number;
}
export enum PageEnum {
  MENU,
  CHECKOUT,
  ADDITEM
}
function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [salesItems, setSalesItems] = useState<any[]>([]);
  const [dbElements, loading, error] = useList(DBservice.getAll("/inventario-borgona"));
  const [dbSales, salesLoading, salesError] = useList(DBservice.getAll("/ventas-borgona"));
  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [currentTab, setCurrentTab] = useState("/");
  useEffect(() => {
    placeItems(dbElements);
    placeSales(dbSales);
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
  const returnNav = (endpoint, text) => endpoint === currentTab ?
    <Button className="highlight"
    >
      <Link to={endpoint} className="navy">
        {text}
      </Link>
    </Button>
    :
    <Link to={endpoint} onClick={() => setCurrentTab(endpoint)} className="nav-link">
      {text}
    </Link>

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            {returnNav("/", "PoS")}
          </li>
          <li className="nav-item">
            {returnNav("/ventas", "Ver ventas")}
          </li>
          <li className="nav-item">
            {returnNav("/egresos", "Ingresar egreso")}
          </li>
          {/* <li className="nav-item">
            {returnNav("/inventario", "Revisar Inventario")}
          </li> */}
        </div>
      </nav>
      {loading ? (<Button size="lg" theme="danger" className="loading">Cargando...</Button>)
        : (
          <div className="container">
            <Switch>
              <Route exact path={["/"]}>
                <br></br>
                <br></br>
              <h1> <FontAwesomeIcon icon={faCashRegister}/></h1>
                <Menu
                  menuItems={menuItems}
                  cart={cart}
                  setCartItems={setCartItems}
                  pos={"pos"}
                ></Menu>
                <div className="fixed-checkout">
                  {(cart.length > 0 && (
                    <Link to={"/checkout"}>
                      <Button
                        className="checkout-button" block>
                        Revisar la venta
                  </Button>
                    </Link>
                  )) ||
                    null}
                </div>
              </Route>
            </Switch>
            {loading || salesLoading ?
              (<Button size="lg" theme="danger" className="loading">Cargando...</Button>)
              :
              (<Switch>
                <Route exact path={["/ventas"]}>
                <br></br>
                <br></br>
                <h1> <FontAwesomeIcon icon={faBalanceScale}/></h1>
                <br></br>
                  <Report salesItems={salesItems} />
                  <Menu
                    menuItems={salesItems}
                    cart={cart}
                    setCartItems={setCartItems}
                    pos={"sales"}
                  ></Menu>
                </Route>
              </Switch>)}

            <Switch>

              <Route exact path={["/checkout"]}>
                <Checkout
                  menuItems={menuItems}
                  cart={cart}
                  totalCartValue={getTotalCartValue()}
                  emptyCart={() => emptyCart()}
                ></Checkout>
              </Route>
            </Switch>
            <Switch>

          <Route exact path={["/egresos"]}>
            <Expenditure
              menuItems={menuItems}
              cart={cart}
              totalCartValue={getTotalCartValue()}
              emptyCart={() => emptyCart()}
            ></Expenditure>
          </Route>
          </Switch>
            {/* <Switch>

              <Route exact path={["/inventario"]}>
              <br></br>
              <br></br>
                <h1> <FontAwesomeIcon icon={faStoreAlt}/></h1>
                <AddItem
                  menuItems={menuItems}
                  cart={cart}
                  totalCartValue={getTotalCartValue()}
                  emptyCart={() => emptyCart()}
                  pos={"edit"}
                ></AddItem>
              </Route>
            </Switch> */}
          </div>)}
    </div>
  );
}

export default App;
