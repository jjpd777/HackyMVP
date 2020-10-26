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

export interface MenuItem {
  sitetab: string;
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brief: string;
}

interface MenuProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;

  siteTab:String;
}

interface CategoryOpenState {
  [category: string]: boolean;
}
function Menu(props: MenuProps) {
  const { menuItems, cart, setCartItems, siteTab } = props;
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


  useEffect(() => {
    const filtered = menuItems.filter((x) =>
      x.sitetab === siteTab
    );
    setMenuList(filtered);
  }, [siteTab]);

  const clearSearch = () => {
    setSearchQuery('');
  };
  const sections: JSX.Element[] = [];
  Object.entries(categories).map(([key, value], index) => {
    sections.push(
      <Section
        title={key}
        menuItems={value}
        cart={cart}
        setCartItems={setCartItems}
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
