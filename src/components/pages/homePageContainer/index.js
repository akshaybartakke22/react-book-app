import React, { Component } from "react";
import BookList from "../../commonComponents/BookList";
import * as BooksAPI from "../../../BooksAPI";
import * as ShelfStatusConstants from "../../../constants/BookListContstants";
import { Link } from "react-router-dom";

class HomePageContainer extends Component {
  state = {
    showSearchPage: false,
    currentlyReadingArry: [],
    wantToReadArry: [],
    readArry: [],
  };

  getAllBooks = () => {
    BooksAPI.getAll().then((response) => {
      this.setState({
        readArry: response.filter(
          (res) => res.shelf === ShelfStatusConstants.read
        ),
        currentlyReadingArry: response.filter(
          (res) => res.shelf === ShelfStatusConstants.currentlyReading
        ),
        wantToReadArry: response.filter(
          (res) => res.shelf === ShelfStatusConstants.wantToReadArray
        ),
      });
    });
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  changeBookShelf = (shelf, book) => {
    BooksAPI.update(book, shelf).then((response) => {
      if (response) {
        // console.log(response);
        this.getAllBooks();
      }
    });
  };

  render() {
    const { currentlyReadingArry, wantToReadArry, readArry } = this.state;

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <BookList
                  bookList={currentlyReadingArry}
                  handleChange={this.changeBookShelf}
                />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <BookList
                  bookList={wantToReadArry}
                  handleChange={this.changeBookShelf}
                />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <BookList
                  bookList={readArry}
                  handleChange={this.changeBookShelf}
                />
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageContainer;
