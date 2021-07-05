import { useFirebaseApp } from 'reactfire';

// COOL!
const STORENAME = "GERONA"
const ROOT = "LISTOSOFTWARE"

const GENERAL_DEMO = ROOT + "/record/"

const INVENTORY_URL = ROOT + "/inventory/";
const DAILYORDERS =  ROOT + "/orders-factory";




export const newMHDMY = () => {
  var today = new Date();
  var min = String(today.getMinutes()).padStart(2, '0');
  var hr = String(today.getHours()).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return hr + ":" + min + "&" + dd + '-' + mm + '-' + yyyy;
}

export const PoS_DB =() =>{
    const database = useFirebaseApp().database();

    const readSales = (Q)=>{
        const x = "BORGONA/"+Q+"/sales/"
        return database.ref(x);
    };
    const readDayofSales = (S, D)=>{
        const x = "BORGONA/"+S+"/sales/"+D;
        console.log("PATH",x)
        return database.ref(x);
    }
    const updateSaleDynamically = (shop, key, data) => {
        // const timestamp = newMHDMY().split('&')[1];
        const timestamp = "04-07-2021";
        const db = database.ref(ROOT+"/"+shop + "/sales/"+ timestamp);
        console.log(db, "BRJ")
        return db.child(key).update(data);
      };
    return {readSales, readDayofSales, updateSaleDynamically}
};

export const CashRegisterDB = ()=>{
    const database = useFirebaseApp().database();
    const readOpenCloseDay = (S, D)=>{
        const x = "BORGONA/"+S+"/open-close/"+D;
        return database.ref(x)

    }
    return {readOpenCloseDay}

}

export const CRUD_HELPER = ()=>{
    const database = useFirebaseApp().database();
    const target = INVENTORY_URL;

    const create = (data)=>{
        const ref = database.ref(target).push();
        data["insertionID"] = ref.key;
        return ref.set(data);
    };
    const read = ()=>{
        const ref = database.ref(INVENTORY_URL);
        return ref;
    };
    const update = (data)=>{
        const target = INVENTORY_URL;
        return database.ref(target).update(data);
    };
    const delet = (data)=>{
        const target = INVENTORY_URL;
        return database.ref(target).remove();
    };

    return {create, read, update, delet}
}


