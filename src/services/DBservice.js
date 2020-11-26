import database from "./firebase";

const STORENAME= "PLAZOLETA"
const SHOP_URL = "/plazoleta"
const INVENTORY_URL = SHOP_URL + "/inventario";
const SALES_URL = SHOP_URL + "/ventas"

// const INVENTORY_URL = "/inventario-borgona";
// const SALES_URL =  "/ventas-borgona"

// ====>>>> <<<<=====

const getStoreName = ()=> STORENAME;

const getDate = ()=>{
  var date = new Date();
  return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}

const seedInventory = (data) => {
  const newSeedURL = "/comercia/inventario";
  const db = database.ref(newSeedURL);
  return db.push(data);
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
  const db = database.ref(SALES_URL);
  return db.push(data);
};

const updateSale = (key, data) => {
  const db = database.ref(SALES_URL);
  return db.child(key).update(data);
};


export default {
  getDate,
  getStoreName,
  removeInventory,
  getAllInventory,
  createInventory,
  updateInventory,
  getAllSales,
  createSale,
  updateSale,
  seedInventory
};
