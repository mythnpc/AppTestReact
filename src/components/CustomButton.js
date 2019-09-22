import React, { Component } from 'react';
import './CustomButton.css';

class CustomButton extends Component {

    getClass(){
        return "custom-button";
    }

    render() {
        return (
            <button onClick={this.props.onClick} class={this.getClass()}>{this.props.message}</button>
        )
      }
}

export default CustomButton;