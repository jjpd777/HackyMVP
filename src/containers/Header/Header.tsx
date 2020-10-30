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
    "srcImage":"https://scontent.fgua5-1.fna.fbcdn.net/v/t1.0-9/88347116_1255330151323389_7782638975537119232_o.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_ohc=4sUxaGW2tsUAX-2vJWG&_nc_ht=scontent.fgua5-1.fna&oh=51dba7bdad8a4273815ba14f7f9aeb47&oe=5FC0D712",
    "atrestaurant": ' @PolloGranjeroGuatemala',
    "instaURL": 'https://www.facebook.com/PolloGranjeroGuatemala/',
    "tagline": '¡Recién hecho y crujiente!',
    "serviceZones": ["Mixco", "Ciudad de Guatemala"],
    "schedule":'Domicilios a diario de 9:00AM a 5:00PM',
    "cellphones":["tel:+50241288133"],
    "otherApps":['hugo, glovo y ubereats'],
    "payments": 'Pagos en efectivo y tarjeta'
  };
  // let service= ['Ciudad de Guatemala','Sacatepéquez', 'Chimaltenango', 'Escuintla', 'Jalapa', 'Quetzaltenango', 'San Marcos', 'Izabal', 'Petén','El Progreso', 'Chiquimula', 'Quiché', 'Suchitepequez','Santa Rosa', 'Alta y Baja Verapaz','Retalhuleu', 'Totonicapán', 'Sololá']
  let service= ['Demostración Grupo Pinulito','Ciudad de Guatemala','Mixco','Ciudad periferia']

  const department ={
    "Demostración Grupo Pinulito":[["Mensaje para Boris H.","30056537"]],
    "Mixco" : [["Santa Rita","30128315"],["Zona 2 de Mixco y alrededores","30240520"],["Florida","59091831"],["villas del Milagro","57624766"]],
    "Ciudad de Guatemala" : [["Zona Central","59091831"],["La Cabaña","40059778"],["Zona 17 hasta Llano Largo","40059778"],["Zona 16","40059778"],["Colonia Atlántida Zona 18","40059778"],["La Barreda San Rafael","40059778"]],
    "Ciudad periferia" : [["Jocotales","40729543"],["Zona 21","40323350"],["San Pedro Ayampuc", "32581424"]]
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [dep, setDep] = useState("");
  const [shop, setShop] = useState("");
  const [hide,setHide]=useState(false);


  
return (
  <div>
        <img src={restDetails["srcImage"]} />
        {!hide &&
        (<>
        <p>
          <FontAwesomeIcon icon={faClock} /> {' '} {restDetails["schedule"]}
        </p>
        <p>
          <FontAwesomeIcon icon={faShoppingBasket}/>{' También en '} {restDetails["otherApps"].map((zones)=> zones)}
        </p>
        <h6>
          <FontAwesomeIcon icon={faHandshake} />{' '} {restDetails["payments"]} {' '} <b>mínimo Qtz. 40</b>
        </h6>
        </>)|| null }
        {/* <p> 
        <FontAwesomeIcon icon={faCamera}/> {'  '}
          Facebook {'  '}
          <a href={restDetails["instaURL"]}>{restDetails["atrestaurant"]}</a>
        </p> */}
        <p></p>

        <Dropdown open={modalOpen} toggle={()=>setModalOpen(!modalOpen)} className="drop-down">
            <DropdownToggle className ="button" split><b>Departamentos</b></DropdownToggle>
              <DropdownMenu >
              {service.map((zones)=>
                <DropdownItem 
                  onClick={()=>{
                      setDep(zones);
                      props.setStoreDep(zones);
                      setHide(true);
                    }} >
                  <FontAwesomeIcon icon={faMapPin}/> {' '} {zones}
                </DropdownItem>
              )}
            </DropdownMenu>
        </Dropdown>
    
        {dep!=="" &&(
          <>
          <Dropdown direction="down" open={modalOpen1} toggle={()=>setModalOpen1(!modalOpen1)} className="drop-down">
          <DropdownToggle className="dir" split><b>Locales</b></DropdownToggle>
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
          <FontAwesomeIcon icon={faMapMarker}/> Pedir Pinulito en {' '} <b>{dep}</b>
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