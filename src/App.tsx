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
import { faCashRegister, faBalanceScale, faStoreAlt, faPencilAlt, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import DBseed from "./services/seedDB"
import seedDB from './services/seedDB';



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
  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [uqIDTable, setUqID] = useState<any>([])
  const [currentTab, setCurrentTab] = useState("/");
  const [summaryURL, setURL] = useState("");
  const [STORENAME,setSTORENAME] = useState(DBservice.getStoreName())
  
//======> <======//
// const [seedElements, loadingSeed, errorSeed] = useList(DBservice.getOriginalInventory());
// const [seedItems, setSeed] = useState<any[]>([]);

//======>

  useEffect(() => {
    placeItems(dbElements);
    placeSales(dbSales);
  }, [dbElements, dbSales]);

  // useEffect(()=> getRankings(dbSales))

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


  const getRankings = (dboject) => {
    const uniqd = dboject.map((tutorial) => tutorial.key);
    setUqID(uniqd);

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
      {text}
    </Link>

  const seedButton = ()=>{
    if(loading || !menuItems.length) return
    seedDB.transcribe(menuItems)
    console.log("success")
  }
  const ready = summaryURL !== "";

  

  // const seedDatabase =()=>{
  //   if(loadingSeed || !seedItems.length) return;
  //   seedDB.transcribe(seedItems);
  //   console.log("SUCCESS")

  //   ///
  // }
  return (

    <div className="App">
      <nav className="navbar navbar-expand">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            {returnNav("/", "CAJA")}
          </li>
          <li className="nav-item">
            {returnNav("/ventas", "VENTAS")}
          </li>
          <li className="nav-item size-lg">
            {returnNav("/egresos", "REGISTRAR INV.")}
          </li>
          <li className="nav-item">
            {returnNav("/inventario", "EDITAR INV.")}
          </li>
        </div>
      </nav>
      {/* <Button onClick = {()=>seedButton()}></Button> */}
      {loading ? (<Button size="lg" theme="danger" className="loading">Cargando...</Button>)
        : (
          <div className="container">
            <Switch>
              <Route exact path={["/"]}>
                <br></br>
                <br></br>
                <h1> <FontAwesomeIcon icon={faCashRegister} /> {STORENAME}</h1>
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
                          <FontAwesomeIcon icon={faShoppingCart} />
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
                <Route exact path={["/ventas"]}>
                  <br></br>
                  <br></br>
                  <h1> <FontAwesomeIcon icon={faBalanceScale} />VENTAS</h1>
                  <br></br>
                  <Report salesItems={salesItems} menuItems={menuItems}/>
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
          </div>)}
          {/* <Button onClick={()=> seedDB.resetDB(menuItems)} >hey</Button>  */}
          {/* <Button onClick={()=> seedButton()}></Button> */}
    </div>
  );
}

export default App;
