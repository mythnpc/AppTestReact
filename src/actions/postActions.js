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

export const selectShape = (shapeId) => {
    return {
        type: 'SELECT_SHAPE',
        shapeId: shapeId
    }
}

export const applySelectedShape = (boardState) => {
    return {
        type: 'APPLY_SELECTED_SHAPE',
        boardState: boardState
    }
}