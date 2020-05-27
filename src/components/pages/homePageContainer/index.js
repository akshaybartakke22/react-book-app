import React, { Component } from 'react';
import BookList from "../../commonComponents/bookList";
import * as BooksAPI from "../../../BooksAPI";
import * as ShelfStatusConstants from "../../../constants/BookListContstants"; 

class HomePageContainer extends Component {

    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        currentlyReadingArry: [],
        wantToReadArry: [],
        readArry: [],
    };

    componentDidMount = () => {
        BooksAPI.getAll().then((response) => {
          this.setState({
            readArry: response.filter(
              (res) => res.shelf === ShelfStatusConstants.read
            ),
            currentlyReadingArry: response.filter(
              (res) => res.shelf === ShelfStatusConstants.currentlyReading
            ),
            wantToReadArry: response.filter(
              (res) => res.shelf === ShelfStatusConstants.wantToReadArry
            ),
          });
          // console.log(this.state)
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
                  <BookList bookList={currentlyReadingArry} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList bookList={wantToReadArry} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList bookList={readArry} />
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
            </div>
        );
    }
}

export default HomePageContainer;