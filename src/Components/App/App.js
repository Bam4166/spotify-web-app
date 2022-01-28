import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    // this binds
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // addTrack method adds a song to the playlist
  addTrack(track) {
    // tracks gets passed the playlistTracks key from state
    let tracks = this.state.playlistTracks;
    // if the track's id already exists in the playlist, it returns, otherwise it pushes the new song into our state  
    if (tracks.find(savedTrack => savedTrack.id === track.id)) return;
    tracks.push(track);

    // we then update the state of playlistTracks with the new track 
    this.setState({playlistTracks: tracks});
  }
  
  // removeTrack method removes a song from the playlist
  removeTrack(track) {
    // again, tracks gets passed the state of playlistTracks.
    let tracks = this.state.playlistTracks;
    // this time we filter tracks so we get every track which id does NOT match our track id
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    // update the state with the filtered array
    this.setState({playlistTracks: tracks});
  }

  // updatePlaylistName method will update the playlistName state with the updated name
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(tracks => tracks.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      // once we get the results from calling savePlaylist, we set the playlist state to its default value and the playlistTracks to an empty array

      this.setState({playlistName: 'New Playlist',
                     playlistTracks: [] 
                    })
    });
  }

  search(query) {
    // update state of searchResults with the searchResults value returned from the promise in Spotify.js search method
    Spotify.search(query).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  
  componentDidMount() {
    // this event listener makes it so the getAccessToken method from Spotify.js happens before we press the search button for the first time
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}
                      />
          <div className="App-playlist">
             <SearchResults searchResults={this.state.searchResults}
                              onAdd={this.addTrack} />
             <Playlist playlistName={this.state.playlistName} 
                          playlistTracks={this.state.playlistTracks}
                          onRemove={this.removeTrack}
                          onNameChange={this.updatePlaylistName}
                          onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}
 