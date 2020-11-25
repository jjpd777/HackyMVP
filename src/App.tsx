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

  function bubbleSort(arr){
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(arr[j-1].sold >arr[j].sold){
            var temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
         }
      }
    }
    return arr;
 }

  const getSalesSummary = () => {
    let response: any[] = [];
    menuItems.map((item) => {
      if (item.quantityavailable > 0) {
        const itemSold = {
          id: item.id,
          name: item.name,
          sold: item.quantityavailable
        }
        response.push(itemSold);
      }
    }
    )
    var sortedArray = bubbleSort(response);
    sortedArray = sortedArray.reverse()
    console.log(sortedArray)
    var baseURL = "https://wa.me/50232872167?text=";
    const welcome = "Buenas de *Borgoña Gerona*,"
    var totalSales = baseURL + welcome+ "%0A%0AEl dia de hoy las ventas fueron las siguientes:%0A%0A" 
    sortedArray.map((item)=>{
      totalSales+= "*x"+ String(item.sold) + "* "+ item.name +"%0A"
    })
    const rsp = totalSales.split(' ').join("%20");
    setURL(rsp)
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
  const returnNav = (endpoint, text) => endpoint === currentTab ?
    <Button className="highlight">
      <Link to={endpoint} className="navy">
        {text}
      </Link>
    </Button>
    :
    <Link to={endpoint} onClick={() => setCurrentTab(endpoint)} className="nav-link">
      {text}
    </Link>

  const seedButton = ()=>{
    if(loading || !salesItems.length) return
    seedDB.transcribe(menuItems)
    console.log("success")
  }
  const ready = summaryURL !== "";

  const resetDB = ()=>{
    menuItems.map((item)=>{
      const tmp ={
        quantityavailable :0
      }
      DBservice.updateInventory(item.id, tmp)
    })
  }

  // const seedDatabase =()=>{
  //   if(loadingSeed || !seedItems.length) return;
  //   seedDB.transcribe(seedItems);
  //   console.log("SUCCESS")

  //   ///
  // }
  return (

    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            {returnNav("/", "CAJA")}
          </li>
          <li className="nav-item">
            {returnNav("/ventas", "VENTAS")}
          </li>
          <li className="nav-item size-lg">
            {returnNav("/egresos", "REGISTRAR INVENTARIO")}
          </li>
          <li className="nav-item">
            {returnNav("/inventario", "EDITAR INVENTARIO")}
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
                <h1> <FontAwesomeIcon icon={faCashRegister} /> Caja Gerona</h1>
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
                  <h1> <FontAwesomeIcon icon={faBalanceScale} /></h1>
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
            <Switch>

              <Route exact path={["/inventario"]}>
                <br></br>
                <br></br>
                <h1> <FontAwesomeIcon icon={faStoreAlt} /></h1>
                <h2>Editar inventario</h2>
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
          {/* <Button href={summaryURL} onClick={() => getSalesSummary()}>{ready ? "Enviar reporte de ventas" : "Generar reporte"}</Button>
          <Button onClick={()=> resetDB()} ></Button> */}
          <Button onClick={()=> seedButton()}></Button>
    </div>
  );
}

export default App;
