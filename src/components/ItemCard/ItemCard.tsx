import React, { useState } from 'react';
import './ItemCard.scss';
import { Button } from 'shards-react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'shards-react';
import { CartItem } from '../../App';
import { MenuItem } from '../../containers/Menu/Menu';


import {
  faCheckCircle,
  faTimesCircle,
  faCheck,
  faTimes,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ItemCardProps {
  menuItem: MenuItem;
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function ItemCard(props: ItemCardProps) {
  const { menuItem, cart, setCartItems } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const checkIfTrue = ()=>cart.find((x) => x.itemId === menuItem.id) ? <FontAwesomeIcon icon={faCheck}/> : "";
  const addOneToCart = () => {
    if (cart.find((x) => x.itemId === menuItem.id)) {
      console.log("lets'go")
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
            <CardTitle>{menuItem.name}</CardTitle>
            <CardSubtitle>{menuItem.brief}</CardSubtitle>
          </div>
          <div className="card-price">
            {checkIfTrue()}
          </div>
        </CardBody>
      </Card>
      {/* <Button className="decrease" theme="danger" onClick={() => removeOneFromCart()}> <b><FontAwesomeIcon icon={faTimesCircle}/></b> </Button>
      <Button className="increase" theme="success" onClick={() => addOneToCart()}> <FontAwesomeIcon icon={faCheckCircle}/> </Button> */}
      <Button className="decrease" theme="danger" onClick={() => removeOneFromCart()}> <FontAwesomeIcon icon={faCircle}/></Button>
      <Button className="increase" theme="success" onClick={() => addOneToCart()}><FontAwesomeIcon icon={faCircle}/> </Button>
    </div>
  );
}

export default ItemCard;
