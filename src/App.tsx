import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './cp-menut';
import Header from './containers/Header/Header'



import DBservice from "./services/DBservice";
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

  const displayText = () => !justSee ? " modo editar" : " ver listados";

  useEffect(() => {
    //   // Call API to load the menu
    placeItems(dbElements);
    placeSales(dbSales);
  }, [dbElements,dbSales]);

  const placeSales = (dboject) =>{
    // if(dbSales) dbSales.map((val)=>console.log(val.val()))
    const obj = dboject.map((tutorial) => tutorial.val());
    const uniqd = dboject.map((tutorial) => tutorial.key);
    obj.map((item, ix) => item.id = uniqd[ix]);
    console.log(obj)
    setSalesItems(obj);
  }
  const placeItems = (dboject) => {
    // THIS IS SO HACKY LOOOOOOL BY FAR THE MOST VULNERABLE PART OF THE APPLICATION
    const obj = dboject.map((tutorial) => tutorial.val());
    const uniqd = dboject.map((tutorial) => tutorial.key);
    obj.map((item, ix) => item.id = uniqd[ix]);
    setMenuItems(obj);
  }

  const examineSales = ()=> salesItems.map((val)=> console.log(val.pedido[0]))
  const getRows = () => {
    if (dbElements) {
      dbElements.map((item) => {
        const temp = item.val();
        console.log(temp)
        var data = {
          id: 0,
          category: "",
          name: "",
          brief: "",
          quantityavailable: 0,
          price: 0,
          image: "",
        };
        // data.title=item.title,
        data.id = temp.id;
        data.name = temp.name;
        data.category = temp.category;
        data.brief = temp.brief;
        data.quantityavailable = temp.quantityavailable;
        data.price = temp.price;
        data.image = temp.image;

      })
    }

  }
  const transcribe = () => {
    let ptr = 0;
    menuItemsMock.map((item) => {
      var data = {
        id: 0,
        category: "",
        name: "",
        brief: "",
        quantityavailable: 0,
        price: 0,
        image: "",
      };
      // data.title=item.title,
      data.id = ptr;
      data.name = item.name;
      data.category = item.category;
      data.brief = item.brief;
      data.quantityavailable = 20;
      data.price = item.price;
      data.image = item.image;
      ptr += 1;
      DBservice.create(data)
        .then(() => {
          console.log(data)
        })
        .catch(e => {
          console.log(e);
        });
    })

  }


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
        (<Button className="navig" onClick={() => setJustSee(!justSee)}>Cambiar a {displayText()}</Button>)
        }
        {/* {loading && (<Button className="navig"> Cargando...</Button>)} */}

      {!loading && (
        <>
          {  salesItems.length !==0 && !justSee && (
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
                Revisar la lista para enviar
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
