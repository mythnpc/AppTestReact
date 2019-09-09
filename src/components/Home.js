import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, toggleBox, updateBoard } from '../actions/postActions';
import Boxes from '../components/Boxes.js';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            widthSize: "20px",
        };
    }

    getValueAt(x,y){
        return this.board[(x*y)-1];
    }


    isLeftMost = (cellPosition) => {        
        if(cellPosition % this.props.boardWidth === 0){
            return true;
        } 
        return false;
    }

    isUpMost = (cellPosition) => {
        if(cellPosition - this.props.boardWidth < 0){
            return true;
        }
        return false;
    }

    isRightMost = (cellPosition) => {
        if(this.props.boardWidth - (cellPosition % this.props.boardWidth) === 1){
            return true;
        }
        return false;
    }

    isDownMost = (cellPosition) => {
        if((cellPosition + this.props.boardWidth) >= (this.props.boardWidth * this.props.boardHeight) ){
            return true;
        }
        return false;
    }

    upperLeftAlive = (cellPosition) => {
        if(this.isLeftMost(cellPosition) || this.isUpMost(cellPosition)){
            return 0;
        }

        var calculatedPosition = (cellPosition - this.props.boardWidth) - 1;
        return this.props.board[calculatedPosition].active;
    }

    upperAlive = (cellPosition) => {
        if(this.isUpMost(cellPosition)){
            return 0;
        }

        var calculatedPosition = cellPosition - this.props.boardWidth;
        return this.props.board[calculatedPosition].active;
    }

    upperRightAlive = (cellPosition) => {
        if(this.isUpMost(cellPosition) || this.isRightMost(cellPosition)){
            return 0;
        }
        var calculatedPosition = (cellPosition - this.props.boardWidth) + 1;
        return this.props.board[calculatedPosition].active; 
    }

    leftAlive = (cellPosition) => {
        if(this.isLeftMost(cellPosition)){
            return 0;
        }
        var calculatedPosition = cellPosition - 1;
        return this.props.board[calculatedPosition].active;
    }

    rightAlive = (cellPosition) => {
        if(this.isRightMost(cellPosition)){
            return 0;
        }
        var calculatedPosition = cellPosition + 1;
        return this.props.board[calculatedPosition].active;
    }

    downLeftAlive = (cellPosition) => {
        if(this.isLeftMost(cellPosition) || this.isDownMost(cellPosition)){
            return 0;
        }

        var calculatedPosition = (cellPosition + this.props.boardWidth) - 1;
        return this.props.board[calculatedPosition].active;
    }

    downAlive = (cellPosition) => {
        if(this.isDownMost(cellPosition)){
            return 0;
        }

        var calculatedPosition = (cellPosition + this.props.boardWidth);
        return this.props.board[calculatedPosition].active;
    }

    downRightAlive = (cellPosition) => {
        if(this.isRightMost(cellPosition) || this.isDownMost(cellPosition)){
            return 0;
        }

        var calculatedPosition = (cellPosition + this.props.boardWidth) + 1;
        return this.props.board[calculatedPosition].active;
    }

    calculateCellResult = (cellPosition) => {
        var isAlive = this.props.board[cellPosition].active === 1;
        
        var result = this.upperLeftAlive(cellPosition) + this.upperAlive(cellPosition) + this.upperRightAlive(cellPosition) +
                     this.leftAlive(cellPosition) + this.rightAlive(cellPosition) + 
                     this.downLeftAlive(cellPosition) + this.downAlive(cellPosition) + this.downRightAlive(cellPosition);

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

    render() {
        const width = this.state.width;
        const widthSize = this.state.widthSize;
        const bodyStyle = {
            display: "grid",
            gridTemplateColumns : `repeat(${this.props.boardWidth}, ${this.state.widthSize})`
        }
        
        const body = <div style={bodyStyle}>
                        {this.props.board.map(x => <Boxes id={x.id} active={x.active} onClick={() => {this.props.toggleBox(x.id);}}/>)}
                    </div>

        return (
            <div className="container">
                {body}
                <div><button onClick={this.updateBoardState}>Update</button></div>                
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
        updateBoard: (board) => { dispatch(updateBoard(board))}

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);