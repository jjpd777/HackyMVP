import React, { useEffect, useState } from 'react';
import './Section.scss';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
  Button,
} from 'shards-react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'shards-react';
import { Collapse } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../App';
import { groupBy } from 'lodash';
import { MenuItem } from '../../containers/Menu/Menu';
import ItemCard from '../ItemCard/ItemCard';
import PoSCard from '../ItemCard/PoSCard';
import EditCard from '../ItemCard/EditCard';
import { Container, Row, Col } from "shards-react";




interface SectionProps {
  title: string;
  menuItems: MenuItem[];
  cart: CartItem[];
  pos:String;
  setCartItems: React.Dispatch<React.SetStateAction<any>>;
}

function Section(props: SectionProps) {
  var pos = props.pos;
  

  
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="section-container">
      <div className="section-header">
        <div onClick={() => {setIsOpen(!isOpen);}}>
          <h5>{props.title}{' '}
          {!isOpen && <FontAwesomeIcon icon={faAngleDoubleDown} />}{' '}
          {isOpen && <FontAwesomeIcon icon={faArrowUp} />}
          </h5>
        </div>
      </div>

      <Collapse open={isOpen}>
        {props.menuItems.map((value, index) => {
          return (
            <>
            {pos==="pos"&& (
              <PoSCard
                menuItem={value}
                cart={props.cart}
                setCartItems={props.setCartItems}
              ></PoSCard>)}
              {pos==="sales" && (
              <ItemCard
                menuItem={value}
                cart={props.cart}
                setCartItems={props.setCartItems}
              ></ItemCard>
              )}
              {pos==="edit" && (
              <EditCard
                menuItem={value}
                cart={props.cart}
                setCartItems={props.setCartItems}
              ></EditCard>
              )}
              
            </>
          );
        })}
      </Collapse>
      <hr />
    </div>
  );
}

export default Section;
