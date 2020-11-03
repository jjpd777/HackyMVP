import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './menu';
import Header from './containers/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart,faBroom, faQuidditch, faFireAlt, faFire,faFighterJet,
faCamera,
} from '@fortawesome/free-solid-svg-icons';

import { Modal, ModalBody, ModalHeader } from 'shards-react';
import { stores } from './stores';
import { getDistance } from 'geolib';

export interface CartItem {
  itemId: number;
  quantity: number;
}
export enum PageEnum {
  MENU,
  CHECKOUT,
}
export interface Location {
  latitude: number;
  longitude: number;
}


function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<PageEnum>(PageEnum.MENU);
  const [seeMenu, setSeeMenu]=useState(false);
  const [storePhone,setStorePhone]=useState("");
  const [storeDep, setStoreDep]= useState("");

  //########
  const [location, setLocation] = useState<Location>();
  const [locationError, setLocationError] = useState(false);
  const [availableStores, setAvailableStores] = useState<any[]>([]);

  const getPosition = async () => {
    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationError(false);
      },

      (err) => {
        console.log('ERROR', err);
        setLocationError(true);
      }
    );
  };

  useEffect(() => {
    // Call API to load the menu
    getPosition();
    setMenuItems(menuItemsMock);
  }, [availableStores]);

  useEffect(() => {
    getAvailableStores();
  }, [location]);

  const getAvailableStores = () => {
    const availableStores = stores.filter((store) => {
      if (
        location &&
        getDistance(
          { latitude: location?.latitude, longitude: location?.longitude },
          { latitude: store.lat, longitude: store.lng }
        ) < 10000 // This is in Meters;
      ) {
        console.log(store.name)
        console.log(getDistance(
          { latitude: location?.latitude, longitude: location?.longitude },
          { latitude: store.lat, longitude: store.lng }
        ) )
        return true;
      }
    });
    console.log(availableStores);
    setAvailableStores(availableStores);
  };

  
  //########

  // let seeMenu=false;

  const displayMenu =()=> setSeeMenu(true);

  const getTotalCartValue = () => {
    let totalVal = 0;
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          totalVal += cartItem.quantity * menuItem.price;
        }
      });
    });
    return totalVal;
  };

  return (
    <>
    <div className="App">
      <section className="container">
      <Modal
          open={availableStores.length === 0 && location}
          centered={true}
          toggle={() => {}}
        >
          <ModalHeader>No stores in your area</ModalHeader>
          <ModalBody className="modal-body">
          {availableStores.map((store)=><p>{store.name}</p>)}
          </ModalBody>
        </Modal>

        <Modal open={locationError} centered={true} toggle={() => {}}>
          <ModalHeader>Location Error</ModalHeader>
          <ModalBody className="modal-body">
            There was an error accessing your location. Please allow your
            browser to access the location.
          </ModalBody>
        </Modal>
        <header className="App-header">
            <Header displayMenu={displayMenu} isDisplaying={seeMenu} setStorePhone={setStorePhone} setStoreDep={setStoreDep}/>
          </header>
        {currentPage === PageEnum.MENU && (
          <>
          <div className="App-image">
          {!seeMenu&&(
            <img src="http://grupopinulito.com/wp-content/uploads/2019/09/Pinulito_espiritu_joven-300x300.jpg"></img>
          ) || null}   
          </div>
          {seeMenu && (<Menu
            menuItems={menuItems}
            cart={cart}
            setCartItems={setCartItems}
          ></Menu> ) || null}
          </>
        )}
        {currentPage === PageEnum.CHECKOUT && (
          <Checkout
            menuItems={menuItems}
            cart={cart}
            totalCartValue={getTotalCartValue()}
            onBack={() => {
              setCurrentPage(PageEnum.MENU);
            }}
            storePhone={storePhone}
            storeDep={storeDep}
          ></Checkout>
        )}
      </section>
      {(cart.length && currentPage === PageEnum.MENU && (
        <div className="fixed-checkout">
          <Button
            onClick={() => {
              setCurrentPage(PageEnum.CHECKOUT);
            }}
            className="checkout-button"
            block
          >
            Ver el pedido{'  '} <FontAwesomeIcon icon={faShoppingCart}/>{'  '} Qtz.{getTotalCartValue()}
          </Button>
        </div>
      )) ||
        null}
    </div>
    </>
  );
}

export default App;
