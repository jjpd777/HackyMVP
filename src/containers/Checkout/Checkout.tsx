import React, { useEffect, useState } from 'react';
import './Checkout.scss';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Button,
} from 'shards-react';
import {
  Card,
  FormTextarea,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'shards-react';
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormGroup,
} from 'shards-react';

import { CartItem } from '../../App';
import { groupBy } from 'lodash';
import { MenuItem } from '../Menu/Menu';

interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;
  const [name, setName] = useState();

  const getCartItems = () => {
    let cartItems: any[] = [];
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          cartItems.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: cartItem.quantity,
          });
        }
      });
    });
    return cartItems;
  };
  return (
    <div className="checkout-container">
      <div className="order-summary">
        <ListGroup>
          {getCartItems().map((item, index) => {
            return (
              <ListGroupItem className="list-item" key={index}>
                <div>
                  {item.name} x {item.quantity}
                </div>
                <div>Qtz. {item.price * item.quantity}</div>
              </ListGroupItem>
            );
          })}

          <ListGroupItem
            style={{ fontWeight: 600 }}
            className="list-item"
            key={'total'}
          >
            <div>Total</div>
            <div>Qtz. {props.totalCartValue}</div>
          </ListGroupItem>
        </ListGroup>
      </div>
      <br />
      <div className="shipping-info">
        <FormInput
          className="input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <FormTextarea
          className="input"
          placeholder="Address"
          onChange={() => {}}
        />
      </div>
      <br></br>
      <Button className="button" block>
        Checkout via WhatsApp
      </Button>

      <Button onClick={props.onBack} className="button-secondary" outline block>
        Back to Menu
      </Button>
    </div>
  );
}

export default Checkout;
