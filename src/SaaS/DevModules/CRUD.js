import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button,
  } from 'shards-react';


import {CRUD_HELPER} from '../Database/DatabaseFunctions';
import {keyMaper} from './HelperCRUD';



function CRUD (){
    const [ product, setProduct] = useState("");
    const [elements, setElements] = useState();
    const {create, read, update, delet} = CRUD_HELPER();
    const objects = read();

    useEffect(()=>{
        const ref = read();
        const valRef = ref.on('value', (snapshot) => {
            const data = keyMaper(snapshot.val());
            setElements(data);
          });
        return ()=> valRef.off('value', valRef)
    },[]);

    console.log(elements, "objectivo")

    const testCreate = ()=>{
        const insertJson = {
            example: "126",
            "other" : 14,
            "jum":0
        }
        create(insertJson)
    }
    return(
        <div className="crud-container">
            <FormInput
                type="number"
                value={"solid"}
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              />
              <Button onClick={testCreate}></Button>
        </div>
    )
}

export default CRUD;
