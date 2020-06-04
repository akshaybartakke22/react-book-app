import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import HomePageContainer from "./components/pages/HomePageContainer";
import SearchPageContainer from "./components/pages/SearchPageContainer";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  handleGetAllBooks = () => {
    // get all books and create shelfs for books
    BooksAPI.getAll().then((response) => {
      this.setState({
        books: response,
      });
    });
  };

  handleChangeBookShelf = (shelf, book) => {
    //update book Shelf and called all books api
    BooksAPI.update(book, shelf).then((response) => {
      if (response) {
        this.handleGetAllBooks();
      }
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
            <HomePageContainer
              books={books}
              changeShelf={this.handleChangeBookShelf}
              getAllBooks={this.handleGetAllBooks}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchPageContainer
              books={books}
              changeShelf={this.handleChangeBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
