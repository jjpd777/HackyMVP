import React, { useState } from 'react';
import './ItemCard.scss';
import { Button } from 'shards-react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
} from 'shards-react';
import { CartItem } from '../../App';
import { MenuItem } from '../../containers/Menu/Menu';

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

  return (
    <div className="card-container">
      <Card className="card">
        <CardBody className="card-body">
          {menuItem.image !=="" && (<img width="150" src={menuItem.image}/>)}
          <div className="card-content">
            <CardTitle>{menuItem.name}</CardTitle>
            <CardSubtitle>{menuItem.brief}</CardSubtitle>
            <p>{menuItem.description}</p>
          </div>
          <div className="card-price">Qtz.{menuItem.price}</div>
        </CardBody>
      </Card>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        className="button"
        theme="secondary"
      >
        Añadir a la orden: (
        {cart.find((x) => x.itemId === menuItem.id)?.quantity || 0})
      </Button>

      <Modal
        open={modalOpen}
        toggle={() => {
          setModalOpen(!modalOpen);
        }}
        centered={true}
      >
        <ModalHeader>{menuItem.name}</ModalHeader>
        <ModalBody className="modal-body">
          <div className="item-image">
            <img src={menuItem.image} width="200" />
          </div>

          <div className="item-description">{menuItem.description}</div>
          <div className="item-price">Qtz. {menuItem.price}</div>
          <div className="add-cart">
            <InputGroup className="plus-minus">
              <InputGroupAddon type="prepend">
                <Button
                  onClick={() => {
                    removeOneFromCart();
                  }}
                  theme="secondary"
                >
                  - 
                </Button>
              </InputGroupAddon>
              <FormInput
                type="number"
                value={
                  cart.find((x) => x.itemId === menuItem.id)?.quantity || 0
                }
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <InputGroupAddon type="append">
                <Button
                  onClick={() => {
                    addOneToCart();
                  }}
                  theme="secondary"
                >
                  +
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <br></br>
            <Button pill theme="success" onClick={()=>setModalOpen(!modalOpen)}>
                Seguir comprando
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ItemCard;
