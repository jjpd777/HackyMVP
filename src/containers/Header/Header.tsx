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
  displayMenu: () => void;
  setStorePhone: (String) => void;
  setStoreDep: (String) => void;
  setSiteTab: (String) => void;
  isDisplaying: boolean;
}
function Header(props: HeaderProps) {
  let { isDisplaying } = props;

  const PROMOCIONES ="Cerdo";
  const PREMIUM = "Cortes de res"
  const restDetails =
  {
    "id": 1,
    "srcImage": "https://scontent-mia3-1.cdninstagram.com/v/t51.2885-19/11820542_1487951388164636_539112163_a.jpg?_nc_ht=scontent-mia3-1.cdninstagram.com&_nc_ohc=qT2EJ1JYRIwAX8p2-qv&oh=da9e99339ddac8d4af0707d44c5afbb4&oe=5FBF0300",
    "atrestaurant": ' @corchosgt',
    "instaURL": 'https://www.instagram.com/corchosgt/',
    "tagline": 'Vinos premium importados',
    "serviceZones": ["Mixco", "Ciudad de Guatemala"],
    "schedule": 'Domicilios a diario de 9:00AM a 5:00PM',
    "cellphones": ["tel:+50241288133"],
    "otherApps": ['Ventas al por mayor y por menor'],
    "payments": 'Pagos solo en efectivo'
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [activeButton, setActive] = useState(true)


  return (
    <div>
      <h6>
        <b>Cortes legendarios, sabor auténtico</b>
      </h6>
      <p>
        <FontAwesomeIcon icon={faClock} /> {' '} {restDetails["schedule"]}
      </p>
      <p>
        <FontAwesomeIcon icon={faShoppingBasket} /> {restDetails["otherApps"].map((zones) => zones)}
      </p>
      <div className="mini-nav">
        <Button className="one"
          outline theme="danger"
          active={activeButton}
          onClick={() => {
            props.setSiteTab(PROMOCIONES);
            setActive(true);
          }
          }>
          {PROMOCIONES}
        </Button>
        <Button className="two"
          outline theme="danger"
          active={!activeButton}
          onClick={() => {
            props.setSiteTab(PREMIUM)
            setActive(false);

          }
          }>
          Cortes de Res
        </Button>
      </div>
    </div>
  );

}

export default Header;