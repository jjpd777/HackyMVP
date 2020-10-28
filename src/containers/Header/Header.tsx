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
    "srcImage":"https://instagram.fgua5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/73109864_437198983604933_5970391247410429952_n.jpg?_nc_ht=instagram.fgua5-1.fna.fbcdn.net&_nc_ohc=OibmhcDZnYEAX85Eq0i&oh=f18253512c20eb7f0c45d11ffff16115&oe=5FC463AF",
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