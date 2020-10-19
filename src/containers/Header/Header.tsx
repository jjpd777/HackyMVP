import React, { useEffect, useState } from 'react';

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
    "srcImage":"https://scontent.fgua5-1.fna.fbcdn.net/v/t1.0-9/60454009_2403050509745003_1658534653943873536_o.png?_nc_cat=108&_nc_sid=85a577&_nc_ohc=E2i8isONLjYAX8WoHjo&_nc_ht=scontent.fgua5-1.fna&oh=aac791af829983b21b70abcdffb419e5&oe=5FB542FE",
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
        <h6>
          La Borgoña
        </h6>
        <p>
          <FontAwesomeIcon icon={faClock} /> {' '} {restDetails["schedule"]}
        </p>
        {restDetails["serviceZones"].map((zones)=>
          <p>
            <FontAwesomeIcon icon={faMapPin} />{' '} {zones}
          </p>
        )}
        <p>
          <FontAwesomeIcon icon={faHandshake} />{' '} {restDetails["payments"]}
        </p>
        <p><FontAwesomeIcon icon={faPhoneAlt}/> 
          <a href={restDetails["cellphones"][0]}>54664602</a> {'  '}{' '}
          <FontAwesomeIcon icon={faCamera}/>
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </p>
  </div>
  );
}

export default Header;