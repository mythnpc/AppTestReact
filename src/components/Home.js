import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, toggleBox, updateBoard, cleanBoard } from '../actions/postActions';
import Boxes from '../components/Boxes.js';
import CustomButton from '../components/CustomButton.js';
import utility from './Utility.js'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            widthSize: "20px",
            marked: [],
            intervalId: 0,
            clickState: true
        };
    }

    toggleClickState = () => {
        var temp = this.state.clickState;
        this.setState({clickState: !temp, marked:[] });   
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
            console.log(intervalId);
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
                id: i+1,
                active: this.calculateCellResult(i)
            }
            newBoard.push(obj);
        }

        this.props.updateBoard(newBoard);
    }

    isMarked = (id) => {
      if(this.state.marked.findIndex(x => x === (id-1)) >= 0){
          return true;
      }
    }

    setMarked = (cellId) => {
        var util = utility(this.props.boardWidth, this.props.boardHeight);        
        if(this.props.board[cellId-1].active){
            this.setState({marked: util.getConnectedCells(cellId - 1, this.props.board)});
        }else {
            this.setState({marked: []});
        }
    }

    render() {
        const width = this.state.width;
        const widthSize = this.state.widthSize;
        const bodyStyle = {
            display: "grid",
            gridTemplateColumns : `repeat(${this.props.boardWidth}, ${this.state.widthSize})`
        }
        
        const body = <div style={bodyStyle}>
                        {this.props.board.map(x => <Boxes id={x.id} 
                                                          active={x.active} 
                                                          isMarked={this.isMarked(x.id)} 
                                                          /* onClick={() => this.setMarked(x.id)}  */
                                                          onClick={() => {this.state.clickState ? this.props.toggleBox(x.id): this.setMarked(x.id)}}
                                                          />)}
                    </div>

        const buttonContainer = <div style={{display:"flex", justifyContent:"space-between", margin:"10px"}}>
                                    <CustomButton onClick={this.updateBoardStateInterval} message="Update"/>
                                    <CustomButton onClick={this.toggleClickState} message={this.state.clickState ? "Activate" : "Adjacent"}/>
                                    <CustomButton onClick={this.cleanBoard} message="Clear"/>
                                </div>               

        return (
            <div className="container">
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
        boardHeight: state.boardHeight
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => { dispatch(deletePost(id))},
        toggleBox: (id) => { dispatch(toggleBox(id))},
        updateBoard: (board) => { dispatch(updateBoard(board))},
        cleanBoard: (board) => { dispatch(cleanBoard())}

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);