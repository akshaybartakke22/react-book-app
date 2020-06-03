import React, { Component } from "react";
import * as BooksAPI from "../../../BooksAPI";
import BookList from "../../commonComponents/BookList";
import { Link } from "react-router-dom";

class searchPageContainer extends Component {
  state = {
    books: [],
    currentBooks: [],
    redirect: null,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // Get rid of all other properties except book id
      const booksId = books.map((book) => ({ id: book.id, shelf: book.shelf }));
      this.setState({ currentBooks: booksId });
    });
  }

  changeBookShelf = (shelf, book) => {
    BooksAPI.update(book, shelf).then((response) => {
      if (response) {
        this.props.history.push("/");
      }
    });
  };

  onSearch = (event) => {
    const value = event.target.value;
    console.log(value);
    if (value) {
      BooksAPI.search(value).then((books) => {
        if (!books || books.hasOwnProperty("error")) {
          this.setState({ books: [] });
        } else {
          this.setState({ books: books });
        }
      });
    } else {
      this.setState({ books: [] });
    }
  };

  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              />
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                onChange={this.onSearch}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              <BookList
                bookList={this.state.books}
                handleChange={this.changeBookShelf}
              />
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default searchPageContainer;
