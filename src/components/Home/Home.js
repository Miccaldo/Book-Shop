import React, { useEffect, useState } from "react";
import APIService from '../../services/APIService'
import { Grid } from 'semantic-ui-react';
import Book from '../Book/Book'
import CartButton from '../CartButton/CartButton'
import './Home.css'
import { connect } from "react-redux";
import { setCart } from "../../actions/cart";
const { REACT_APP_API_BOOKS } = process.env;

function Home(props) {

    const[books, setBooks] = useState();
    const[display_books, setDisplayBooks] = useState();
    const books_max = 3

    useEffect(() => {

      const divideBooks = (books) => {
        let divided = [];
        for(let i = 0; i < books.length / books_max; i++){
          divided.push(books.slice(i * books_max, i * books_max + books_max))
        }
        return divided;
      }

      const api_service = new APIService();
      const fetchBooks = async() => {
        let books = await api_service.receiveData(REACT_APP_API_BOOKS);
        setBooks(books)
        setDisplayBooks(divideBooks(books))
      }
      fetchBooks();
    }, [])

    const handleClick = (id_book) => {
      let found_book = books.find(book => book.id === id_book);
      props.setCart([...props.cart, found_book])
    }

    return(
      <div>
        {display_books ? 
          <div className='home-container'>
                <CartButton count={props.cart.length} onCart={() => props.onClick()}></CartButton>
                <Grid className='books-container'>
                  {display_books.map((book_row, index) => (
                    <Grid.Row key={index}>
                      {book_row.map(book => (
                        <Grid.Column width={4} key={book.id}>
                          <Book
                              id={book.id}
                              title={book.title} 
                              author={book.author} 
                              image={book.cover_url} 
                              pages={book.pages} 
                              price={book.price} 
                              currency={book.currency}
                              onClick={handleClick}/>
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                  ))}
                </Grid>
          </div>
          : <div></div>}
      </div>
      
    );
}

const mapStateToProps = state => {
  const cart = state.cart.cart;
  return { cart }
};

const mapDispatchToProps = {setCart};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

