import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button,
  } from 'shards-react';


import {CRUD_HELPER} from '../Database/DatabaseFunctions';
import {keyMaper} from '../HelperFunctions/BasicHelpers';
import CardInventory from './CardInventory';
import {InventoryDB} from '../Database/DatabaseFunctions';
import './Inventory.scss';

function Inventory(){
    const [category, setCategory] = useState("");
    const [name, setName ] = useState("");
    const [price, setPrice] = useState(0);
    const [inventory, setInventory] = useState([]);
    const [currentCat, setCurrentCat] = useState("")
    const [editID, setEditID] = useState("");

    const inputElements =  [category, name, price];
    const inputFunctions = [setCategory, setName, setPrice];
    const inputDescription = ["Categoría:", "Nombre de producto:", "Precio en Qtz."];

    const [nextInsertFlag, setNextInsertFlag ]= useState(false);
    const [insertMode, setInsertMode] = useState(true); 
    const CURRENT_CATEGORY = insertMode ? "Insertar inventario" : "Editar inventario";

    const {readInventory, insertInventory, updateInventory} = InventoryDB();

    useEffect(()=>{
        const ref = readInventory();
        const valRef = ref.on('value', (x) => {
            const snapVal = x.val();
            if(!snapVal)return;
            const data = keyMaper(snapVal);
            setInventory(data);
          });
        return ()=> valRef.off('value', valRef)
    },[]);

   
    const inputElementsEmpty = inputElements.find((x)=> x==="");
    const checkEmptyStrings = ()=>{
        inputElements.forEach((x)=>{
            if(x==="") return true;
        })
        return false;
    }

    const createEntry = ()=>{
        if((checkEmptyStrings)) return;
        const x = {
            id:'',
            category: category,
            name: name,
            description: '',
            price: price,
            brief:'',
            image:'',
        }
        insertInventory(x);
        setNextInsertFlag(true);
        inputFunctions.map((f)=>f(""));
    }

    const getCat = ()=>{
        var rsp = [];
        inventory.map((x)=>{
            if(!(rsp.find((t)=> x.category === t))) rsp.push(x.category);
        })
        return rsp;
    };

    const cancelEdit = ()=>{
        inputFunctions.map((f)=>f(""));
        setEditID("");

    };
    const updateItem = ()=>{
        if(inputElementsEmpty) return;
        const x = {
            category: category,
            name: name,
            price: price
        }
        updateInventory(x, editID);
        inputFunctions.map((f)=>f(""));
        setEditID("");
    }   

    return(
        <>
        <div className="inventory-mini-header">
            <Button className="switch-insert-edit"onClick={()=> setInsertMode(!insertMode)}> {CURRENT_CATEGORY} </Button>
        </div>
        {insertMode && <div className="insert-inventory">
            {!nextInsertFlag &&<div className="inserting-mode">
                {inputElements.map((val, ix)=>
                <>
                 <FormInput
                    className="input"
                    placeholder= {inputDescription[ix]}
                    value={val}
                    onChange={(e) => {
                    inputFunctions[ix](e.target.value);
                    }}
                />
                </>)}
                <Button onClick={()=>createEntry()} className="insert-btn">
                    Insertar
                </Button>
            </div>}
            {nextInsertFlag && <div className="next-step">
                <h3>Insertado exitosamente!</h3>
                <Button onClick={()=>setNextInsertFlag(false)}> Insertar otro insumo</Button>
            </div>}
        </div>}
       {!insertMode && 
       <div className="edit-inventory">
                {getCat().map((x)=><Button className="categories" onClick={()=>setCurrentCat(x)}>{x}</Button>)}
                {!!inventory && editID==="" && inventory.map((x)=>x.category ===currentCat && <><CardInventory itemInfo={x} editHelper={setEditID} fullHelpers = {inputFunctions}/></>)}
        
        <div className="edition-is-on">
        { editID!=="" && 
        inputElements.map((val, ix)=>
                <>
                 <FormInput
                    className="input"
                    placeholder= {inputDescription[ix]}
                    value={val}
                    onChange={(e) => {
                    inputFunctions[ix](e.target.value);
                    }}
                />
                </>)}
                {editID!=="" && 
                <>
                <Button className="action-no" onClick={()=>cancelEdit()}> Cancelar</Button> <Button className="action-yes" onClick={()=>updateItem()}>Confirmar</Button>
                </>}
        </div>
        </div>}

        </>
    )
}
export default Inventory;