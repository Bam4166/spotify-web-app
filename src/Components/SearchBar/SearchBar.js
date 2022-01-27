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

  search() {
    this.props.onSearch(this.state.query);
  }

  handleQueryChange(e) {
    this.setState({query: e.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Search Songs, Albums or Artists"
                onChange={this.handleQueryChange} />
        <button className="SearchButton">SEARCH</button>
      </div>
    )
  }

}

