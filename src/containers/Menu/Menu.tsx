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
  pos: String;
}

interface CategoryOpenState {
  [category: string]: boolean;
}
function Menu(props: MenuProps) {
  const { menuItems, cart, setCartItems } = props;

  const [currentSection, setCurrentSection] = useState("Lo más vendido")
  useEffect(() => {
    setMenuList(menuItems);
  }, [menuItems]);

  const [menuList, setMenuList] = useState<MenuItem[]>(menuItems);

  const categories = groupBy(menuList, (x) => x.category);
  const getHeaders = () => {
    const headers: any[] = [];
    Object.entries(categories).map(([key, value], index) => {
      const title = key ? key : value["category"];
      headers.push([key]);
    }
    );
    return headers;
  }

  const defaultState = {};
  Object.entries(categories).map(([key]) => {
    defaultState[key] = true;
  });

  const [searchQuery, setSearchQuery] = useState('');
  // Get the sale date
  // const getTitle(value)=> value. ? key : 
  // const selectScreen = ()=>{
    const response: JSX.Element[] = [];
    Object.entries(categories).map(([key, value], index) => {
      const title = key ? key : value["category"];
      if(key===currentSection){
        response.push(
        <Section
          title={title}
          menuItems={value}
          cart={cart}
          setCartItems={setCartItems}
          pos={props.pos}
          sectionOnScreen={currentSection}
        ></Section>
      );}
    });
    // return response;
  // }

  const sections: JSX.Element[] = [];
  Object.entries(categories).map(([key, value], index) => {
    const title = key ? key : value["category"];
    sections.push(
      <Section
        title={title}
        menuItems={value}
        cart={cart}
        setCartItems={setCartItems}
        pos={props.pos}
        sectionOnScreen={currentSection}
      ></Section>
    );
  });

  const isInventory = props.pos ==="pos" ? "top" :"top-1";
  return (
    <div className="container">
        { props.pos==="sales" ? (
                <div className="menu-container">{sections}</div>

        )
        :(
          <>
          <div className="bruh-header">{currentSection}</div>
           {getHeaders().map((val) =>
        <Button
        className={isInventory}
          onClick={() => {
            setCurrentSection(String(val));
          }
          }>
      {val}
        </Button>)}
        <br></br>
          <div className="menu-container">{response}</div>
          <br></br>
          <br></br>
          <br></br>

          </>
        )
        }

    </div>
  );
}

export default Menu;
