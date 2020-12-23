import database from "./firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered, faBalanceScale, faStoreAlt, faPencilAlt, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';



const STORENAME= "CENTRAL"
const ROOT = "SEVILLA"
const SHOP_URL = ROOT + "/" + STORENAME

// const INVENTORY_URL = SHOP_URL + "/inventory";
const INVENTORY_URL =  ROOT + "/inventory";
const SALES_URL = SHOP_URL + "/sales/"
const REGISTER = SHOP_URL + "/daily-transactions/";
const MOVEMENT_URL = ROOT + "/movements/"
const DABBLING = "/success"

// const SALES_URL =  "/ventas-getfit"

// ====>>>> <<<<=====

const getFitFlag = () =>  true;
const getStoreName = ()=> STORENAME;

const insertJSON = (data)=>{
  const db = database.ref(DABBLING);
  return db.push(data);
};

const helperAdmin = (inventory)=>{
  inventory.map((x)=>{
    const db = database.ref(ROOT+"/inventory").push();
    const insertion = {
      category: x.category,
      id: db.key,
      image: x.image,
      name: x.name,
      price: x.price,
    };
    db.set(insertion)

  })
}
const root4shops = () => {
  const ref = database.ref(ROOT + '/');
  return ref;

};

const getDailyMovementAddress = ()=>{
  const DATE = newMHMY().split('&')[1]
  return MOVEMENT_URL + DATE;
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
  return hr+ ":"+min+ "&"+dd + '-' + mm + '-' + yyyy;
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
  var ref = database.ref(todaysTable).push();
  var insertionData = data;
  insertionData.insertionID = ref.key;
  ref.set(insertionData);
};

const update2daily= (key, data) => {
  const start = REGISTER+getDateforSection();
  const db = database.ref(start);
  return db.child(key).update(data);
};

const getAllTest = () =>{
  const testAddress = getRegisterAddress();
  const db = database.ref(testAddress);
  return db;
}

const seedSales = (inventory) => {
  const DESTINATION = getRegisterAddress() + '/';
    // if(database().ref(DESTINATION)) return;
  
    const stockInfo = {
        inStock: 0,
        sold: 0,
    };
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
const createMovement = (data) => {
  const DESTINATION = getDailyMovementAddress();
  const ref = database.ref(DESTINATION).push();
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

const getDaySales = (date) => {
  const db = database.ref(SALES_URL +date);
  return db;
};
const getDayInv = (date) => {
  const db = database.ref(REGISTER +date);
  return db;
};


const fetchDateSales = (date) => {
  const db = database.ref(SALES_URL+"/"+ date);
  return db;
};

const createSale = (data) => {
  const db = database.ref(SALES_URL).push();
  return db.set(data);
};



const updateSale = (key, data) => {
  const date = getDateforSection();
  const db = database.ref(SALES_URL+date);
  return db.child(key).update(data);
};

const updateStock = (key, data)=>{
  const db = database.ref(SALES_URL);
  return db.child(key).update(data);

}

const getAllMovements = () => {
  const DESTINATION = getDailyMovementAddress();
  const db = database.ref(DESTINATION);
  return db;
};
const changesLog = (data)=>{
  const db = database.ref(ROOT +"/changes-log");
  db.push(data);
}
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
  insertJSON,
  //////
  updateStock,
  update2daily,
  createMovement,
  getAllMovements,
  getFitFlag,
  fetchDateSales,
  helperAdmin,
  changesLog,
  root4shops,
  getDaySales,
  getDayInv
};
