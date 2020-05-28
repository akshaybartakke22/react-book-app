import React from "react";
import "./App.css";
import HomePageContainer from "./components/pages/homePageContainer";
import searchPageContainer from "./components/pages/searchPageContainer";
import { Link, Route, Switch } from "react-router-dom";
import BookDetailsContainer from "./components/pages/homePageContainer";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  render() {
    return (
      <div className="app">
        {/* <Route exact={true} path="/" component={Home} /> */}
        {/* <Route path="/book-details" component={BookDetailsContainer} /> */}

        {this.state.showSearchPage ? (
          <searchPageContainer />
        ) : (
          <HomePageContainer />
        )}
      </div>
    );
  }
}

export default BooksApp;
