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

    const inputElements =  [category, name];
    const inputFunctions = [setCategory, setName];
    const inputDescription = ["Categoría:", "Nombre de producto:", "Precio en Qtz."];

    const [nextInsertFlag, setNextInsertFlag ]= useState(false);
    const [insertMode, setInsertMode] = useState(true); 
    const CURRENT_CATEGORY = insertMode ? "Insertar inventario" : "Editar inventario";

    const {readInventory, insertInventory, updateInventory, deleteInventory} = InventoryDB();

    const sortAlphabetically = (x)=>{
        return x.sort((a,b)=> a.name.localeCompare(b.name))
    }

    useEffect(()=>{
        const ref = readInventory();
        const valRef = ref.on('value', function (x) {
            const snapVal = x.val();
            if(!snapVal) return;
            const data = keyMaper(snapVal);
            setInventory(sortAlphabetically(data));
          });
        return ()=> ref.off('value', valRef)
    },[]);

   
    const cleanString = (x)=>{
        const r = x.trim();
        return r.toLowerCase();
    }

    const createEntry = ()=>{
        if(name ==="" || price ===0 ||category==="") return;
        const x = {
            id:'',
            category: cleanString(category),
            name: cleanString(name),
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
        const x = {
            category: category,
            name: name,
            price: price
        }
        updateInventory(x, editID);
        inputFunctions.map((f)=>f(""));
        setEditID("");
    };

    const deleteItem = ()=>{
        deleteInventory(editID);
    }

    return(
        <>
        <div className="inventory-mini-header">
        <Button className="switch-insert-edit"onClick={()=> setInsertMode(true)}> {"Insertar"} </Button>
        <Button className="switch-insert-edit"onClick={()=> setInsertMode(false)}> {"Editar"} </Button>
        </div>
        {insertMode && <div className="insert-inventory">
            {!nextInsertFlag &&<div className="inserting-mode">
                {inputElements.map((val, ix)=>
                <>
                 <FormInput
                    className="input-first"
                    placeholder= {inputDescription[ix]}
                    value={val}
                    onChange={(e) => {
                    inputFunctions[ix](e.target.value);
                    }}
                />
                </>)}
                <div>
                <FormInput
                    className="input-first"
                    type="number"
                    // value={price}
                    placeholder={0}
                    onChange={(e) => {
                    setPrice(e.target.value);
                    }}
                />
                </div>
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
                <div>
                    <h3>- - Precaución - -</h3>
                <Button className="action-delete" onClick={deleteItem}> Eliminar</Button>
                </div>
                </>}
        </div>
        </div>}

        </>
    )
}
export default Inventory;