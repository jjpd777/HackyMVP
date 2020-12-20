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
  const restDetails = 
  {
    "id": 1,
    "srcImage":'https://drive.google.com/uc?export=view&id=1wx14Fqu_4OovuKMELpHbiwe2SpaA8gDS',
    "atrestaurant": ' @panaderiaborgona',
    "instaURL": 'https://www.facebook.com/panaderiaborgona',
    "tagline": '',
    "serviceZones": ['Toda la Capital, Carretera, Mixco y Villa Nueva'],
    "schedule":'Delivery todos los días de 8:00AM a 8:00PM',
    "cellphones":["tel:+50254664602"],
    "otherApps":['hugo, ','glovo'],
    "payments": 'Efectivo, tarjeta'
  };

return (
  <div>
        <img src={restDetails["srcImage"]} />
        <div className="tagline">Por favor complete el listado de inventario</div>
  </div>
  );
}

export default Header;