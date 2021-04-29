import React, { useEffect, useState } from "react";
import { Segment, Table, Icon, Label, Image, Header, Divider, Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import { setCart, setMergedProducts } from "../../actions/cart";
import ButtonPopup from '../ButtonPopup/ButtonPopup'
import './Cart.scss'

function Cart({cart, setCart, merged_products, setMergedProducts, onClick}) {

  const[total_price, setTotalPrice] = useState(0)

  useEffect(() => {

    const calcTotalPrice = () => {
      let price = 0;
      cart.forEach(product => {
        price += product.price;
      })
      setTotalPrice(price);
    }

    const merge = (merged_list, product) => {
      let count = 0;
      let merged_product = {...product};
      cart.forEach(product_cnt => {
        if(product_cnt.id === merged_product.id){ count++; }
      })
      merged_product.count = count;
      merged_list.push(merged_product)
    }

    const merge_products = () => {
      let merged_products = []
  
      merge(merged_products, cart[0])
  
      cart.forEach(product => {
        if(merged_products.length > 0){
          if(!merged_products.some(p => p.id === product.id)){
            merge(merged_products, product)
          }
        }
      })
      return merged_products;
    }

    if(cart.length > 0){
      setMergedProducts(merge_products());
      calcTotalPrice();
    }else{
      setMergedProducts([]);
      setTotalPrice(0)
    }
  }, [cart, setMergedProducts])


  const handleDelete = (id_product) => {
    let found_product_index = cart.findIndex(product => product.id === id_product);
    cart.splice(found_product_index, 1)
    setCart([...cart])
  }

  return (
    <div className='cart-container'>
      <Segment>
        <Label className='cart-header' size='massive'>
          <Icon name='shopping cart' />
          Shopping cart
        </Label>
        <div className='cart-table'>
          <Table style={{textAlign: 'center'}}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{width: '40px'}}></Table.HeaderCell>
                <Table.HeaderCell style={{width: '340px'}}>Product</Table.HeaderCell>
                <Table.HeaderCell style={{width: '100px'}}>Price</Table.HeaderCell>
                <Table.HeaderCell style={{width: '70px'}}>Count</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            
            <Table.Body>
              {merged_products ? 
                merged_products.map((product, counter) => (
                  <Table.Row key={product.id}>
                    <Table.Cell>{counter + 1}</Table.Cell>
                    <Table.Cell>
                      <Image className='cart-product-image' src={product.cover_url}></Image>
                      <Header className='cart-product-title'>{product.title}</Header>
                    </Table.Cell>
                    <Table.Cell>{`${product.price} ${product.currency}`}</Table.Cell>
                    <Table.Cell>{product.count}</Table.Cell>
                    <Table.Cell>
                      <Button style={{padding: '5px 3px 3px 3px'}} icon='minus' color='black' onClick={() => handleDelete(product.id)}>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
                : null}
              </Table.Body>
          </Table>
        </div>
        <Divider></Divider>
        <div>
          {merged_products.length > 0 ? 
            <Button content='Next' onClick={() => {
              if(merged_products.length > 0){ onClick() }
              else{
                alert('Your order is empty.')
              }
            }}>
            </Button>
              : <ButtonPopup label='Next' content='Your shipping cart is empty.'></ButtonPopup>
            }
          <Header floated='right' color='grey'>{total_price} PLN</Header>
          <Header style={{fontWeight: 'normal'}} floated='right' color='grey'>FINAL</Header>
        </div>
      </Segment>
    </div>
  );
}


const mapStateToProps = state => {
  const cart = state.cart.cart;
  const merged_products = state.cart.merged_products;
  return { cart, merged_products }
};

const mapDispatchToProps = { setCart, setMergedProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
