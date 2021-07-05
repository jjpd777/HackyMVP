import React, { useEffect, useState } from 'react';
import './App.scss';
import { Button, FormInput } from 'shards-react';
import { menuItemsMock } from './menu';
import Header from './containers/Header/Header';
import borgonaLogo from './borgo.png'
// -- JUAN's NEW IMPORTS
import CRUD from './SaaS/DevModules/CRUD';
import SalesReport from './SaaS/AdminConsole/SalesReport/SalesReport';
import VoidReceipt from './SaaS/AdminConsole/VoidReceipt/VoidReceipt';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import DailySummary from "./SaaS/AdminConsole/DailySummary/DailySummary"

// --

import {
  faShoppingBasket,
  faCamera,
  faPencilAlt,
  faCalendar,
  faCalendarAlt,
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

  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<PageEnum>(PageEnum.MENU);
  const [userPassword, setPassword] = useState("");
  const CORRECT_PASSWORD = userPassword !=="0991";
  const [navHelper, setNavHelper] = useState(false);
  const [receiptPage, setReceiptPage] = useState(false);

  return (
    <div className="App">
      <img className="borgona-logo" src={borgonaLogo}/>
     { !CORRECT_PASSWORD ? <div className="password-input">
        <h3>Ingresar contraseña</h3>
        <FormInput 
        className="input"
        type="text"
        size="lg"
        placeholder={"Ingresar contraseña..."}
        value={userPassword}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        />
      </div> :
      <div className="admin-console">
        <div>
        <Button className="section-nav" onClick={()=>setNavHelper(false)}>
           <FontAwesomeIcon icon={faPencilAlt} /> Reporte diario
          </Button>
          <Button className="section-nav" onClick={()=>{setReceiptPage(false);setNavHelper(true)}}>
          <FontAwesomeIcon icon={faCalendarAlt} /> Reporte global
          </Button>
          <Button className="section-nav" onClick={()=>{setReceiptPage(true)}}>
          <FontAwesomeIcon icon={faCalendarAlt} /> Anular facturas
          </Button>
          
        </div>
        {receiptPage && <VoidReceipt/>}
       {!navHelper && <DailySummary/>}
{ navHelper && <SalesReport/>}      
</div> }
    </div>
  );
}

export default App;
