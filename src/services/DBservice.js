import database from "./firebase";

const db = database.ref("/inventario-borgona");

const getAll = (table) => {
  const dbs = database.ref(table);
  return dbs;
};

const create = (data,table) => {
  const dbs = database.ref(table);
  return dbs.push(data);
};

const update = (key, data) => {
  const dbs = database.ref("/ventas-borgona");
  return dbs.child(key).update(data);
};

const remove = (key) => {
  return db.child(key).remove();
};

const removeAll = () => {
  return db.remove();
};

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
};
