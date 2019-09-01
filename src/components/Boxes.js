import React, { Component } from 'react';

class Boxes extends Component {
    render() {
        const boxStyle = {
            backgroundColor: this.props.color,
            height: "10px",
            width: "10px",
            border: "1px solid lightblue"
        }
        return (
            <div style={boxStyle}>
            </div>
        )
      }
}

export default Boxes;