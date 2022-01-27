import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
  hasPlaylistName() {
    if (this.props.playlistName) {
      return <input defaultValue = {this.props.playlistName} />
    } else {
      return <input defaultValue = {'New Playlist'} />
    }
  }

  render() {
    return (
      <div className="Playlist">
        {this.hasPlaylistName()}
        <TrackList tracks={this.props.playlistTracks} /> 
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }

}

