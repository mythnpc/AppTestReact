import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions/postActions';
import Boxes from '../components/Boxes.js';

class Home extends Component {
    handleClick = () => {
        this.props.deletePost(this.props.postId);
    }

    render() {
        console.log(this.props);
        const post = this.props.post ? (
            <div>
                <p>{this.props.post.body}</p>
                <button onClick={this.handleClick}>Delete Post</button>
                <div style={{display:"grid",   gridTemplateColumns: "repeat(5, 10px)"}}>

                </div>

            </div>
        ) : (
            <div className="center">Loading post...</div>
        )

        return (
            <div className="container">
                {post}
            </div>
        )
      }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.postId;
    return {
        post: state.posts.find(post => post.id === id)
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => { dispatch(deletePost(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);