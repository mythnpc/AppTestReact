import React, { Component } from 'react';

class Boxes extends Component {
    render() {
        const boxStyle = {
            backgroundColor: this.props.active === 1 ? "black" : "white",
            height: "20px",
            width: "20px",
            border: "1px solid lightblue"
        }
        return (
            <div style={boxStyle} onClick={this.props.onClick}>
            </div>
        )
      }
}

export default Boxes;