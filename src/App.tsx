import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './cp-menut';
import Header from './containers/Header/Header'



import DBservice from "./services/DBservice";
import DBseed from "./services/seedDB"
import {useList}  from "react-firebase-hooks/database";

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
  const [avTicket, setAvTicket]= useState(0);
  const [avCard, setAvCard]= useState(0);
  const [avCash, setAvCash]= useState(0);

  const displayText = () => !justSee ? "Ingresar venta" : " ver ventas";

  useEffect(() => {
    //   // Call API to load the menu
    placeItems(dbElements);
    placeSales(dbSales);
  }, [dbElements,dbSales]);

  const placeSales = (dboject) =>{
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

  const emptyCart = () =>setCartItems([]);
  
  const getStats = ()=> {
    var salesTotal=0;
    var cardTotal =0;
    var cashTotal = 0;
    salesItems.map((val,key)=> {
      salesTotal+= val.total
      if(val.payment === "tarjeta") cardTotal+=val.total;
      else cashTotal+= val.total;
    })

    const ticket = (salesTotal/salesItems.length);
    const tmp = (Math.round(ticket * 100) / 100).toFixed(2)
    const result= parseFloat(tmp);
    setAvCard(cardTotal);
    setAvCash(cashTotal);
    setAvTicket(result);
  }

  const buttonSales = ()=> justSee ? "danger" : "warning";

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
        (<Button className="navig" theme={buttonSales()} 
        onClick={() => {
          setJustSee(!justSee);
          getStats();
          DBseed.transcribe();
        }}>
          Cambiar a {displayText()}</Button>)
        }
      {!loading && (
        <>
          {  salesItems.length !==0 && currentPage === PageEnum.MENU && !justSee && (
            <>
            <h3># Ticket: {salesItems.length}</h3>
            <h3><b>Q.</b>{avTicket} promedio / ticket</h3>
            <h5>Ventas tarjeta: Q.{avCard}</h5>
            <h5>Ventas cash: Q.{avCash}</h5>
            
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
                emptyCart={()=>emptyCart()}
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
