import React, { useEffect, useState } from 'react';
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
return (
  <div>
        <img src="http://ingetelca.gt/wp-content/uploads/2011/07/logopeq.png" />
        <div className="tagline">Seguridad industrial</div>
  </div>
  );
}

export default Header;