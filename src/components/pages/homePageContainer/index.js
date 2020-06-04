import React, { Component } from "react";
import BookList from "../../commonComponents/BookList";
import { Link } from "react-router-dom";

class HomePageContainer extends Component {
  changeBookShelf = (shelf, book) => {
    //update book Shelf and called all books api
    this.props.changeShelf(shelf, book);
  };

  componentDidMount = () => {
    this.props.getAllBooks();
  };

  render() {
    const { books } = this.props;
    const Bookshelf = [
      { title: "Currently Reading", shelf_type: "currentlyReading" },
      { title: "Want to Read", shelf_type: "wantToRead" },
      { title: "Read", shelf_type: "read" },
    ];

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {Bookshelf.map((shelf, index) => {
              const bookShelf = books.filter(
                (book) => book.shelf === shelf.shelf_type
              );
              return (
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{shelf.title}</h2>
                  <div className="bookshelf-books">
                    <BookList
                      bookList={bookShelf}
                      handleChange={this.changeBookShelf}
                    />
                  </div>
                </div>
              );
            })}
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
