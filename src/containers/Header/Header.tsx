import React, { useEffect, useState } from 'react';
import './Header.scss'
import { DateforSection } from '../../services/DBservice';

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
        {/* <img src={restDetails["srcImage"]} /> */}
        <div className="tagline">Inventario Borgoña</div>]
        <h2>{currentDate}</h2>

  </div>
  );
}

export default Header;