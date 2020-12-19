import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { useList } from "react-firebase-hooks/database";
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import Expenditure from './containers/Checkout/Expenditure';
import Report from './containers/Report/Report';
import Inventory from './containers/Inventory/Inventory';
import Movements from './containers/Movements/Movements';
import DBservice from "./services/DBservice";
import { Switch, Route, Link } from "react-router-dom";
import AddItem from './containers/AddItems/AddItems';
import Sales from './containers/Sales/Sales';
// import AdminAccess from './AdminAccess/AdminAccess'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered, faCashRegister, faBalanceScale, faStoreAlt, faPencilAlt, faTimes, faShoppingCart, faTruck } from '@fortawesome/free-solid-svg-icons';



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

  const [dbElements, loading, error] = useList(DBservice.getAllInventory());
  const [dbSales, salesLoading, salesError] = useList(DBservice.getAllSales());
  const [cart, setCartItems] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState("/");
  const [summaryURL, setURL] = useState("");
  const [STORENAME,setSTORENAME] = useState(DBservice.getStoreName())

  const [dbRegisterSales, regLoading, regError] = useList(DBservice.getAllTest());
  const [registerItems, setRegisterItems] = useState<any[]>([]);
  const [enterOrExit, setEnterOrExit] = useState<boolean>(true);


  useEffect(() => {
    placeItems(dbElements);
    placeSales(dbSales);
    // checkIfFirstSale();
  }, [dbElements, dbSales]);

  useEffect(()=> placeRegister(dbRegisterSales),[dbRegisterSales] )

  
  useEffect(()=> checkIfFirstSale())

   

    const startSalesDay = ()=>{
        if(loading || registerItems.length) return;
        DBservice.seedSales(menuItems);
    }

    const checkIfFirstSale = ()=>{ 
      if(dbRegisterSales) if( !regLoading && !dbRegisterSales.length) startSalesDay();
      else return;
    };

  const placeSales = (dboject) => {
    const obj = dboject.map((tutorial) => tutorial.val());
    const uniqd = dboject.map((tutorial) => tutorial.key);
    obj.map((item, ix) => item.id = uniqd[ix]);
    const sales = obj.reverse();
    setSalesItems(sales);
  }
  const placeItems = (dboject) => {
    const obj = dboject.map((tutorial) => tutorial.val());
    const uniqd = dboject.map((tutorial) => tutorial.key);

    obj.map((item, ix) => item.id = uniqd[ix]);
    setMenuItems(obj);
  }

  const placeRegister = (dboject) => {
    const obj = dboject.map((tutorial) => tutorial.val());
    const uniqd = dboject.map((tutorial) => tutorial.key);
    obj.map((item, ix) => item.uniqueIdentifier = uniqd[ix]);
    setRegisterItems(obj);
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
  const returnNav = (endpoint, text) => 
    <Link  to={endpoint} onClick={() => setCurrentTab(endpoint)} className="nav-link">
      {text} |
    </Link>

  const ready = summaryURL !== "";

////
// console.log("INVfasdfasdf", registerItems)


  return (

    <div className="App">
      {/* <Button onClick = {()=> DBservice.helperAdmin(menuItems)}> HEYO</Button> */}
      <nav className="navbar navbar-expand">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            {returnNav("/", "INGRESOS & EGRESOS")}
          </li>
          {/* <li className="nav-item">
            {returnNav("/registro", "INGRESOS & EGRESOS")}
          </li> */}
          <li className="nav-item">
            {returnNav("/ventas", "VENTAS")}
          </li>
          <li className="nav-item">
            {returnNav("/newsfeed", "NEWSFEED")}
          </li>
          <li className="nav-item size-lg">
            {returnNav("/egresos", "REGISTRAR INV.")}
          </li>
          <li className="nav-item">
            {returnNav("/inventario", "EDITAR INV.")}
          </li>
          <li className="nav-item">
            {returnNav("/instock", "STOCK")}
          </li>
        </div>
      </nav>
      {loading ? (<Button size="lg" theme="danger" className="loading">Cargando...</Button>)
        : (
          <div className="container">
            <Switch>
              <Route exact path={["/"]}>
                <br></br>
                <br></br>
                {/* <h1> {STORENAME} {" "} <FontAwesomeIcon icon={faFlagCheckered}/></h1> */}
                <Button className ="enterOrExit" onClick={()=>setEnterOrExit(!enterOrExit)}> {enterOrExit ? "INGRESOS" : "EGRESOS"}</Button>
                <Menu
                  menuItems={menuItems}
                  cart={cart}
                  setCartItems={setCartItems}
                  pos={"pos"}
                ></Menu>
                <br></br>
                <br></br>
                <div className="fixed-checkout">
                  {(cart.length > 0 && (
                    <>
                      <Link className="tmp" to={"/checkout"}>
                        <Button
                          className="checkout-button" block>
                          <FontAwesomeIcon icon={faTruck} />
                        </Button>
                      </Link>
                      <Button onClick={() => emptyCart()} className="empty" theme="danger" outline block> <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </>
                  )) ||
                    null}
                </div>
              </Route>
            </Switch>
            {loading || salesLoading ?
              (<Button size="lg" theme="danger" className="loading">Cargando...</Button>)
              :
              (<Switch>
                <Route exact path={["/newsfeed"]}>
                  <br></br>
                  <br></br>
                  <h1> <FontAwesomeIcon icon={faTruck} />{'  '}Newsfeed</h1>
                  {/* <Menu
                    menuItems={salesItems}
                    cart={registerItems}
                    setCartItems={setCartItems}
                    pos={"sales"}
                  ></Menu>
                 <Report salesItems={salesItems} menuItems={menuItems} registerItems={registerItems}/> */}
                 <Movements/>
                </Route>
              </Switch>)}
              <Switch>

            <Route exact path={["/ventas"]}>
                <Sales/>
            </Route>
            </Switch>
  
            <Switch>

              <Route exact path={["/checkout"]}>
              <br></br>
              <br></br>
              <br></br>
              {!!cart.length &&  <h1>{enterOrExit ? "INGRESOS" : "EGRESOS"}</h1>}
                <Checkout
                  menuItems={menuItems}
                  cart={cart}
                  totalCartValue={getTotalCartValue()}
                  emptyCart={() => emptyCart()}
                  registerItems ={registerItems}
                  enterOrExit = {enterOrExit}
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
            <Switch>
              <Route exact path={["/inventario"]}>
                <br></br>
                <br></br>
                <h1> <FontAwesomeIcon icon={faStoreAlt} /> Editar</h1>
                <AddItem
                  menuItems={menuItems}
                  cart={cart}
                  totalCartValue={getTotalCartValue()}
                  emptyCart={() => emptyCart()}
                  pos={"edit"}
                ></AddItem>
              </Route>
            </Switch>

            <Switch>
              <Route exact path={["/instock"]}>
                <br></br>
                <br></br>
                <h1> <FontAwesomeIcon icon={faStoreAlt} /> Inventario</h1>
              <Inventory
              registerItems ={registerItems}

              ></Inventory>
              </Route>
            </Switch>
          </div>)}

         
          {/* <Switch>
              <Route exact path={["/admin"]}>
                <br></br>
                <br></br>
                <h1> <FontAwesomeIcon icon={faStoreAlt} /> Editar</h1>
               <AdminAccess menuItems={menuItems} loading={loading}/>
              </Route>
            </Switch> */}
    </div>
  );
}

export default App;
