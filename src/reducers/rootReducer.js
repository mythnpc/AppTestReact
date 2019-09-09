const initState = {
    posts: [{id:'1', title: 'F', body: 'Hello', name: 'Josh'}],
    board: generateBoard(10, 10),
    boardWidth: 10,
    boardHeight: 10
}

function generateBoard(x, y){
    var array = [];
    
    for (var i = 1; i <= x*y; i++) {
        var obj = {
            id: i,
            active: Math.round(Math.random())
        } 
        array.push(obj);
    }

    return array;
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'DELETE_POST'){
        let newPosts = state.posts.filter(post => {
            return action.id !== post.id;
        });
        return {
            ...state,
            posts: newPosts
        }
    }

    if(action.type === 'TOGGLE_BOX'){
        var x = state.board.map((item, index) => {
            if(item.id === action.id){
                item.active = (item.active === 0) ? 1 : 0;
            }        
            // Leave every other item unchanged
            return item;
          });
        return {
            ...state,
            board: x
        }
    }

    if(action.type === 'UPDATE_BOARD'){
        return {
            ...state,
            board: action.board
        }
    }
    return state;
}

export default rootReducer;