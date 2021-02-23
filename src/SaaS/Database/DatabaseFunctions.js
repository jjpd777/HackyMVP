import { useFirebaseApp } from 'reactfire';

// COOL!

const ROOT = "HONOLULU"
const INVENTORY_URL = ROOT + "/inventory/";
const SALES_URL = ROOT + "/transactions/";
const CABIN_RECORD = ROOT + "/cabin-record/";
const CABIN_MASTER = ROOT + "/cabin-master/";
const DAILY_RECORD = ROOT + "/daily-record/";


export const newMHDMY = () => {
  var today = new Date();
  var min = String(today.getMinutes()).padStart(2, '0');
  var hr = String(today.getHours()).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return hr + ":" + min + "&" + dd + '-' + mm + '-' + yyyy;
};

export const newMonthYear = ()=>{
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return mm + '-'+yyyy;
}



export const CreateCabinGuest = ()=>{
    const database = useFirebaseApp().database();

    const insertCabinGuest = (x, cabin)=>{
        const d = CABIN_RECORD+ cabin+ "/";
        const ref = database.ref(d).push();
        x['insertionID'] = ref.key; ref.set(x);
        return ref.key;
    };
    const readCabinGuests = (cabin)=>{
        const d = CABIN_MASTER;
        return database.ref(d);
    };
    const setMasterCabin = (x, cabin)=>{
        const d = CABIN_MASTER + cabin;
        return database.ref(d).set(x);
    }
    return {insertCabinGuest, readCabinGuests, setMasterCabin}
}

export const RegisterPurchase = ()=>{
    const database = useFirebaseApp().database();
    const insertPurchase = (cabin,k,data)=>{
        const d = CABIN_RECORD + cabin+"/"+k+"/consumption/"
        const ref = database.ref(d);
        const pushK = ref.push(data).key;
        return d+pushK;
    };
    return {insertPurchase};
}

export const DailyRecordDB = ()=>{
    const database = useFirebaseApp().database();
    const TODAY = newMHDMY().split('&')[1];
    const insert2Daily = (x)=>{
        const ref = database.ref(DAILY_RECORD+ TODAY);
        return ref.push(x);
    };
    const readFromDaily = ()=>{
        return database.ref(DAILY_RECORD+ TODAY);
    };
    const readOnce = (x)=>{
        return database.ref(x);
    }
    return {insert2Daily, readFromDaily, readOnce};


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
    const deleteInventory = (id)=>{
        const target = INVENTORY_URL + id;
        return database.ref(target).remove();

    }

    return {insertInventory, readInventory, updateInventory, deleteInventory}
}

export const TransactionRecordDB = ()=>{
    const database = useFirebaseApp().database();

    const destination = SALES_URL + newMHDMY().split("&")[1]+"/";

    const createTransaction = (data)=>{
        const ref = database.ref(destination).push();
        data["insertionID"] = ref.key;
        return ref.set(data);
    }
    const readTransactions = ()=>{
        return database.ref(SALES_URL)
    }
    const updateTransaction = (id, data)=>{
        const target = SALES_URL + id;
        return database.ref(target).update(data);
    }

    return {createTransaction, readTransactions, updateTransaction}
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


