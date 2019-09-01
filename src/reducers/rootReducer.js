const initState = {
    posts: [
        {id:'1', title: 'F', body: 'Hello', name: 'Josh'}
    ]
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
    return state;
}

export default rootReducer;