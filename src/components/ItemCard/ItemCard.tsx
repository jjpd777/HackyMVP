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

import {
  faArrowAltCircleLeft,
  faCheckCircle,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../App';
import { MenuItem } from '../../containers/Menu/Menu';
import DBservice from '../../services/DBservice'

interface ItemCardProps {
  menuItem: any;
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function ItemCard(props: ItemCardProps) {
  const { menuItem, cart, setCartItems } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState();

  const addToDB = (id) => {
    const data = {
      quantityavailable: currentEdit,
    };

    DBservice.update(id, data)
      .then(() => {
        console.log("success")
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
      <table onClick={()=>setModalOpen(true)} className="table">
        <td className="tableu">
          {menuItem.name}{':  '}<b>{String(menuItem.name)}</b>
        </td>
      </table>

      <Modal
        open={modalOpen}
        toggle={() => {
          setModalOpen(!modalOpen);
          setCurrentEdit(menuItem.name);
        }}
        centered={true}
      >
        <ModalHeader>{menuItem.name}</ModalHeader>
        <ModalBody className="modal-body">
          {/* <div className="item-image">
            <img src={menuItem.image} width="200" />
          </div> */}
          <div className="item-price">Cantidad en tienda: {' '}{menuItem.name}</div>
          <div className="add-cart">
            <InputGroup className="plus-minus">
              <FormInput
                type="number"
                placeholder={menuItem.name}
                value={currentEdit}
                onChange={(e) => {
                  setCurrentEdit(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </InputGroup>
            <br></br>
            <Button pill inline className="cancel-btn" theme="danger" onClick={() => setModalOpen(modalOpen)}>
            {'  '}<FontAwesomeIcon icon={faTrash}/>{'  '}
            </Button>
            <Button pill inline className="save-btn" theme="success" onClick={() => {
              setModalOpen(!modalOpen);
              // addToDB(menuItem.id);
            }}>
              {'  '}<FontAwesomeIcon icon={faCheckCircle}/>{'  '}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ItemCard;
