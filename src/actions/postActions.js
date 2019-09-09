export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        id: id
    }
}

export const toggleBox = (id) => {
    return {
        type: 'TOGGLE_BOX',
        id: id
    }
}

export const updateBoard = (board) => {
    return {
        type: 'UPDATE_BOARD',
        board: board
    }
}