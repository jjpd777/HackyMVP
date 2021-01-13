import React, { useEffect, useState } from 'react';
import './Header.scss'
import { DateforSection } from '../../services/DBservice';
import logo from '../../fire-logo.png'

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
  const currentDate = DateforSection().split('/')[0];

return (
  <div>
        <img className="listo-logo-png"src={logo} />
        <div className="tagline">Inventario Borgoña
        <h2>{currentDate}</h2>
        </div>]

  </div>
  );
}

export default Header;