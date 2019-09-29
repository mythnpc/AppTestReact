import React, { Component } from 'react';
import { keyframes } from "styled-components";
import styled from 'styled-components';
import Boxes from '../Boxes.js';

class ShapeGeneratorItem extends Component {

    render() {
        console.log(this.props.boardShape);
        const body = <div class="shape-generator-item" style={{display: "grid", gridTemplateColumns : `repeat(5, 10px)`, justifyContent: `center`, margin:"10px"}}>
                        {this.props.boardShape.map(x => <Boxes id={x.id} active={x.active} minWidth="10px" minHeight="10px"/>)}
                    </div>
        return (
            <div onClick={this.props.onClick} class="shape-generator-item-wrapper">{body}</div>
        )
      }
}

export default ShapeGeneratorItem;