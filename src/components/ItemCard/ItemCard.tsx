import React, { useState, useEffect } from 'react';
import './ItemCard.scss';
import { Button } from 'shards-react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'shards-react';
import {
  faTrash} from '@fortawesome/free-solid-svg-icons';

import { CartItem } from '../../App';
import { MenuItem } from '../../containers/Menu/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ItemCardProps {
  menuItem: MenuItem;
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function ItemCard(props: ItemCardProps) {
  const { menuItem, cart, setCartItems } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentQ, setCurrentQ] = useState("");

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

  useEffect(()=>{
    if (
      cart.find(
        (x) =>
          x.itemId === menuItem.id &&
          cart.find((x) => x.itemId === menuItem.id)!.quantity > 0
      )
    ) setCurrentQ(String(cart.find((x) => x.itemId === menuItem.id)!.quantity));
    else setCurrentQ(""); 
  },[cart])



  return (
    <div>
    <div onClick={addOneToCart} className="card-container">
      <Card  className="card">
        <CardBody className="card-body">
          <div className="card-content">
            {/* <CardTitle>{menuItem.name}</CardTitle> */}
            <h3>{menuItem.name}</h3>
          </div>
          <div className="card-price">Qtz.{menuItem.price}</div>
        </CardBody>
        <div className="card-q"> {currentQ}</div>
      </Card>
    </div>
    {currentQ !=="" &&<Button  onClick={removeOneFromCart} className="remove" theme="danger"> <FontAwesomeIcon icon={faTrash} /></Button>}
    </div>
  );
}

export default ItemCard;
