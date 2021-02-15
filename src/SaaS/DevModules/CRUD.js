import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button,
  } from 'shards-react';


import {CRUD_HELPER} from '../Database/DatabaseFunctions';
import {keyMaper} from './HelperCRUD';
import './CRUD.scss';

import {CreateCabinGuest, newMHDMY, RegisterPurchase } from '../Database/DatabaseFunctions'



function CRUD (){
    const {insertCabinGuest, readCabinGuests, setMasterCabin} = CreateCabinGuest();
    const {insertPurchase} = RegisterPurchase();
    const [elements, setElements] = useState([]);

    useEffect(()=>{
        const ref = readCabinGuests();
        const valRef = ref.on('value', (x) => {
            const snapVal = x.val();
            if(!snapVal)return;
            const data = keyMaper(snapVal);
            setElements(data);
          });
        return ()=> ref.off('value', valRef)
    },[]);





   const testCabinGuest = ()=>{
       const cabinNumber = 'cabin-1';
       var x = {
           "name": "Maria",
           "status" : true,
           "timestamp" : newMHDMY()
       };
       const k = insertCabinGuest(x, cabinNumber);
       x['insertionID'] = k; setMasterCabin(x, cabinNumber);
   }
   const seedCabins = ()=>{
    for(var i=1; i<16; i++){
        const cabinNumber = "cabin-"+String(i).padStart(2,0);
        var x = {
            "cabin" : cabinNumber,
            "name": "Maria",
            "status" : true,
            "timestamp" : newMHDMY()
        };
        const k = insertCabinGuest(x, cabinNumber);
        x['insertionID'] = k; setMasterCabin(x, cabinNumber);
     }
   }

   const testInsertPurchase = ()=>{
       const cabin = "cabin-01"
       const id = "-MTZadVTgqAxmoQgrWtf";
       const data = {
           status: true,
           timestamp: newMHDMY(),
           total: 500.00,
           order: [
               {"name":"pescado frito", "price": 50, "quantity":2}, 
               {"name" : "arroz caribenño", "price" : 75, "quantity":1}]
        }
       insertPurchase(cabin, id, data);
   }


    return(
        <div className="crud-container">
       
            {/* <Button className="btn" onClick={testGuest}> Test Update</Button> */}
            <Button className="btn" onClick={seedCabins}> Test Cabin</Button>
            <Button className="btn" onClick={testInsertPurchase}> Test Cabin</Button>

        </div>
    )
}

export default CRUD;
