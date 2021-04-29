import React from "react";
import { Button, Label } from 'semantic-ui-react';
import './CartButton.scss'

function CartButton({count, onCart}) {
  return (
    <div>
        <Button className='cart-button' icon='shopping cart' size='massive' color='blue' onClick={() => onCart()}></Button>
        {count > 0 ? <Label className='cart-button-label' color='teal'>{count}</Label> : <div></div> } 
    </div>
  );
}

export default CartButton;
