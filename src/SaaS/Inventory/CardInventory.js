import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button, Card, CardBody, 
    CardTitle, CardSubtitle
  } from 'shards-react';

import {CRUD_HELPER} from '../Database/DatabaseFunctions';
import {InventoryDB} from '../Database/DatabaseFunctions'
import './CardInventory.scss'


function CardInventory (props){
    const {itemInfo, editHelper, fullHelpers} = props;
    const category = itemInfo.category;
    const name = itemInfo.name;
    const price = itemInfo.price;
    const insertionID = itemInfo.id;
    const inputValues = [category, name, price];
    const [isEditing, setIsEditing] = useState(false);

    const {deleteInventory} = InventoryDB();
    const setCardToBeEdited = ()=>{
        setIsEditing(!isEditing)
        fullHelpers.map((f,ix)=> f(inputValues[ix]))
        editHelper(insertionID);
    };
    const deleteItem = ()=>{
        console.log(insertionID)
        deleteInventory(insertionID);
    }

    return(
        <>
        <div className="edit-inv-card" onClick={()=> setCardToBeEdited() }>
            <Card className="edit-card">
                <CardTitle className="card-title">
                <h5>{name}</h5>
                </CardTitle>
                <CardBody className="card-price">
                <h5>Qtz.{price}</h5>
                </CardBody>
            </Card>
        </div>
        </>
    )
}

export default CardInventory;