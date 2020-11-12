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


interface SectionProps {
  title: string;
  menuItems: MenuItem[];
  cart: CartItem[];
  pos:boolean;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function Section(props: SectionProps) {
  var pos = props.pos;
  

  
  const [isOpen, setIsOpen] = useState(false);
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
            {pos ? (<PoSCard
                menuItem={value}
                cart={props.cart}
                setCartItems={props.setCartItems}
              ></PoSCard>):(
              <ItemCard
                menuItem={value}
                cart={props.cart}
                setCartItems={props.setCartItems}
              ></ItemCard>
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
