import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button, Card, CardBody, 
    CardTitle, CardSubtitle
  } from 'shards-react';

import {CRUD_HELPER} from '../Database/DatabaseFunctions';

import './CardInventory.scss'


function CardInventory (props){
    const {itemInfo, editHelper, fullHelpers} = props;
    const category = itemInfo.category;
    const name = itemInfo.name;
    const price = itemInfo.price;
    const insertionID = itemInfo.insertionID;
    const inputValues = [category, name, price];
    const [isEditing, setIsEditing] = useState(false);
    const setCardToBeEdited = ()=>{
        setIsEditing(!isEditing)
        fullHelpers.map((f,ix)=> f(inputValues[ix]))
        editHelper(insertionID);
    };


    return(
        <>
        <div onClick={()=> setCardToBeEdited() }>
            <Card>
                <CardBody>
                <h5>{name}</h5>
                <h5>Qtz.{price}</h5>
                </CardBody>
            </Card>
        </div>

        </>
    )
}

export default CardInventory;