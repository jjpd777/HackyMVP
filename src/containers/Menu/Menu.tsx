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
  menuItems: MenuItem[];
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

  const [menuList, setMenuList] = useState<MenuItem[]>(menuItems);

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
      <div className="tagline">¡Recién hecho y crujiente!</div>
      <div className="search">
        <InputGroup>
          <FormInput
            placeholder="¿Qué se te antoja?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupAddon type="append">
            <Button
              onClick={() => {
                clearSearch();
              }}
              className="button"
              theme="secondary"
            >
              Buscar
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="menu-container">{sections}</div>
    </div>
  );
}

export default Menu;
