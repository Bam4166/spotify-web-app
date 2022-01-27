import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.state = { 
      searchResults: [{ name: 'Name1', artist: 'Artist1', album: 'Album1', id: 1 },
      { name: 'Name2', artist: 'Artist2', album: 'Album2', id: 2 } , 
      { name: 'Name3', artist: 'Artist3', album: 'Album3', id: 3 }],
      playlistName: 'Playlist Name',
      playlistTracks: [{name: 'Name4', artist: 'Artist4', album: 'Album4', id: 4}]
    }
   }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
             <SearchResults searchResults={this.state.searchResults}
                              onAdd={this.addTrack} />
             <Playlist playlistName={this.state.playlistName} 
                          playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}
 