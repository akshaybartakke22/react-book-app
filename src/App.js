import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookList from "./components/commonComponents/bookList";
import * as BooksAPI from "./BooksAPI";
import * as ShelfStatusConstants from "./constants/BookListContstants";
// const  Currently_Reading = 'Currently Reading'

class BooksApp extends React.Component {
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
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

export default BooksApp;
