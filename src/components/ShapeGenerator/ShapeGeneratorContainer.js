import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectShape } from '../../actions/postActions';
import ShapeGeneratorItem from '../ShapeGenerator/ShapeGeneratorItem.js';
import './ShapeGenerator.css';

class ShapeGeneratorContainer extends Component {


    render() {
        return (
            <div class="shape-generator-container-wrapper">
                <div style={{width:"20px", backgroundColor:"yellow"}}></div>
                <div class="shape-generator-items-container">
                    {this.props.savedShapes.map(x => <ShapeGeneratorItem id={x.id} onClick={() => {this.props.selectShape(x.id)}} boardShape={x.boardShape}/>)}
                </div>
                <div style={{width:"20px", backgroundColor:"yellow"}}></div>
            </div>
        )
      }
}

const mapStateToProps = (state, ownProps) => {
    return {} 
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectShape: (shapeId) => { dispatch(selectShape(shapeId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShapeGeneratorContainer);