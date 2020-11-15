import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { useList } from "react-firebase-hooks/database";
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import Report from  './containers/Report/Report'
import DBservice from "./services/DBservice";
import { Switch, Route, Link } from "react-router-dom";
import AddItem from './containers/AddItems/AddItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



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
  
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"}>
          <a className="navbar-brand">
            PoS
        </a>
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/ventas"} className="nav-link">
              Ver ventas
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/inventario"} className="nav-link">
              Revisar inventario
            </Link>
          </li>
        </div>
      </nav>
      {loading ? (<Button size="lg" theme="danger" className="loading">Cargando...</Button>)
        : (
          <div className="container">
            <Switch>
              <Route exact path={["/"]}>
              <div className="header">
                  <img src={"https://instagram.fgua5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/73109864_437198983604933_5970391247410429952_n.jpg?_nc_ht=instagram.fgua5-1.fna.fbcdn.net&_nc_ohc=pZ7nrgvH55oAX_9jd80&_nc_tp=25&oh=69101cbffab18c7d2d602b70640b09a4&oe=5FD82A2F"} />
              </div>
                <Menu
                  menuItems={menuItems}
                  cart={cart}
                  setCartItems={setCartItems}
                  pos={true}
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
            {salesLoading ? 
            (<Button size="lg" theme="danger" className="loading">Cargando...</Button>)
              :
            (<Switch>
              <Route exact path={["/ventas"]}>
                <Report salesItems={salesItems}/>
                <Menu
                  menuItems={salesItems}
                  cart={cart}
                  setCartItems={setCartItems}
                  pos={false}
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
              
              <Route exact path={["/inventario"]}>
                <AddItem
                  menuItems={menuItems}
                  cart={cart}
                  totalCartValue={getTotalCartValue()}
                  emptyCart={() => emptyCart()}
                ></AddItem>
              </Route>
            </Switch>
          </div>)}
    </div>
  );
}

export default App;
