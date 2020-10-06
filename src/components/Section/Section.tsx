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
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../App';
import { groupBy } from 'lodash';
import { MenuItem } from '../../containers/Menu/Menu';
import ItemCard from '../ItemCard/ItemCard';

interface SectionProps {
  title: string;
  menuItems: MenuItem[];
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function Section(props: SectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="section-container">
      <div className="section-header">
        <h4>{props.title}</h4>
        <div onClick={() => setIsOpen(!isOpen)}>
          {!isOpen && <FontAwesomeIcon icon={faArrowDown} />}{' '}
          {isOpen && <FontAwesomeIcon icon={faArrowUp} />}
        </div>
      </div>

      <Collapse open={isOpen}>
        {props.menuItems.map((value, index) => {
          return (
            <>
              <ItemCard
                menuItem={value}
                cart={props.cart}
                setCartItems={props.setCartItems}
              ></ItemCard>
            </>
          );
        })}
      </Collapse>
      <hr />
    </div>
  );
}

export default Section;
