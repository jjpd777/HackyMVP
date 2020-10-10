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
    "srcImage":"https://scontent-mia3-2.cdninstagram.com/v/t51.2885-19/s320x320/120482521_151410903307821_6112966007451726566_n.jpg?_nc_ht=scontent-mia3-2.cdninstagram.com&_nc_ohc=LYBLNlM8j9EAX_oL28U&oh=6535a9a7179f64b4b6c78f7e5bcab086&oe=5FA973D7",
    "atrestaurant": ' @lalloronagt',
    "instaURL": 'https://www.instagram.com/lalloronagt/',
    "tagline": '',
    "serviceZones": ['Toda la Capital, Carretera, Mixco y Villa Nueva'],
    "schedule":'Delivery de martes a domingo de 12 a 7:30PM',
    "cellphones":["tel:+50241288133"],
    "otherApps":['hugo, ','glovo'],
    "payments": 'Efectivo, tarjeta'
  };

  
return (
  <div>
        <img src="https://scontent-mia3-2.cdninstagram.com/v/t51.2885-19/s320x320/120482521_151410903307821_6112966007451726566_n.jpg?_nc_ht=scontent-mia3-2.cdninstagram.com&_nc_ohc=LYBLNlM8j9EAX_oL28U&oh=6535a9a7179f64b4b6c78f7e5bcab086&oe=5FA973D7" />
        <h6><FontAwesomeIcon icon={faCamera}/>
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </h6>
        <p>
          <FontAwesomeIcon icon={faClock} /> {' '} {restDetails["schedule"]}
        </p>
        <p><FontAwesomeIcon icon={faPhoneAlt}/> {' '}
          <a href={restDetails["cellphones"][0]}>41288133</a>
        </p>

        {restDetails["serviceZones"].map((zones)=>
          <p>
            <FontAwesomeIcon icon={faMapPin} />{' '} {zones}
          </p>
        )}
        <p>
          <FontAwesomeIcon icon={faHandshake} />{' '} {restDetails["payments"]}
        </p>
  </div>
  );
}

export default Header;