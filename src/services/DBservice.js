import { useFirebaseApp, useUser } from 'reactfire';

// COOL!
const STORENAME = "GERONA"
const ROOT = "BORGONA"

const INVENTORY_URL = ROOT + "/inventory/";
const DAILYORDERS =  ROOT + "/orders-factory";


export const getStoreName = () => STORENAME;

export const newMHDMY = () => {
  var today = new Date();
  var min = String(today.getMinutes()).padStart(2, '0');
  var hr = String(today.getHours()).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return hr + ":" + min + "&" + dd + '-' + mm + '-' + yyyy;
}
export const DateforSection = () => {
  const DMY = newMHDMY().split("&")[1] + '/';
  return DMY;
};


export const InventoryDB = () => {
  const database = useFirebaseApp().database();

  const root4inventory = () => {
    return database.ref(INVENTORY_URL);
  };
  const root4previousInv = () => {
    const DESTINATION = DAILYORDERS + '/' + DateforSection();
    return database.ref(DESTINATION);
  };
  const insert2factory = (data)=>{
    const DESTINATION = DAILYORDERS + '/' + DateforSection();
    return database.ref(DESTINATION).push(data);
  };

  return {root4inventory, insert2factory, root4previousInv };
};

