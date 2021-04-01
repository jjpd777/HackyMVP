import React, { useEffect, useState } from 'react';
import { Button } from 'shards-react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import './Header.scss'
import {
  faLocationArrow,
  faClock,
  faMotorcycle,
  faHandshake,
  faPhone,
  faCreditCard,
  faPhoneAlt,
  faMapPin,
  faShoppingBasket,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header(){
  const restDetails = 
  {
    "id": 1,
    "srcImage":"https://www.hotelhonolulu.com.gt/wp-content/uploads/2016/05/logo-1.png",
    "atrestaurant": ' @lalloronagt',
    "instaURL": 'https://www.instagram.com/lalloronagt/',
    "tagline": '',
    "serviceZones": ['Toda la Capital, Carretera, Mixco y Villa Nueva'],
    "schedule":'Delivery de martes a domingo de 12 a 7:30PM',
    "cellphones":["tel:+50241288133"],
    "otherApps":['hugo, ','glovo'],
    "payments": 'Efectivo, tarjeta'
  };

  
return (
  <div>
        <img src={restDetails["srcImage"]} />
        <div>
        <Link to="/">
          <Button className="nav-btn">
              Menú
          </Button>
        </Link>
        {/* <Link to="/ordenes">
          <Button  className="nav-btn">
              Órdenes
          </Button>
        </Link> */}
        <Link to="/inventario">
          <Button  className="nav-btn">
              Inventario
          </Button>
        </Link>
      
        </div>
        {/* <p>
          <FontAwesomeIcon icon={faClock} /> {' '} {restDetails["schedule"]}
        </p>
        {restDetails["serviceZones"].map((zones)=>
          <p>
            <FontAwesomeIcon icon={faMapPin} />{' '} {zones}
          </p>
        )}
        
        <p>
          <FontAwesomeIcon icon={faShoppingBasket}/>{' También disponible en '} {restDetails["otherApps"].map((zones)=> zones)}
        </p>
        <p>
          <FontAwesomeIcon icon={faHandshake} />{' '} {restDetails["payments"]}
        </p>
        <p><FontAwesomeIcon icon={faPhoneAlt}/> 
          <a href={restDetails["cellphones"][0]}>41288133</a> {'  '}{' '}
          <FontAwesomeIcon icon={faCamera}/>
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </p> */}
  </div>
  );
}

export default Header;