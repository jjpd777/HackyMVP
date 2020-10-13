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
    "srcImage":"https://scontent.fgua5-1.fna.fbcdn.net/v/t1.0-9/120343287_3309878435762107_5997515660017944691_n.png?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=nZR8L1CgkJkAX8SjgId&_nc_ht=scontent.fgua5-1.fna&oh=df247ddbb7b331e79ca3a1b972b6a518&oe=5FABC0D3",
    "atrestaurant": ' @PolloGranjeroGuatemala',
    "instaURL": 'https://www.facebook.com/PolloGranjeroGuatemala/',
    "tagline": '¡Recién hecho y crujiente!',
    "serviceZones": ["Mixco", "Ciudad de Guatemala"],
    "schedule":'Delivery de martes a domingo de 12 a 7:30PM',
    "cellphones":["tel:+50241288133"],
    "otherApps":['hugo, ','glovo','ubereats'],
    "payments": 'Efectivo, tarjeta'
  };
  let service= ['Ciudad de Guatemala','Sacatepéquez, Chimaltenango, Escuintla, Jalapa', 'Quetzaltenango, San Marcos, Izabal, Petén','El Progreso, Chiquimula, Quiché, Suchitepequez','Santa Rosa, Alta y Baja Verapaz','Retalhuleu, Totonicapán, Sololá']
  const department ={
    "Mixco" : [["6a Avenida 08-24 zona 1","56287983"],["calz. San Juan 14-06 zona 3","56287819"],["23 Avenida 11-55, zona 4",],
              ["Colonia El Naranjo C.C. Arboreto San Nicolás","56286877"]],
    "Ciudad de Guatemala" : [["1a Avenida 9-45, zona 1","41048525"],["San Raymundo, zona 1","42399603"],["Avenida Bolívar 39-20 zona 3","56253736"]]
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [dep, setDep] = useState("Mixco");
  const [shop, setShop] = useState("6a Avenida 08-24 zona 1");



  
return (
  <div>
        <img src={restDetails["srcImage"]} />
        <p>
          <FontAwesomeIcon icon={faClock} /> {' '} {restDetails["schedule"]}
        </p>
        {service.map((zones)=>
              <p>
                <FontAwesomeIcon icon={faMapPin}/> {' '}{zones}
              </p>
              )}
        <p>
          <FontAwesomeIcon icon={faShoppingBasket}/>{' También disponible en '} {restDetails["otherApps"].map((zones)=> zones)}
        </p>
        <p>
          <FontAwesomeIcon icon={faHandshake} />{' '} {restDetails["payments"]}
        </p>
        <p> 
        <FontAwesomeIcon icon={faCamera}/> {'  '}
          Facebook {'  '}
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </p>
  </div>
  );
}

export default Header;