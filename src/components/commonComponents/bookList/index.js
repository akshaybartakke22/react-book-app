import React, { Component } from "react";
import map from "lodash/map";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import  BookDetails  from '../../pages/bookDetailsPage'

class BookList extends Component {
  getListItem = (book, i) => {
    return (
      <li key={i}>
        <div className="book">
          <div className="book-top">
            <img
              className="book-cover"
              src={book.imageLinks.smallThumbnail}
              height="193"
              width="128"
            />
            <div className="book-shelf-changer">
              <select>
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
          <div className="book-title">{book.title}</div>
          {book.authors.map((item, i) => (
            <div className="book-authors" key={i}>
              {item}
            </div>
          ))}
          <div>
          <Route exact path="/book-details" render={() => (
            <BookDetails
            // contacts={this.state.contacts}
            // onDeleteContact={this.removeContact}
          />
        )} />

            <Link to="/create">View Book</Link>
          </div>
        </div>
      </li>
    );
  };

  render() {
    const { bookList } = this.props;
    // console.log(this.props);

    return (
      <div>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {bookList.length <= 0 ?
                <div>
                  Shelf is empty.  
              </div>
               
               : 
               map(bookList, (item) => {
                return this.getListItem(item);
              })
          }
          
          </ol>
        </div>
      </div>
    );
  }
}

export default BookList;
