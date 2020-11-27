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
  faFlagCheckered,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header(){
return (
  <div>
        <img src="https://www.ufinet.com/wp-content/uploads/2015/09/logo_ufinet.png" />
        <img className="contratista" src="http://ingetelca.gt/wp-content/uploads/2011/07/logopeq.png" />
        <div className="tagline">Formulario seguridad industrial:</div>
        <p>Control preventivo</p>
        <br></br>
        <br></br>
        <br></br>
  </div>
  );
}

export default Header;