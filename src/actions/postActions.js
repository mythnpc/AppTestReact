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

export const cleanBoard = (board) => {
    return {
        type: 'CLEAN_BOARD',
        board: board
    }
}

export const saveShape = (boardShape) => {
    return {
        type: 'SAVE_SHAPE',
        boardShape: boardShape
    }
}