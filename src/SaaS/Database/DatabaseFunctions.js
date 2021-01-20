import { useFirebaseApp } from 'reactfire';

// COOL!

const ROOT = "LISTOSOFTWARE-DEV"
const INVENTORY_URL = ROOT + "/inventory/";
const SALES_URL = ROOT + "/transacions/";


export const newMHDMY = () => {
  var today = new Date();
  var min = String(today.getMinutes()).padStart(2, '0');
  var hr = String(today.getHours()).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return hr + ":" + min + "&" + dd + '-' + mm + '-' + yyyy;
};

const directoryPathGenerator = ()=>{
    const date = newMHDMY().split("&")[1]
    const path = date.split("-").join("/");
    return path;

}

export const InventoryDB = ()=>{
    const database = useFirebaseApp().database();

    const insertInventory = (data)=>{
        const ref = database.ref(INVENTORY_URL).push();
        data["id"] = ref.key;
        return ref.set(data);
    };
    const readInventory = ()=>{
        const ref = database.ref(INVENTORY_URL);
        return ref;
    };
    const updateInventory = (data, id)=>{
        const target = INVENTORY_URL + id;
        return database.ref(target).update(data);
    };

    return {insertInventory, readInventory, updateInventory}
}

export const TransactionRecordDB = ()=>{
    const database = useFirebaseApp().database();

    const destination = SALES_URL + directoryPathGenerator();

    const createTransaction = (data)=>{
        const ref = database.ref(destination).push();
        data["insertionID"] = ref.key;
        return ref.set(data);
    }

    return {createTransaction}
}


export const CRUD_HELPER = ()=>{
    const database = useFirebaseApp().database();
    const target = INVENTORY_URL;

    const create = (data)=>{
        const ref = database.ref(target).push();
        data["insertionID"] = ref.key;
        return ref.set(data);
    };
    const read = (id)=>{
        const ref = database.ref(INVENTORY_URL+id);
        return ref;
    };
    const update = (data, id)=>{
        const target = INVENTORY_URL + id;
        return database.ref(target).update(data);
    };
    const delet = (id)=>{
        const target = INVENTORY_URL+ id;
        return database.ref(target).remove();
    };

    return {create, read, update, delet}
}


