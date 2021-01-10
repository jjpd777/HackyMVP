import React, { useState } from 'react';
import './EditCard.scss';
import { Button } from 'shards-react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'shards-react';

import { CartItem } from '../../App';
import { MenuItem } from '../../containers/Menu/Menu';
import DBservice, {InventoryDB} from '../../services/DBservice';

interface PoSCardProps {
  menuItem: MenuItem;
  cart: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any>>;
}

function EditCard(props: PoSCardProps) {
  const { menuItem, cart, setCartItems } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState();
  const {removeInventory} = InventoryDB();

  return (
    <div className="card-container">
      <div onClick={()=>{
          props.setCartItems(menuItem.id);
    }}>
      <Card className="cardy">
        <CardBody
         className="card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardTitle className="titley">{menuItem.name}</CardTitle>
          </div>
          <div className="edit-price">
            {'  '}
            {menuItem.price} 
    <p>Qtz</p>
          </div>
        </CardBody>
      </Card>
      </div>
      <Button className="decrease" theme="danger" onClick={() => removeInventory(menuItem.id)}> remove </Button>
      {/* <Button className="increase" theme="success" onClick={() => addOneToCart()}> <FontAwesomeIcon icon={faCircle}/> </Button> */}
    </div>
  );
}

export default EditCard;
