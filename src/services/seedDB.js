import { menuItemsMock } from '../cp-menut';
import DBservice from "./DBservice";

const transcribe = (inventory) => {
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
      DBservice.seedInventory(data);
    })
  };
  const resetDB = (menuItems)=>{
    menuItems.map((item)=>{
      const tmp ={
        quantityavailable :0
      }
      DBservice.updateInventory(item.id, tmp)
    })
  }


export default {transcribe, resetDB};