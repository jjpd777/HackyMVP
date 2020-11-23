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
import { getByTestId } from '@testing-library/dom';




interface SectionProps {
  title: string;
  menuItems: MenuItem[];
  cart: CartItem[];
  pos: String;
  sectionOnScreen: String;
  setCartItems: React.Dispatch<React.SetStateAction<any>>;
}

function Section(props: SectionProps) {
  var pos = props.pos;
  const [isOpen, setIsOpen] = useState(false);


  // var sectionIsOpen =()=> {
  //   const a = props.title;
  //   const b = props.sectionOnScreen;
  //   setIsOpen(a===b);}

  // useEffect(()=>sectionIsOpen(),[props.sectionOnScreen])
  const salesSection = () => pos==="sales" ? isOpen : true;
  const PoSCardsByRow = (ix) => {

    if (ix < props.menuItems.length) return (

      <Col>
        <PoSCard
          menuItem={props.menuItems[ix]}
          cart={props.cart}
          setCartItems={props.setCartItems}
        ></PoSCard>
      </Col>
    )
    else
      return (
        <Col>
        </Col>
      )
  }
  const InventoryCardsByRow = (ix) => {

    if (ix < props.menuItems.length) return (

      <Col>
        <EditCard
          menuItem={props.menuItems[ix]}
          cart={props.cart}
          setCartItems={props.setCartItems}
        ></EditCard>
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
          {pos === "sales" && (
                <>
                    <div  onClick={() => setIsOpen(!isOpen)} className="section-header">
                      <h5>{props.title}{' '}
                      {!isOpen && <FontAwesomeIcon icon={faAngleDoubleDown} />}{' '}
                      {isOpen && <FontAwesomeIcon icon={faArrowUp} />}
                      </h5>
                  </div>
                </>
              )}
        
        <Collapse open={salesSection()}>
        {props.menuItems.map((value, index) => {
          return (
            <>
              {pos === "pos" && (index % 3 === 0) && (
                <Container className="dr-example-container">
                  <Row>
                    {PoSCardsByRow(index)}
                    {PoSCardsByRow(index + 1)}
                    {PoSCardsByRow(index + 2)}
                  </Row>
                </Container>
              )}
              {pos === "sales" && (

                <ItemCard
                  menuItem={value}
                  cart={props.cart}
                  setCartItems={props.setCartItems}
                ></ItemCard>
              )}
              {pos === "edit" && (index % 3 === 0) &&(
                <Container className="dr-example-container">
                <Row>
                  {InventoryCardsByRow(index)}
                  {InventoryCardsByRow(index + 1)}
                  {InventoryCardsByRow(index + 2)}
                </Row>
              </Container>
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
