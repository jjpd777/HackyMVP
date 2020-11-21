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
  pos:String;
  setCartItems: React.Dispatch<React.SetStateAction<any>>;
}

function Section(props: SectionProps) {
  var pos = props.pos;
  const getId = (ix)=>ix%3===0 ? console.log(ix): null;


  const PoSCardsByRow = (ix)=>{

   if(ix< props.menuItems.length) return (

      <Col>
            <PoSCard
            menuItem={props.menuItems[ix]}
            cart={props.cart}
            setCartItems={props.setCartItems}
          ></PoSCard>
      </Col>
    )
    else
      return(
        <Col>
        </Col>
    )
  }

  
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
            {pos==="pos"&& (index%4===0) && (
            <Container className="dr-example-container">
              <Row>
              {PoSCardsByRow(index)}
              {PoSCardsByRow(index+1)}
              {PoSCardsByRow(index+2)}
              {PoSCardsByRow(index+3)}
              </Row>
              </Container>
              )}
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
