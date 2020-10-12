import React, { useEffect, useState } from 'react';

import {
  faClock,
  faHandshake,
  faPhoneAlt,
  faMapPin,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header(){
  const restDetails = 
  {
    "id": 1,
    "srcImage":"https://instagram.fgua5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/121101309_2845114619108723_4004865467128209786_n.jpg?_nc_ht=instagram.fgua5-1.fna.fbcdn.net&_nc_ohc=PlCU-I-QRW8AX9fK0ul&oh=7df54c745c73f48df7bb602af4e2e887&oe=5FAC4D06",
    "atrestaurant": ' @dontacofiestongt',
    "instaURL": 'https://www.instagram.com/dontacofiestongt/',
    "tagline": '',
    "serviceZones": ['9, 10, 13, 14, 15, 16 y CES'],
    "schedule":'Delivery todos los días de 12 a 7:30PM',
    "cellphones":["tel:+50255557444"],
    "otherApps":[],
    "payments": 'Efectivo, tarjeta'
  };

  
return (
  <div>
        <img src={restDetails["srcImage"]} />
        <h6>
          Don Taco Fieston 🌶️
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
          <a href={restDetails["cellphones"][0]}>55557444</a> {'  '}{' '}
          <FontAwesomeIcon icon={faCamera}/>
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </p>
  </div>
  );
}

export default Header;