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
    "tagline": '',
    "srcImage":"https://scontent.fgua3-1.fna.fbcdn.net/v/t1.0-9/67555733_475126833276658_2663909991685029888_n.jpg?_nc_cat=110&ccb=1&_nc_sid=09cbfe&_nc_ohc=38mBIfpHdHcAX8wRPSN&_nc_ht=scontent.fgua3-1.fna&oh=0dbc6069c4f51c52d951eb71e0c8efe4&oe=5FB56750",
    "atrestaurant": ' @rojsyrups',
    "instaURL": 'https://www.facebook.com/rojsyrups',
    "serviceZones": ['Envíos a toda guatemala'],
    "schedule":'Röj es una marca 100% Guatemalteca dedicada a la producción y distribución de productos relacionados a la industria alimenticia y de bebidas.',
    "cellphones":["tel:+50248056252"],
    "otherApps":['hugo, ','glovo'],
    "payments": 'Efectivo, tarjeta'
  };

return (
  <div>
        <img src={restDetails["srcImage"]} />
        <h6>
          Röj Syrups
        </h6>
        <p> {'Röj es una marca 100% Guatemalteca'}</p>
        <p>{'dedicada a la producción y distribución de productos'}</p>
        <p>{'relacionados a la industria alimenticia y de bebidas.'}</p>
        {restDetails["serviceZones"].map((zones)=>
          <p>
            <FontAwesomeIcon icon={faMapPin} />{' '} {zones}
          </p>
        )}
        <p><FontAwesomeIcon icon={faPhoneAlt}/> 
          <a href={restDetails["cellphones"][0]}>48056252</a> {'  '}{' '}
          <FontAwesomeIcon icon={faCamera}/>
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </p>
  </div>
  );
}

export default Header;