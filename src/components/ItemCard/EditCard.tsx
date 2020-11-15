import React, { useState } from 'react';
import './EditCard.scss';
import { Button } from 'shards-react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'shards-react';

import {
  faArrowAltCircleLeft,
  faCheckCircle,
  faShoppingBasket,
  faCircle,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../App';
import { MenuItem } from '../../containers/Menu/Menu';
import DBservice from '../../services/DBservice'

interface PoSCardProps {
  menuItem: MenuItem;
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function EditCard(props: PoSCardProps) {
  const { menuItem, cart, setCartItems } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState();

 
  const addOneToCart = () => {
    if (cart.find((x) => x.itemId === menuItem.id)) {
      // Already exists in the cart, so just plus one
      const newArray = cart.filter((c) => c.itemId !== menuItem.id);
      newArray.push({
        itemId: menuItem.id,
        quantity: cart.find((x) => x.itemId === menuItem.id)!.quantity + 1,
      });

      setCartItems(newArray);
    } else {
      setCartItems([
        ...cart,
        ...[{ itemId: menuItem.id, quantity: 1 } as CartItem],
      ]);
    }
  };

  const removeOneFromCart = () => {
    if (
      cart.find(
        (x) =>
          x.itemId === menuItem.id &&
          cart.find((x) => x.itemId === menuItem.id)!.quantity > 0
      )
    ) {
      const newArray = cart.filter((c) => c.itemId !== menuItem.id);
      if (cart.find((x) => x.itemId === menuItem.id)!.quantity > 1) {
        newArray.push({
          itemId: menuItem.id,
          quantity: cart.find((x) => x.itemId === menuItem.id)!.quantity - 1,
        });
      }
      setCartItems(newArray);
    }
  };

  return (
    <div className="card-container">
      <Card className="card">
        <CardBody className="card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardTitle className="title">{menuItem.name}</CardTitle>
            <CardSubtitle>Precio de venta: {' '}{menuItem.price}</CardSubtitle>
          </div>
          <div className="card-price">
    {cart.find((x) => x.itemId === menuItem.id) && <FontAwesomeIcon icon={faShoppingBasket}/>}
    {'  '}
    {menuItem.quantityavailable} 
    {/* {cart.find((x) => x.itemId === menuItem.id) ?.quantity || ""} */}
          </div>
        </CardBody>
      </Card>
      {/* <Button className="decrease" theme="danger" onClick={() => removeOneFromCart()}> <FontAwesomeIcon icon={faCircle}/> </Button>
      <Button className="increase" theme="success" onClick={() => addOneToCart()}> <FontAwesomeIcon icon={faCircle}/> </Button> */}
    </div>
  );
}

export default EditCard;
