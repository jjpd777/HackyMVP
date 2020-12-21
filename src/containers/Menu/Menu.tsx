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
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brief: string;
}

interface MenuProps {
  menuItems: any[];
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

interface CategoryOpenState {
  [category: string]: boolean;
}
function Menu(props: MenuProps) {
  const { menuItems, cart, setCartItems } = props;
  useEffect(() => {
    setMenuList(menuItems);
  }, [menuItems]);

  const [menuList, setMenuList] = useState<any[]>(menuItems);

  const categories = groupBy(menuList, (x) => x.category);

  const defaultState = {};
  Object.entries(categories).map(([key]) => {
    defaultState[key] = true;
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Triggered whenever Search Query changes
    const filtered = menuItems.filter((x) =>
      x.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMenuList(filtered);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };
  const sections: JSX.Element[] = [];
  Object.entries(categories).map(([key, value], index) => {
    key !=="demostracion" &&  sections.push(
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
