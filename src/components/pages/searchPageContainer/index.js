import React, { Component } from "react";
import * as BooksAPI from "../../../BooksAPI";
import BookList from "../../commonComponents/bookList";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class SearchPageContainer extends Component {
  state = {
    searchBooks: [],
    redirect: null,
  };

  changeBookShelf = (shelf, book) => {
    BooksAPI.update(book, shelf).then((response) => {
      if (response) {
        this.props.history.push("/");
      }
    });
  };

  onSearch = (event) => {
    //called search book api to search books
    const value = event.target.value;
    if (value) {
      BooksAPI.search(value).then((books) => {
        if (!books || books.hasOwnProperty("error")) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  };

  render() {
    const { books } = this.props;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button
                className="close-search"
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
                books={books}
                bookList={this.state.searchBooks}
                handleChange={this.changeBookShelf}
              />
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchPageContainer);
