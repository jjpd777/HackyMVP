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
import { CartItem } from '../../StoreFront';
import { MenuItem } from '../../containers/Menu/Menu';
import ItemCard from '../ItemCard/ItemCard';

interface SectionProps {
  title: string;
  menuItems: MenuItem[];
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function Section(props: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="section-container">
      <div className="section-header">
        
        <div onClick={() => setIsOpen(!isOpen)}>
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
