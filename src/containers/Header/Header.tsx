import React, { useEffect, useState } from 'react';

import {
  faLocationArrow,
  faClock,
  faMotorcycle,
  faHandshake,
  faPhone,
  faCreditCard,
  faMapPin,
  faShoppingBasket,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header(){
  const restDetails = 
  {
    "id": 1,
    "srcImage":"https://scontent-mia3-2.cdninstagram.com/v/t51.2885-19/s320x320/120482521_151410903307821_6112966007451726566_n.jpg?_nc_ht=scontent-mia3-2.cdninstagram.com&_nc_ohc=LYBLNlM8j9EAX_oL28U&oh=6535a9a7179f64b4b6c78f7e5bcab086&oe=5FA973D7",
    "atrestaurant": ' @lallorona',
    "instaURL": 'https://www.instagram.com/lalloronagt/',
    "tagline": '',
    "serviceZones": ['Z.1,2,3,4','Santa Rosa, Jocotenango'],
    "schedule":'none',
    "cellphones":"tel:+",
    "otherApps":['hugo, ','glovo'],
    "payments": 'Efectivo, tarjeta'
  };

  
return (
  <div>
        <img src="https://images.squarespace-cdn.com/content/502eafb484ae7fae2e634f8b/1488919372181-XYOXZE2C90WDZYF4RRVG/LogoChinitoVeloz.png" />
        <h6><FontAwesomeIcon icon={faCamera}/>
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </h6>        
        {restDetails["serviceZones"].map((zones)=>
          <p>
            <FontAwesomeIcon icon={faMapPin} />{' '} {zones}
          </p>
        )}
        <p>
          <FontAwesomeIcon icon={faClock} /> lunes a sábado de 11 a 15 hs y de
          19 a 23 30hs{' '}
        </p>
        <p>
          <FontAwesomeIcon icon={faShoppingBasket}/> {restDetails["otherApps"].map((zones)=> zones)}
        </p>
        <p>
          <FontAwesomeIcon icon={faHandshake} /> {restDetails["payments"]}
        </p>
  </div>
  );
}

export default Header;