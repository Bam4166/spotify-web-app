import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // verify if the song is a song result or a playlist. isRemoval is set to false on searchResults and set to true on playlist.
  renderAction() {
    // if isRemoval is true, then it means the song is in our playlist and we can remove it.
    if (this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}>-</button>
    } else { 
      // if isRemoval is false, then it means the song is in our searchResults and we can add it to the playlist.
      return <button className="Track-action" onClick={this.addTrack}>+</button>
    }
  }

  // onAdd prop passed to App.js adds the track to the playlist
  addTrack(){
    this.props.onAdd(this.props.track);
  }

  // onRemove prop passed to App.js removes the track from the playlist
  removeTrack(){
    this.props.onRemove(this.props.track);
  }
 
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p> {this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }

}
