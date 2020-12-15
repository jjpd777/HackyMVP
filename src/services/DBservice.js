import database from "./firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered, faBalanceScale, faStoreAlt, faPencilAlt, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';



const STORENAME= "DEV"
const ROOT = "GETFIT"
const SHOP_URL = ROOT + "/" + STORENAME

// const INVENTORY_URL = SHOP_URL + "/inventory";
const INVENTORY_URL = ROOT + "/inventory";

const SALES_URL = SHOP_URL + "/sales"
const REGISTER = SHOP_URL + "/daily-transactions/";

const DABBLING = "/success"

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
  const newSeedURL = "/admin-trial/inventory";
  const db = database.ref(newSeedURL);
  return db.push(data);
};


const insert2daily = (data) => {
  const todaysTable = getRegisterAddress();
  var ref = database().ref(todaysTable).push();
  var insertionData = data;
  insertionData.insertionID = ref.key;
  ref.set(insertionData);
};

const getAllTest = () =>{
  const testAddress = getRegisterAddress();
  const db = database.ref(testAddress);
  return db;
}

const seedSales = (inventory) => {
  console.log("INVE", inventory)
  const DESTINATION = getRegisterAddress() + '/';
    // if(database().ref(DESTINATION)) return;
  
    const stockInfo = {
        inStock: 0,
        sold: 0,
    };
    console.log(inventory)
    console.log(DESTINATION)
    inventory.map((item) => {
        const db = database.ref(DESTINATION).push();
        
        var data = {
            productID: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
            image: item.image,
            stock: stockInfo,
            insertionID: db.key,
        };
        db.set(data);
    });
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
  console.log(INVENTORY_URL)
  var ref = database.ref(INVENTORY_URL).push();
  var insertionData = data;
  insertionData.id = ref.key;
  ref.set(insertionData);
  return ref.key;
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
  seedSales,
  getAllTest,
  insert2daily,
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
