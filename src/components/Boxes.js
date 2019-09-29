import React, { Component } from 'react';
import { keyframes } from "styled-components";
import styled from 'styled-components';

class Boxes extends Component {
    getColor = () => {
        return this.props.active === 1 ? "black" : "white";
    }

    render() {
        const boxStyle = {
            backgroundColor: this.getColor(),
            minHeight: this.props.minHeight ? this.props.minHeight :"20px",
            minWidth: this.props.minWidth ? this.props.minWidth : "20px",
            outline: "1px solid lightblue" ,
            display: "inherit",
            
        }


        const rotate = keyframes`
            from {
                background-color: ${this.getColor()};
                
            }
        
            to {
                background-color: red;
                
            }
        `;

        const Overlay = styled.div`
            border: "1px solid yellow";
            opacity: 0.5;
            background-color: red;
            width: 100%;
            height: 100%;
        `;
      
        return (
            <div style={boxStyle} onMouseEnter={this.props.onMouseEnter} onClick={this.props.onClick}>
                {this.props.isMarked ? <Overlay/> : ''}
            </div>
        )
      }
}

export default Boxes;