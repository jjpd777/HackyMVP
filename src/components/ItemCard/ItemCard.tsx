import React, { useState } from 'react';
import './ItemCard.scss';
import { Button } from 'shards-react';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'shards-react';

import {
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../App';
import { MenuItem } from '../../containers/Menu/Menu';
import DBservice from '../../services/DBservice'
import { validate } from '@babel/types';

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

  const getStatusText = () => menuItem.valid ? "Valida" : "Cancelada"
  const cancelSale = (saleItem) => {
    const dataUpdate = { "valid": false };
    DBservice.update(saleItem.id, dataUpdate)
      .then(() => console.log(saleItem.id))

  }

  return (
    <div className="card-container">
      <table onClick={() => setModalOpen(true)} className="table">
        <td className="tableu">
          {getStatusText()}{':  Qtz.'}<b>{String(menuItem.total)}</b>
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
          <div className="item-price">Total Qtz.{'  '}{menuItem.total}</div>
          <h5 className={menuItem.valid ? "active" : "canceled"}><b>Status:</b>{getStatusText()}</h5>
          <br></br>
          {!cancel && menuItem.valid &&
            <Button className="cancel-it"
              onClick={() => {
                // setModalOpen(!modalOpen);
                setCancel(true);
              }
              }>
              {'  '}Cancelar venta{'  '}
            </Button>}
          <p><b> Nombre cliente:</b> {menuItem.name}</p>
          <p><b>Método de pago:</b> {menuItem.payment}</p>
          <p><b>Información de factura:{'  '}</b>{menuItem.taxInfo} </p>
          <div className="add-cart">
            <p><b>Producto vendido:</b></p>
            {menuItem.pedido.map((val) =>
              <>
                <p className="items-list">{<FontAwesomeIcon icon={faCheckCircle} />}{' '}{val.name}{' '}<b>{val.quantity}</b>  </p>
              </>
            )
            }

            <br></br>
            {
              menuItem.valid && cancel &&
              <>
                <h5>Cancelar venta?</h5>
                <Button pill inline className="save" theme="danger" onClick={() => {
                  setCancel(false);
                }}> no</Button>
                <Button pill inline className="save" theme="success" onClick={() => {
                  setModalOpen(!modalOpen); cancelSale(menuItem); setCancel(true)
                }}>si</Button>
              </>}
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
