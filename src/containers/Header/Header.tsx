import React, { useEffect, useState } from 'react';
import "./Header.scss"

import {
  faLocationArrow,
  faClock,
  faMotorcycle,
  faHandshake,
  faPhone,
  faCreditCard,
  faPhoneAlt,
  faMapPin,
  faMapMarker,
  faShoppingBasket,
  faBroom,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,  
  FormRadio,
  Button,
} from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps {
  displayMenu: ()=>void;
  setStorePhone: (String)=>void;
  setStoreDep: (String) =>void;
  isDisplaying: boolean;
}
function Header(props: HeaderProps){
  let {isDisplaying}=props;
  const restDetails = 
  {
    "id": 1,
    "srcImage":"https://images.squarespace-cdn.com/content/502eafb484ae7fae2e634f8b/1488919372181-XYOXZE2C90WDZYF4RRVG/LogoChinitoVeloz.png",
    "atrestaurant": ' @PolloGranjeroGuatemala',
    "instaURL": 'https://www.facebook.com/PolloGranjeroGuatemala/',
    "tagline": '¡Recién hecho y crujiente!',
    "serviceZones": ["Mixco", "Ciudad de Guatemala"],
    "schedule":'Domicilios a diario de 10:30AM a 8:30PM',
    "cellphones":["tel:+50241288133"],
    "otherApps":['glovo y ubereats'],
    "payments": 'Efectivo, tarjeta'
  };
  // let service= ['Ciudad de Guatemala','Sacatepéquez', 'Chimaltenango', 'Escuintla', 'Jalapa', 'Quetzaltenango', 'San Marcos', 'Izabal', 'Petén','El Progreso', 'Chiquimula', 'Quiché', 'Suchitepequez','Santa Rosa', 'Alta y Baja Verapaz','Retalhuleu', 'Totonicapán', 'Sololá']
  let service= ['Ciudad de Guatemala','Departamentos']

  const department ={
    "Departamentos" : [["Antigua Guatemamala y Jocotenango","50165183"],["Pastores, San Felie, San Isidro","50165183"],["Santa Ana, Ciudad Vieja","50165183"],],
    "Ciudad de Guatemala" : [["zonas: 9,10,13,14,15 y parte de Carretera","50165183"],["zonas: 1,2,3,7,11,12 y Mixco","42399603"],["Villa Nueva, Bárcenas, San José","56243902"],["San Miguel Petapa, z.5 Villa Nueva, Villa Hermosa","56243902"],["Alamos y colonias aledañas, El Frutal","56243902"],]
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [dep, setDep] = useState("");
  const [shop, setShop] = useState("");


  
return (
  <div>
        <img src={restDetails["srcImage"]} />
        {!isDisplaying &&
        (<>
        <h6>
          <FontAwesomeIcon icon={faClock} /> {' '} {restDetails["schedule"]}
        </h6>
        <p>Zonas sujetas a horario y cobertura*</p>
        <h6>
          <FontAwesomeIcon icon={faShoppingBasket}/>{' También en '} {restDetails["otherApps"].map((zones)=> zones)}
        </h6>
        <h6>
          <FontAwesomeIcon icon={faHandshake} />{' '} {restDetails["payments"]}
        </h6>
        </>)|| null }
        {/* <p> 
        <FontAwesomeIcon icon={faCamera}/> {'  '}
          Facebook {'  '}
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </p> */}
        <Dropdown open={modalOpen} toggle={()=>setModalOpen(!modalOpen)} className="drop-down">
            <DropdownToggle className ="button" split><b>Departamentos</b></DropdownToggle>
              <DropdownMenu >
              {service.map((zones)=>
                <DropdownItem 
                  onClick={()=>{
                      setDep(zones);
                      props.setStoreDep(zones);
                    }} >
                  <FontAwesomeIcon icon={faMapPin}/> {' '} {zones}
                </DropdownItem>
              )}
            </DropdownMenu>
        </Dropdown>
    
        {dep!=="" &&(
          <>
          <Dropdown direction="down" open={modalOpen1} toggle={()=>setModalOpen1(!modalOpen1)} className="drop-down">
          <DropdownToggle className ="dir" split><b>Locales</b></DropdownToggle>
            <DropdownMenu >
            {department[dep].map((locations)=>
              <DropdownItem 
              onClick={()=>{
                setShop(locations[0]);
                props.setStorePhone(locations[1]);
                  }}>
                {' '} {locations[0]}
              </DropdownItem>
            )}
          </DropdownMenu>
         </Dropdown>
         <h5> 
          <FontAwesomeIcon icon={faMapMarker}/> Pedir Chinito Veloz en {' '} <b>{dep}</b>
        </h5>
         {shop !=="" &&(
           <>
          <h5>
            <FontAwesomeIcon icon={faMapPin}/> {' '}{shop}
          </h5>
            {!isDisplaying&&(<Button className="see-menu" theme="success" onClick ={()=>props.displayMenu()}>Ver el menú</Button>)||null}
          </>
          ) || null}
          </>
        )   
          || null }

  </div>
  );
  
}

export default Header;