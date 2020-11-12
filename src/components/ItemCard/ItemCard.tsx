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
  faTimes,
  faCheck,
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
  const [cancel, setCancel] = useState(false);

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
  const cancelSale = (saleItem)=> {
    const dataUpdate = {"valid":false};
    DBservice.update(saleItem.id, dataUpdate).then(()=>console.log(saleItem.id))
    
  }

  return (
    <div className="card-container">
      <table onClick={() => setModalOpen(true)} className="table">
        <td className="tableu">
          {menuItem.date.split(" ")[0]}{':  Qtz.'}<b>{String(menuItem.total)}</b>
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
          <div className="item-price">Total de venta:{'  '}{menuItem.total}</div>
          <br></br>
          <p><b> Nombre cliente:</b> {menuItem.name}</p>
          <p><b>Método de pago:</b> {menuItem.payment}</p>
          <p><b>Información de factura:{'  '}</b>{menuItem.taxInfo} </p>
          <p><b>Status de venta:</b>{menuItem.valid ? "Activo" : "Cancelado"}</p>
          <div className="add-cart">
          <p><b>Producto vendido:</b></p>
          {menuItem.pedido.map((val)=> 
          <>
           <p>{<FontAwesomeIcon icon={faCheckCircle}/>}{' '}{val.name}{' '}<b>{val.quantity}</b>  </p>
          </>
          )
          }
          
          <br></br>
          { !cancel ? (
          <button 
            onClick={() => {
              // setModalOpen(!modalOpen);
              setCancel(true);
            }
            }>
              {'  '}Cancelar venta{'  '}
            </button>):(
              <>        
              <h5>Cancelar venta?</h5>    
            <Button pill inline className="save" theme="danger" onClick={() => {
              setModalOpen(!modalOpen);
            }}> no</Button>
            <Button pill inline className="save" theme="success" onClick={() => {
              setModalOpen(!modalOpen); cancelSale(menuItem);
            }}>si</Button>
            </>)
          }
            {!cancel && <Button pill inline className="save-btn" theme="success" onClick={() => {
              setModalOpen(!modalOpen);
            }}>
              {'  '}<FontAwesomeIcon icon={faCheckCircle} />{'  '}
            </Button>}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ItemCard;
