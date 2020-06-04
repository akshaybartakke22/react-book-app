import React, { Component } from "react";
import map from "lodash/map";

class BookList extends Component {
  handleBookShelfChange = (shelf, book) => {
    this.props.handleChange(shelf, book);
  };

  getListItem = (book) => {
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
                  book.imageLinks ? book.imageLinks.thumbnail : '../images/no_cover.gif'
                })`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={book.shelf ? book.shelf : ''}
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
              <div>Shelf is empty.</div>
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
