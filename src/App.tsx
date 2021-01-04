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
import DBservice, {AdminReportsDB, DateUtil, StoreDetailUtil,
  DailyTransactionsDB, SalesDB,
  InventoryDB
} from "./services/DBservice";
import { Switch, Route, Link } from "react-router-dom";
import AddItem from './containers/AddItems/AddItems';
import Sales from './containers/Sales/Sales';
import {sumShopSales, bubbleSort} from './utils/Utils';
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
  const getFitFlag = DBservice.getFitFlag();
  const {getStandardDate} = DateUtil();
  const {root4shops} = AdminReportsDB();
  const {getDailyTransactions} = DailyTransactionsDB();
  const {getAllSales} = SalesDB();
  const {getAllInventory} = InventoryDB();
  const {GET_STORE_NAME} = StoreDetailUtil();
  const STORENAME = GET_STORE_NAME();


  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [salesItems, setSalesItems] = useState<any[]>([]);
  const [cart, setCartItems] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState("/");
  const [summaryURL, setURL] = useState("");


  const [registerItems, setRegisterItems] = useState<any[]>([]);
  const [enterOrExit, setEnterOrExit] = useState<boolean>(true);

  const [salesAll, setAllShops] = useState<any[]>([]);
  const [loadingReport, setLoading] = useState<boolean>(true);
  const [shopKeys, setShopKeys] = useState<any[]>([]);
  const [individualShops, setIndividualShops] =useState<any[]>([]);


 useEffect(()=>{
  const ref = getDailyTransactions();
  const refVal = ref.on('value', function (snapshot) {
    const snap = snapshot.val();
    if(!snap) return;
    const respKeys = Object.keys(snap);
    setRegisterItems(respKeys.map((k)=>snap[k]))
  });
  return () => ref.off('value', refVal)
}, [])

useEffect(()=>{
  const ref = getAllSales();
  const refVal = ref.on('value', function (snapshot) {
    const snap = snapshot.val();
    if(!snap) return;
    const respKeys = Object.keys(snap);
    setSalesItems(respKeys.map((k)=>snap[k]))
  });
  return () => ref.off('value', refVal)
}, [])

useEffect(()=>{
  const ref = getAllInventory();
  const refVal = ref.on('value', function (snapshot) {
    const snap = snapshot.val();
    if(!snap) return;
    const respKeys = Object.keys(snap);
    setMenuItems(respKeys.map((k)=>snap[k]))
  });
  return () => ref.off('value', refVal)
}, [])



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
      <nav className="navbar navbar-expand">
        <div className="navbar-nav mr-auto">
        {/* { getFitFlag && <li className="nav-item">
            {returnNav("/", "INGRESOS & EGRESOS")}
          </li>} */}
          <li className="nav-item">
            {returnNav("/ventas", "VENTAS ")}
          </li>
         {/* {getFitFlag && <li className="nav-item">
            {returnNav("/newsfeed", "NEWSFEED")}
          </li>} */}
          <li className="nav-item size-lg">
            {returnNav("/registro", "REGISTRAR INV.")}
          </li>
          <li className="nav-item">
            {returnNav("/inventario", "EDITAR INV.")}
          </li>
          {/* {getFitFlag &&<li className="nav-item">
            {returnNav("/instock", "STOCK")}
          </li>} */}
        </div>
      </nav>
      {false ? (<Button size="lg" theme="danger" className="loading">Cargando...</Button>)
        : (
          <div className="container">
            <Switch>
              <Route exact path={["/"]}>
              <Report/>
              </Route>
            </Switch>
            {false || false ?
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
                  ></Menu> */}
                 {/* <Report salesItems={salesItems} menuItems={menuItems} registerItems={registerItems}/> */}
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
              {!!cart.length &&  <h1>{"DESPACHOS"}</h1>}
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
                 
              <Route exact path={["/registro"]}>
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
