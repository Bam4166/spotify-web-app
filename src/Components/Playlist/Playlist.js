import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
constructor(props) {
  super(props);
  this.handleNameChange = this.handleNameChange.bind(this);
}

  // passes the event target value to onNameChange property, which in turn updates the playlistName state through updatePlaylistName method in App.js
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue = {'New Playlist'} 
                onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks}
          isRemoval={true} 
          onRemove={this.props.onRemove} /> 
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY
        </button>
      </div>
    )
  }

}

