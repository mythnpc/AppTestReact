import React, { Component } from 'react';
import ShapeGeneratorItem from '../ShapeGenerator/ShapeGeneratorItem.js';
import './ShapeGenerator.css';

class ShapeGeneratorContainer extends Component {


    render() {
        return (
            <div class="shape-generator-container-wrapper">
                <div style={{width:"20px", backgroundColor:"yellow"}}></div>
                <div class="shape-generator-items-container">
                    {this.props.savedShapes.map(x => <ShapeGeneratorItem boardShape={x}/>)}
                </div>
                <div style={{width:"20px", backgroundColor:"yellow"}}></div>
            </div>
        )
      }
}

export default ShapeGeneratorContainer;