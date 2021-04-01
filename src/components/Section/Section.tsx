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
import { Container, Row, Col } from "shards-react";

interface SectionProps {
  title: string;
  menuItems: MenuItem[];
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function Section(props: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const PoSCardsByRow = (ix) => {

    if (ix < props.menuItems.length) return (

      <Col>
        <ItemCard
          menuItem={props.menuItems[ix]}
          cart={props.cart}
          setCartItems={props.setCartItems}
        ></ItemCard>
      </Col>
    )
    else
      return (
        <Col>
        </Col>
      )
  }
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
            {(index % 3 === 0) && (<Container className="dr-example-container">
                  <Row>
                    {PoSCardsByRow(index)}
                    {PoSCardsByRow(index + 1)}
                  </Row>
                </Container>)}
            </>
          );
        })}
      </Collapse>
      <hr />
    </div>
  );
}

export default Section;
