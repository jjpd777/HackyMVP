import database from "./firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered, faBalanceScale, faStoreAlt, faPencilAlt, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';



const STORENAME= "DEV"
const SHOP_URL = "/" + STORENAME

const INVENTORY_URL = SHOP_URL + "/inventario";
const SALES_URL = SHOP_URL + "/sales"
const REGISTER = SHOP_URL + "/global-count/";

const DABBLING = "/success"

// const INVENTORY_URL = "/inventario-getfit";
// const SALES_URL =  "/ventas-getfit"

// ====>>>> <<<<=====

const getStoreName = ()=> STORENAME;

const insertJSON = (data)=>{
  const db = database.ref(DABBLING);
  return db.push(data);
}

const removeAllSales =()=>{
  const fuckedUp = REGISTER+getDateforSection();
  return database.ref(fuckedUp).remove();
}
const newMHMY = ()=>{
  var today = new Date();
  var min = String(today.getMinutes()).padStart(2, '0');
  var hr = String(today.getHours()).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return hr+ ":"+min+ "&"+mm + '-' + dd + '-' + yyyy;
}
function getDateforSection() {
  const DMY = newMHMY().split("&")[1];
  return DMY;
}

const getRegisterAddress = ()=>{
  const date = getDateforSection();
  const testAddress = REGISTER+date;
  return testAddress
}

const seedInventory = (data) => {
  const newSeedURL = "/admin-trial/inventario";
  const db = database.ref(newSeedURL);
  return db.push(data);
};


const createRegister = (item) => {
 
  const db = database.ref(getRegisterAddress());
  return db.push(item);
};

const getAllTest = () =>{
  const testAddress = getRegisterAddress();
  const db = database.ref(testAddress);
  return db;
}

const transcribe = (inventory,destination) => {
  inventory.map((item)=>{
    var data = {
      id: "",
      category: item.category,
      name: item.name,
      brief: "",
      quantityavailable: 0,
      price: item.price,
      image: "",
    };

    const db = database.ref(destination);
    db.push(data);
  })
};
const seedSales = (inventory) => {
  inventory.map((item)=>{
    var data = {
      uniqueIdentifier:"",
      productID: item.id,
      category: item.category,
      name: item.name,
      brief: "",
      quantityavailable: 0,
      price: item.price,
      image: "",
    };

    const db = database.ref(getRegisterAddress());
    db.push(data);
  })
};

const updateSoldUnits= (key, data) => {
  const start = REGISTER+getDateforSection();
  const db = database.ref(start);
  return db.child(key).update(data);
};

// ====>>>> <<<<=====
const getAllInventory = () => {
  const db = database.ref(INVENTORY_URL);
  return db;
};

const createInventory = (data) => {
  const db = database.ref(INVENTORY_URL);
  return db.push(data);
};

const updateInventory = (key, data) => {
  const db = database.ref(INVENTORY_URL);
  return db.child(key).update(data);
};

const removeInventory = (key) => {
  const db = database.ref(INVENTORY_URL);
  return db.child(key).remove();
};

// ====>>>> <<<<=====

const getAllSales = () => {
  const db = database.ref(SALES_URL);
  return db;
};

const createSale = (data) => {
  const db = database.ref(SALES_URL).push();
  return db.set(data);
};

const updateSale = (key, data) => {
  const db = database.ref(SALES_URL);
  return db.child(key).update(data);
};


export default {
  getDateforSection,
  removeAllSales,
  newMHMY,
  updateSoldUnits,
  transcribe,
  seedSales,
  getAllTest,
  createRegister,
  getStoreName,
  removeInventory,
  getAllInventory,
  createInventory,
  updateInventory,
  getAllSales,
  createSale,
  updateSale,
  seedInventory,
  insertJSON
};
