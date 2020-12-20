import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered, faBalanceScale, faStoreAlt, faPencilAlt, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useFirebaseApp, useUser } from 'reactfire';

const STORENAME = "GERONA"
const ROOT = "BORGONA"

const SHOP_URL = ROOT + "/" + STORENAME;

const INVENTORY_URL = SHOP_URL + "/inventory/";
const SALES_URL = SHOP_URL + "/sales/"
const REGISTER = SHOP_URL + "/global-count/";
const DABBLING = "/success";
const DAILYORDERS = "/orders-factory"


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

  const insert2factory = (data)=>{
    return database.ref(DAILYORDERS).push(data);
  };

  return {root4inventory, insert2factory };
};

