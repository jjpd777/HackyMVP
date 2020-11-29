import database from "./firebase";

const STORENAME= "DESARROLLO"
const SHOP_URL = "/admin-db"
const INVENTORY_URL = SHOP_URL + "/inventario";
const SALES_URL = SHOP_URL + "/ventas"

// const INVENTORY_URL = "/inventario-getfit";
// const SALES_URL =  "/ventas-getfit"

const TESTING = "/admin-db";
const DESTINATION = "/admin-db";
const SALES = DESTINATION + "/sales/";
// ====>>>> <<<<=====

const getStoreName = ()=> STORENAME;

const getDate = ()=>{
  var date = new Date();
  return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}
const newDate = ()=>{
  var today = new Date();
  var min = String(today.getMinutes()).padStart(2, '0');
  var hr = String(today.getHours()).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return mm + '%' + dd + '%' + yyyy;
}

const seedInventory = (data) => {
  const newSeedURL = "/admin-trial/inventario";
  const db = database.ref(newSeedURL);
  return db.push(data);
};

const checkExistence = (table)=>{
  const db = database.ref(table);
  return db;
}

const createTest = (data, table) => {
  const db = database.ref(table);
  return db.push(data);
};

const getAllTest = (testAddress) =>{
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
const seedSales = (inventory,destination) => {
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

    const db = database.ref(destination);
    db.push(data);
  })
};

const updateSoldUnits= (key, data) => {
  const start = SALES+newDate()
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
  const db = database.ref(SALES_URL);
  return db.push(data);
};

const updateSale = (key, data) => {
  const db = database.ref(SALES_URL);
  return db.child(key).update(data);
};


export default {
  newDate,
  updateSoldUnits,
  transcribe,
  seedSales,
  getAllTest,
  createTest,
  checkExistence,
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
