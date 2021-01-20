import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button,
  } from 'shards-react';


import {CRUD_HELPER} from '../Database/DatabaseFunctions';
import {keyMaper} from './HelperCRUD';
import './CRUD.scss'



function CRUD (){
    const [ product, setProduct] = useState("");
    const [elements, setElements] = useState([]);
    const {create, read, update, delet} = CRUD_HELPER();

    useEffect(()=>{
        const ref = read("");
        const valRef = ref.on('value', (x) => {
            const snapVal = x.val();
            if(!snapVal)return;

            const data = keyMaper(snapVal);
            setElements(data);
          });
        return ()=> valRef.off('value', valRef)
    },[]);

    const testCreate = ()=>{
        const insertJson = {
            example: "126",
            "other" : 14,
            "jum":0
        }
        create(insertJson)
    };

    const testUpdate = ()=>{
        const sampleID = elements[0].insertionID;
        if(!sampleID) return;
        update({"jum": 100}, sampleID)
    };


    const testDelete = ()=>{
        const sampleID = elements[0].insertionID;
        if(!sampleID) return;
        delet(sampleID)
    };

   
  

    return(
        <div className="crud-container">
            <Button className="btn" onClick={testCreate} > Test Create</Button>
            <Button className="btn" onClick={testDelete}> Test Delete</Button>
            <Button className="btn" onClick={testUpdate}> Test Update</Button>
        </div>
    )
}

export default CRUD;
