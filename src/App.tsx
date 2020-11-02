import React, { useEffect, useState } from 'react';
import './App.scss';
import Menu, { MenuItem } from './containers/Menu/Menu';
import { Button } from 'shards-react';
import Checkout from './containers/Checkout/Checkout';
import { menuItemsMock } from './menu';
import Header from './containers/Header/Header';
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
    getPosition();
    // Call API to load the menu
    setMenuItems(menuItemsMock);
  });

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
        ) < 3000 // This is in Meters
      ) {
        return true;
      }
    });

    setAvailableStores(availableStores);
  };

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
    <div className="App">
      <section className="container">
        <Modal
          open={availableStores.length === 0 && location}
          centered={true}
          toggle={() => {}}
        >
          <ModalHeader>No stores in your area</ModalHeader>
          <ModalBody className="modal-body">
            Sorry, but there are no stores available in your area.
          </ModalBody>
        </Modal>

        <Modal open={locationError} centered={true} toggle={() => {}}>
          <ModalHeader>Location Error</ModalHeader>
          <ModalBody className="modal-body">
            There was an error accessing your location. Please allow your
            browser to access the location.
          </ModalBody>
        </Modal>
        {currentPage === PageEnum.MENU && (
          <>
            <header className="App-header">
              <Header stores={availableStores} />
            </header>
            <Menu
              menuItems={menuItems}
              cart={cart}
              setCartItems={setCartItems}
            ></Menu>
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
          ></Checkout>
        )}
      </section>
      <br />
      <br></br>
      <br></br>
      {(cart.length && currentPage === PageEnum.MENU && (
        <div className="fixed-checkout">
          <Button
            onClick={() => {
              setCurrentPage(PageEnum.CHECKOUT);
            }}
            className="checkout-button"
            block
          >
            Ver el pedido! - Qtz.{getTotalCartValue()}
          </Button>
        </div>
      )) ||
        null}
    </div>
  );
}

export default App;
