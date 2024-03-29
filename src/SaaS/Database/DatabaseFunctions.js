import { useFirebaseApp } from 'reactfire';

// COOL!
const STORENAME = "GERONA"
const ROOT = "LISTOSOFTWARE-DEV"

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


