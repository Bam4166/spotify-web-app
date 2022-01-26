import React from 'react';
import './Track.css';

export class Track extends React.Component {

  renderAction() {
    this.props.isRemoval ? 
      <button className="Track-action">-</button> : 
      <button className="Track-action">+</button>
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {
              // Track name
            }
          </h3>
          <p>
            {
              // Track Artist | Track Album
            }
          </p>
        </div>
          {this.renderAction}
      </div>
    )
  }

}
