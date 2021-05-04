import { useFirebaseApp, useUser } from 'reactfire';

// COOL!
const STORENAME = "GERONA"
const ROOT = "LISTOSOFTWARE"

const GENERAL_DEMO = ROOT + "/record/"

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

export const SeedMazatlan = ()=>{
  const database = useFirebaseApp().database();
  const seedingValue = (store)=>{
    return database.ref("/accounts/mazatlan-"+store).set({'admin_password': 'admin', 'login_code': '1234'})
  }
  const createRegistry = (store)=>{
    return database.ref("/stores/mazatlan-"+store).set({storeId: 'mazatlan'+store,
      storeInfo:{ 
        accountant_number: '32872167',
        companyAddress: 'Direccion',
        companyName: 'Casa Mazatlán',
        digifactName: '104298642',
        franchiseNumber: 5,
        nit: 104298642,
        uniqueToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkdULjAwMDEwNDI5ODY0Mi4xMDQyOTg2NDIiLCJuYmYiOjE2MTUyMzk1MzEsImV4cCI6MTY0NjM0MzUzMSwiaWF0IjoxNjE1MjM5NTMxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ5MjIwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0OTIyMCJ9.BtgORvymQOfdmDptBF1NddYlomEVxhg3XIF69FMeVR8"
      }})
  }
  return {seedingValue, createRegistry};
}

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

export const ReceiptDB = ()=>{
  const database = useFirebaseApp().database();
  const insertReceipt = (data)=>{
    const DESTINATION = GENERAL_DEMO + DateforSection();
    return database.ref(DESTINATION).push(data);
  }
  return {insertReceipt}
}

