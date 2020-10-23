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
  faBreadSlice,
  faCamera,
  faTabletAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header(){
  const restDetails = 
  {
    "id": 1,
    "srcImage":"https://instagram.fgua5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/64344507_1279146298916180_8296909584941973504_n.jpg?_nc_ht=instagram.fgua5-1.fna.fbcdn.net&_nc_ohc=1nNyl4CPqfEAX_5sXgt&oh=49b2e6bfb95fe31d4cdd33f219c355d1&oe=5FB8FFA8",
    "atrestaurant": ' @getfitbakery',
    "instaURL": 'https://www.instagram.com/getfitbakery/',
    "tagline": '',
    "serviceZones": ['Metroplaza, Carretera a El Salvador','Plaza futeca zona 14'],
    "schedule":'Todos los dias de 9AM a 7PM',
    "cellphones":["tel:+50249789129"],
    "otherApps":['hugo, ','glovo'],
    "payments": 'Efectivo, tarjeta'
  };
//   ❇️
// ❇️Productos altos en proteína

return (
  <div>
        <img src={restDetails["srcImage"]} />
        <h5>
          Get Fit Bakery
        </h5>
        <p>
          <FontAwesomeIcon icon={faBreadSlice}/> <b>{'  Productos sin harina, sin azúcar, sin gluten'}</b>
        </p>
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
          <a href={restDetails["cellphones"][0]}>41288133</a> {'  '}{' '}
          <FontAwesomeIcon icon={faCamera}/>
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </p>
  </div>
  );
}

export default Header;