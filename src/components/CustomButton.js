import React, { Component } from 'react';
import './CustomButton.css';

class CustomButton extends Component {

    getClass(){
        var className = this.props.className;
        return className ? className + " custom-button" : "custom-button";
    }

    render() {
        return (
            <button onClick={this.props.onClick} class={this.getClass()}>{this.props.message}</button>
        )
      }
}

export default CustomButton;