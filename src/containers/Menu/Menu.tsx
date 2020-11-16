import React, { useEffect, useState } from 'react';
import './Menu.scss';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
  Button,
} from 'shards-react';

import { CartItem } from '../../App';
import { groupBy } from 'lodash';
import Section from '../../components/Section/Section';
import { element } from 'prop-types';

export interface MenuItem {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  quantityavailable: number;
  brief: string;
}

interface MenuProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<any>>;
  pos:String;
}

interface CategoryOpenState {
  [category: string]: boolean;
}
function Menu(props: MenuProps) {
  const { menuItems, cart, setCartItems } = props;
  useEffect(() => {
    setMenuList(menuItems);
  }, [menuItems]);

  const [menuList, setMenuList] = useState<MenuItem[]>(menuItems);

  const categories = groupBy(menuList, (x) => x.category);
  

  const defaultState = {};
  Object.entries(categories).map(([key]) => {
    defaultState[key] = true;
  });

  const [searchQuery, setSearchQuery] = useState('');
  // Get the sale date
  // const getTitle(value)=> value. ? key : 

  const sections: JSX.Element[] = [];
  Object.entries(categories).map(([key, value], index) => {
    const title = key ? key: value["category"];
    sections.push(
      <Section
        title={title}
        menuItems={value}
        cart={cart}
        setCartItems={setCartItems}
        pos={props.pos}
      ></Section>
    );
  });

  return (
    <div className="container">
      <div className="menu-container">{sections}</div>
    </div>
  );
}

export default Menu;
