import { useFirebaseApp, useUser } from 'reactfire';

// COOL!
const ROOT = "LISTOSOFTWARE";
const CUSTOMER_TABLE  = ROOT+ "/DEV/";

const SAT_TABLE = CUSTOMER_TABLE + "/taxSAT/"

const INVENTORY_URL = CUSTOMER_TABLE + "/inventory/";
const DAILYORDERS =  CUSTOMER_TABLE + "/orders-factory";


export const DateUtils = () => {
const TIMESTAMP_GENERATOR = ()=>{
  var today = new Date();
  var min = String(today.getMinutes()).padStart(2, '0');
  var hr = String(today.getHours()).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return hr + ":" + min + "&" + dd + '-' + mm + '-' + yyyy;
}
 const dateforSection = () => {
  const DMY = TIMESTAMP_GENERATOR().split("&")[1] + '/';
  return DMY;
};
return {TIMESTAMP_GENERATOR, dateforSection};
}


export const InventoryDB = () => {
  const database = useFirebaseApp().database();
  const {dateforSection} = DateUtils();

  const root4inventory = () => {
    return database.ref(INVENTORY_URL);
  };
  const root4previousInv = () => {
    const DESTINATION = DAILYORDERS + '/' + dateforSection();
    return database.ref(DESTINATION);
  };
  const insert2factory = (data)=>{
    const DESTINATION = DAILYORDERS + '/' + dateforSection();
    return database.ref(DESTINATION).push(data);
  };

  return {root4inventory, insert2factory, root4previousInv };
};

export const SaasDB = (x) => {
  const R = x==="lic-galdamez" ? "GALDAMEZ" : x;
  const database = useFirebaseApp().database();
  const {dateforSection} = DateUtils();

  const CUSTOMER_TABLE  = R + "/DEV1/";
  const SAT_TABLE = CUSTOMER_TABLE + "/taxSAT/"


  const root4taxSAT = () => {
    const D = R +"/PRODUCTION/taxSAT/"

    return database.ref(D);
  };
  const root4previousInv = () => {
    const DESTINATION = SAT_TABLE + '/' + dateforSection();
    return database.ref(DESTINATION);
  };
  const insertTaxSAT = (data)=>{
    const DESTINATION = SAT_TABLE + '/' + dateforSection();
    const x = database.ref(DESTINATION).push();
    data["id"] = x.key;
    return x.set(data)
  };

  return {root4taxSAT, insertTaxSAT, root4previousInv };
};

export const ReceiptDB = ()=>{
  const database = useFirebaseApp().database();
  const {dateforSection} = DateUtils();

  const readReceipts = ()=>{
    return database.ref(SAT_TABLE);
  }

  const insertReceipt = (data)=>{
    const DESTINATION = SAT_TABLE + dateforSection();
    const x = database.ref(DESTINATION).push();
    data["id"] = x.key;
    return x.set(data);

  }
  return {insertReceipt, readReceipts}
}

