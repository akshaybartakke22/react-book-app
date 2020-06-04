import React, { Component } from "react";
import map from "lodash/map";

class BookList extends Component {
  handleBookShelfChange = (shelf, book) => {
    this.props.handleChange(shelf, book);
  };

  getListItem = (book) => {
    // set current shelf to none as default
    let currentShelf = "none";

    // if book is in current list, set current shelf to book.shelf
    if (this.props.books) {
      for (let item of this.props.books) {
        if (item.id === book.id) {
          currentShelf = item.shelf;
          break;
        }
      }
    }

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks
                    ? book.imageLinks.thumbnail
                    : "../images/no_cover.gif"
                })`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={book.shelf ? book.shelf : currentShelf}
                onChange={(event) =>
                  this.handleBookShelfChange(event.target.value, book)
                }
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title ? book.title : null}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(",") : null}
          </div>
        </div>
      </li>
    );
  };

  render() {
    const { bookList } = this.props;

    return (
      <div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookList.length <= 0 ? (
              <div>Books not found.</div>
            ) : (
              map(bookList, (item) => {
                return this.getListItem(item);
              })
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookList;
