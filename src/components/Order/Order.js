import React, {useEffect, useState} from "react";
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { connect } from "react-redux";
import { setMergedProducts } from "../../actions/cart";
import InputOrder from '../InputOrder/InputOrder'
import APIService from '../../services/APIService'
import './Order.css'
const { REACT_APP_API_ORDER } = process.env;

function Order(props) {

  const[check_valid, setCheckValid] = useState(false);
  const[form, setForm] = useState({})
  let validation = []

  const handleChange = (name, value) => {
    setForm({...form, [name]: value})
  }

  const handleClick = () => {
    setCheckValid(!check_valid)
  }

  const handleValid = (valid) => {
    validation.push(valid)
  }

  useEffect(() => {
    const api_service = new APIService();
    if(!validation.includes(false) && validation.length > 0){
      let order = createOrder();
      api_service.sendData(REACT_APP_API_ORDER, order)
      alert('Sended!')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation])

  const createOrder = () => {
    let order = {...form};
    let order_elements = [];
    props.merged_products.forEach(product => {
      order_elements.push({ id: product.id,
                            quantity: product.count})
    })
    order.order = order_elements;
    return order;
  }

  return(
    <div className='order-container'>
      <Segment>
        <Label className='order-header'>Purchase order form</Label>
        <Form className='order-form'>
          <InputOrder name={'first_name'} fluid label='First name' placeholder='First name' onChange={handleChange} validation={/^([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{4,})*$/g} check_valid={check_valid} onValid={handleValid}/>
          <InputOrder name={'last_name'} fluid label='Last name' placeholder='Last name' onChange={handleChange} validation={/^([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{5,})*$/g} check_valid={check_valid} onValid={handleValid}/>
          <InputOrder name={'city'} fluid label='City' placeholder='City' onChange={handleChange} validation={/^([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,})*$/g} check_valid={check_valid} onValid={handleValid}/>
          <InputOrder name={'zip_code'} fluid label='Zip code' placeholder='Zip code' onChange={handleChange} validation={/^(\d{2}-\d{3})*$/g} check_valid={check_valid} onValid={handleValid}/>
          <Button type='submit' onClick={handleClick}>I order and pay!</Button>
        </Form>
      </Segment>
    </div>
  );
}

const mapStateToProps = state => {
  const merged_products = state.cart.merged_products;
  return { merged_products }
};

const mapDispatchToProps = { setMergedProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Order);
