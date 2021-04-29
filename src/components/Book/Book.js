import React from "react";
import { Card, Image, Button, Header } from 'semantic-ui-react';
import './Book.css'

function Book({id, title, author, image, pages, price, currency, onClick}) {

  const handleClick = () => {
    onClick(id);
  }

  return (
    <Card>
      <Image src={image} style={{height: '400px'}}></Image>
      <Card.Content style={{height: '130px'}}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          {`${author}, pages: ${pages}`}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
          <Header as='h3' floated='left'>{`${price} ${currency}`}</Header>
        <Button style={{float: 'right'}} color='blue' onClick={handleClick}>Add to cart</Button>
      </Card.Content>
    </Card>
  );
}

export default Book;
