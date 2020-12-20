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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFlagCheckered, faCashRegister, faBalanceScale, faStoreAlt, faPencilAlt, faTimes, faShoppingCart, faTruck } from '@fortawesome/free-solid-svg-icons';


interface ItemCardProps {
  menuItem: MenuItem;
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function ItemCard(props: ItemCardProps) {
  const { menuItem, cart, setCartItems } = props;
  const [modalOpen, setModalOpen] = useState(false);

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

  const itemPresentFlag = cart.find((x) => x.itemId === menuItem.id);

  return (
    <>
    <div onClick={() => addOneToCart()} className="card-container">
      <Card  className="card">
        <CardBody className="card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardTitle className="card-title">{menuItem.name}</CardTitle>
            <CardSubtitle>{menuItem.brief}</CardSubtitle>
          </div>
          <div className="card-price">

        {cart.find((x) => x.itemId === menuItem.id) ?.quantity || ""}
          </div>
        </CardBody>
      </Card>
{/* <Button className="increase" theme="success" onClick={() => addOneToCart()}> + </Button> */}
      
    </div>
    {    itemPresentFlag && <Button className="decrease" theme="danger" onClick={() => removeOneFromCart()}> <FontAwesomeIcon icon={faTrash}/> </Button>}      
    </>
  );
}

export default ItemCard;
