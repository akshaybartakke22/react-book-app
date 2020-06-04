import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import HomePageContainer from "./components/pages/HomePageContainer";
import SearchPageContainer from "./components/pages/SearchPageContainer";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
  };

  render() {
    return (
      <div className="app">
        <Route path="/" exact component={HomePageContainer} />
        <Route path="/search" component={SearchPageContainer} />
      </div>
    );
  }
}

export default BooksApp;
