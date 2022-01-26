import React from 'react';
import './App.css';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
             <SearchResults />
             <Playlist />
          </div>
        </div>
      </div>
    )
  }
}
