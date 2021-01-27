import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import Header from './containers/Header/Header';
import { InventoryDB } from './services/DBservice';

import ForwardWhatsApp from './ForwardChat';
import { useUser, useFirebaseApp } from 'reactfire';


import PreviousInventory from './containers/PreviousInventory/PreviousInventory'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import Footer from './LandingPage/Footer/Footer';
import DemoTemplate from './LandingPage/Demo/DemoTemplate'

import Signup from './SaaS/containers/Signup/Signup';
import Login from './SaaS/containers/Login/Login';
import Logout from './SaaS/containers/Logout/Logout';
import Exercise from './SaaS/containers/ThrowAwayCode/Excercise'


import {
  faLocationArrow,
  faCamera,
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
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<PageEnum>(PageEnum.CHECKOUT);

  // const firebase = useFirebaseApp();
  const { root4inventory } = InventoryDB();
  const user = useUser();
  console.log("USER BABY", user)

  return (
      <div className="App">
      <ForwardWhatsApp/>
      <br></br>
      <div>
        <h3>Siempre listos.</h3>
      </div>
      </div>
  );
}

export default App;
