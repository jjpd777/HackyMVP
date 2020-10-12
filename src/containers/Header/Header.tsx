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
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";

function Header(){
  const restDetails = 
  {
    "id": 1,
    "srcImage":"https://scontent.fgua5-1.fna.fbcdn.net/v/t1.0-9/120343287_3309878435762107_5997515660017944691_n.png?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=nZR8L1CgkJkAX8SjgId&_nc_ht=scontent.fgua5-1.fna&oh=df247ddbb7b331e79ca3a1b972b6a518&oe=5FABC0D3",
    "atrestaurant": ' @PolloGranjeroGuatemala',
    "instaURL": 'https://www.facebook.com/PolloGranjeroGuatemala/',
    "tagline": '¡Recién hecho y crujiente!',
    "serviceZones": ['Ciudad de Guatemala','Sacatepéquez, Chimaltenango, Escuintla, Jalapa', 'Quetzaltenango, San Marcos, Izabal, Petén','El Progreso, Chiquimula, Quiché, Suchitepequez','Santa Rosa, Alta y Baja Verapaz','Retalhuleu, Totonicapán, Sololá'],
    "schedule":'Delivery de martes a domingo de 12 a 7:30PM',
    "cellphones":["tel:+50241288133"],
    "otherApps":['hugo, ','glovo','ubereats'],
    "payments": 'Efectivo, tarjeta'
  };
  const [modalOpen, setModalOpen] = useState(false);


  
return (
  <div>
        <img src={restDetails["srcImage"]} />
        <p>
          <FontAwesomeIcon icon={faClock} /> {' '} {restDetails["schedule"]}
        </p>
        {restDetails["serviceZones"].map((zones)=>
          <p>
            <FontAwesomeIcon icon={faMapPin} />{' '} {zones}
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
        {/* <Dropdown open={modalOpen} toggle={()=>setModalOpen(!modalOpen)} className="d-table">
            <DropdownToggle>Areas de servicio</DropdownToggle>
              <DropdownMenu >
              {restDetails["serviceZones"].map((zones)=>
                <DropdownItem>{zones}</DropdownItem>
              )}
            </DropdownMenu>
        </Dropdown> */}
  </div>
  );
}

export default Header;