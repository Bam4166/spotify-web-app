import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: ''
    }
    this.search = this.search.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  // update the state with the event.target.value from the search bar 
  handleQueryChange(e) {
    this.setState({query: e.target.value});
  }

  // passes the SearchBar state to the onSearch props passed in App.js when we click the search button
  search() {
    this.props.onSearch(this.state.query);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Search Songs, Albums or Artists"
                onChange={this.handleQueryChange} />
        <button className="SearchButton" onClick={this.props.onSearch}>SEARCH</button>
      </div>
    )
  }

}