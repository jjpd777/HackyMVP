import React, { useState } from 'react';
import './PoSCard.scss';
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

interface PoSCardProps {
  menuItem: MenuItem;
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function PoSCard(props: PoSCardProps) {
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
    <>
    <div onClick={()=>addOneToCart()}className="card-container">
      <Card className="card-pos">
        <CardBody className="card-body-pos">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardTitle className="title">{menuItem.name}</CardTitle>
            {/* <CardSubtitle className="sub-title">{'Qtz. '}{menuItem.price}</CardSubtitle> */}
            <div className="tmp">
            <h5>{'Qtz. '}{menuItem.price}</h5>
            </div>
          </div>
          <div className="card-price-pos">
        {cart.find((x) => x.itemId === menuItem.id) ?.quantity || ""}
        </div>

        </CardBody>
      </Card>
      {/* <Button className="increase" theme="success" onClick={() => addOneToCart()}> <FontAwesomeIcon icon={faCircle}/> </Button> */}
    </div>
   {cart.find((x) => x.itemId === menuItem.id) && <Button className="decrease" theme="danger" onClick={() => removeOneFromCart()}> <FontAwesomeIcon icon={faCircle}/> </Button>}
</>
  );
}

export default PoSCard;
