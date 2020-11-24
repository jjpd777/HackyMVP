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
import DBservice from '../../services/DBservice';

interface PoSCardProps {
  menuItem: MenuItem;
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<any>>;
}

function EditCard(props: PoSCardProps) {
  const { menuItem, cart, setCartItems } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState();


  return (
    <div className="card-container">
      <div onClick={()=>{
          props.setCartItems(menuItem.id);
          console.log(menuItem.id)
    }}>
      <Card className="card">
        <CardBody
         className="card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardTitle className="title">{menuItem.name}</CardTitle>
          </div>
          <div className="card-price">
            <div className="subdiv">
            {'  '}
            {menuItem.price} 
          </div>
    <p>Qtz</p>
          </div>
        </CardBody>
      </Card>
      </div>
      {/* <Button className="decrease" theme="danger" onClick={() => DBservice.removeInventory(menuItem.id)}> remove </Button> */}
      {/* <Button className="increase" theme="success" onClick={() => addOneToCart()}> <FontAwesomeIcon icon={faCircle}/> </Button> */}
    </div>
  );
}

export default EditCard;
