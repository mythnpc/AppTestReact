import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, toggleBox, updateBoard, cleanBoard, saveShape, applySelectedShape } from '../actions/postActions';
import Boxes from '../components/Boxes.js';
import CustomButton from '../components/CustomButton.js';
import utility from './Utility.js'
import ShapeGeneratorContainer from '../components/ShapeGenerator/ShapeGeneratorContainer.js'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            widthSize: "20px",
            marked: [],
            intervalId: 0,
            clickState: 0,
            clickStates: ["Point", "Shape", "Capture"]
        };
    }

    toggleClickState = () => {
        this.setState({clickState: (this.state.clickState + 1)%3, marked:[] });   
     }

     cleanBoard = () => {
         this.props.cleanBoard();
     }

    calculateCellResult = (cellPosition) => {
        var util = utility(this.props.boardWidth, this.props.boardHeight);
        var isAlive = this.props.board[cellPosition].active === 1;
        
        var adjacentCells = util.getAdjacentCells(cellPosition);
        var result = 0;
        for(var x in adjacentCells){
            result = result + this.props.board[adjacentCells[x]].active;
        }

        var state = 0;
        if(!isAlive && result === 3){
            state =  1;
        }

        if(isAlive && result <= 1){
            state = 0;
        }

        if(isAlive && result >= 4){
            state = 0
        }

        if(isAlive && (result === 2 || result === 3)){
            state = 1;
        }
        return state;
    }
    
    emptyBoard = () => {

    }

    updateBoardStateInterval = () => {
        if(this.state.intervalId === 0){
            var intervalId = setInterval(() => this.updateBoardState(), 200);
            this.setState({intervalId: intervalId});
        }else {
            clearInterval(this.state.intervalId);
            this.setState({intervalId: 0});
        }
    }

    updateBoardState = () => {
        var temp = this.props.board;
        var newBoard = [];
        for(let i = 0; i < temp.length; i++){
            var obj = {
                id: i,
                active: this.calculateCellResult(i)
            }
            newBoard.push(obj);
        }

        this.props.updateBoard(newBoard);
    }

    isMarked = (id) => {
      if(this.state.marked.findIndex(x => x === (id)) >= 0){
          return true;
      }
    }

    setMarked = (cellId) => {
        var util = utility(this.props.boardWidth, this.props.boardHeight);        
        this.setState({marked: util.getMooreCells(util.getPositionX(cellId), util.getPositionY(cellId))});
    }

    saveShape = (cellId) => {
        var util = utility(this.props.boardWidth, this.props.boardHeight);   
        this.props.saveShape(util.captureCellsState(util.getPositionX(cellId), util.getPositionY(cellId), this.props.board));
    }

    onBoxClick = (cellId) => {

        if(this.state.clickStates[this.state.clickState] === "Point"){
            this.props.toggleBox(cellId);
        }

        if(this.state.clickStates[this.state.clickState] === "Shape"){
            var util = utility(this.props.boardWidth, this.props.boardHeight);   
            
            var selectedShapeBoardState = this.props.savedShapes[this.props.selectedShapeId].boardShape;

            //Gets all affected cell location, eg : 21 22 23 24 25 and replace the value with the savedShape's corresponding 0 1 2 3 4
            var arrayOfAffectedCells = util.getMooreCells(util.getPositionX(cellId), util.getPositionY(cellId), this.props.board);

            for(var i =0; i < arrayOfAffectedCells.length; i++){
                var cellId = arrayOfAffectedCells[i];
                var activeState = selectedShapeBoardState[i].active;
                this.props.board[cellId].active = activeState;
            }

            this.props.applySelectedShape(this.props.board);
        }

        if(this.state.clickStates[this.state.clickState] === "Capture"){
            this.saveShape(cellId)
        }
    }

    render() {
        const width = this.state.width;
        const widthSize = this.state.widthSize;
        const bodyStyle = {
            display: "grid",
            gridTemplateColumns : `repeat(${this.props.boardWidth}, ${this.state.widthSize})`,
            justifyContent: `center`
        }
        
        const body = <div style={{display: "grid", gridTemplateColumns : `repeat(${this.props.boardWidth}, ${this.state.widthSize})`, justifyContent: `center`, margin:"10px"}}>
                        {this.props.board.map(x => <Boxes id={x.id} 
                                                          active={x.active} 
                                                          isMarked={this.isMarked(x.id)} 
                                                          onMouseEnter={() => {this.setMarked(x.id)}}
                                                          onClick={() => {this.onBoxClick(x.id)}}
                                                          />)}
                    </div>

        const buttonContainer = <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <CustomButton onClick={this.toggleClickState} message={this.state.clickStates[this.state.clickState]}/>
                                    <CustomButton onClick={this.updateBoardStateInterval} message="Update" className={this.state.intervalId != 0 ? "on": "off"}/>
                                    <CustomButton onClick={this.cleanBoard} message="Clear"/>
                                </div>               

        return (
            <div style={{width: "80%", margin:"20px"}}>
                <ShapeGeneratorContainer savedShapes={this.props.savedShapes}></ShapeGeneratorContainer>
                {body}
                {buttonContainer}
            </div>
        )
      }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.postId;
    return {
        post: state.posts.find(post => post.id === id),
        board: state.board,
        boardWidth: state.boardWidth,
        boardHeight: state.boardHeight,
        savedShapes: state.savedShapes,
        selectedShapeId: state.selectedShapeId
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => { dispatch(deletePost(id))},
        toggleBox: (id) => { dispatch(toggleBox(id))},
        updateBoard: (board) => { dispatch(updateBoard(board))},
        cleanBoard: (board) => { dispatch(cleanBoard())},
        saveShape: (boardShape) => { dispatch(saveShape(boardShape))},
        applySelectedShape: (boardState) => {dispatch(applySelectedShape(boardState))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);