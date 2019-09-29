export default function utility(_boardWidth, _boardHeight){
    let boardWidth = _boardWidth;
    let boardHeight = _boardHeight;

    var isLeftMost = (cellPosition) => {
        if (cellPosition % boardWidth === 0) {
            return true;
        }
        return false;
    }

    var isUpMost = (cellPosition) => {
        if (cellPosition - boardWidth < 0) {
            return true;
        }
        return false;
    }

    var isRightMost = (cellPosition) => {
        if (boardWidth - (cellPosition % boardWidth) === 1) {
            return true;
        }
        return false;
    }

    var isDownMost = (cellPosition) => {
        if ((cellPosition + boardWidth) >= (boardWidth * boardHeight)) {
            return true;
        }
        return false;
    }

    var wrapsAroundTop = (cellPosition) => {
        return cellPosition + (boardWidth * (boardHeight - 1));
    }

    var wrapsAroundLeft = (cellPosition) => {
        return cellPosition + (boardWidth - 1);
    }

    var wrapsAroundRight = (cellPosition) => {
        return cellPosition - (boardWidth - 1);
    }

    var wrapsAroundBottom = (cellPosition) => {
        return cellPosition - (boardWidth * (boardHeight - 1));
    }

    var upperLeftAlive = (cellPosition) => {
        var calculatedPosition = (cellPosition - boardWidth) - 1;

        if (isLeftMost(cellPosition) && isUpMost(cellPosition)) {
            calculatedPosition = wrapsAroundLeft(wrapsAroundTop(cellPosition));
        } else if (isLeftMost(cellPosition)) {
            calculatedPosition = wrapsAroundLeft(cellPosition) - boardWidth;
        } else if (isUpMost(cellPosition)) {
            calculatedPosition = wrapsAroundTop(cellPosition) - 1;
        }

        return calculatedPosition;
    }

    var upperAlive = (cellPosition) => {
        var calculatedPosition = cellPosition - boardWidth;

        if (isUpMost(cellPosition)) {
            calculatedPosition = wrapsAroundTop(cellPosition);
        }

        return calculatedPosition;
    }

    var upperRightAlive = (cellPosition) => {
        var calculatedPosition = (cellPosition - boardWidth) + 1;

        if (isUpMost(cellPosition) && isRightMost(cellPosition)) {
            calculatedPosition = wrapsAroundRight(wrapsAroundTop(cellPosition));
        } else if (isRightMost(cellPosition)) {
            calculatedPosition = wrapsAroundRight(cellPosition) - boardWidth;
        } else if (isUpMost(cellPosition)) {
            calculatedPosition = wrapsAroundTop(cellPosition) + 1;
        }

        return calculatedPosition;
    }

    var leftAlive = (cellPosition) => {
        var calculatedPosition = cellPosition - 1;

        if (isLeftMost(cellPosition)) {
            calculatedPosition = wrapsAroundLeft(cellPosition);
        }
        return calculatedPosition;
    }

    var rightAlive = (cellPosition) => {
        var calculatedPosition = cellPosition + 1;

        if (isRightMost(cellPosition)) {
            calculatedPosition = wrapsAroundRight(cellPosition);
        }
        return calculatedPosition;
    }

    var downLeftAlive = (cellPosition) => {
        var calculatedPosition = (cellPosition + boardWidth) - 1;

        if (isLeftMost(cellPosition) && isDownMost(cellPosition)) {
            calculatedPosition = wrapsAroundLeft(wrapsAroundBottom(cellPosition));
        } else if (isLeftMost(cellPosition)) {
            calculatedPosition = wrapsAroundLeft(cellPosition) + boardWidth;
        } else if (isDownMost(cellPosition)) {
            calculatedPosition = wrapsAroundBottom(cellPosition) - 1;
        }

        return calculatedPosition;
    }

    var downAlive = (cellPosition) => {
        var calculatedPosition = (cellPosition + boardWidth);

        if (isDownMost(cellPosition)) {
            calculatedPosition = wrapsAroundBottom(cellPosition);
        }

        return calculatedPosition;
    }

    var downRightAlive = (cellPosition) => {
        var calculatedPosition = (cellPosition + boardWidth) + 1;

        if (isRightMost(cellPosition) && isDownMost(cellPosition)) {
            calculatedPosition = wrapsAroundRight(wrapsAroundBottom(cellPosition));
        } else if (isRightMost(cellPosition)) {
            calculatedPosition = wrapsAroundRight(cellPosition) + boardWidth;
        } else if (isDownMost(cellPosition)) {
            calculatedPosition = wrapsAroundBottom(cellPosition) + 1;
        }

        return calculatedPosition;
    }

    var getAdjacentCells = (cellPosition) => {
        var arrayOfAdjacentCells = [];
        arrayOfAdjacentCells.push(upperLeftAlive(cellPosition));
        arrayOfAdjacentCells.push(upperAlive(cellPosition));
        arrayOfAdjacentCells.push(upperRightAlive(cellPosition));

        arrayOfAdjacentCells.push(leftAlive(cellPosition));
        arrayOfAdjacentCells.push(rightAlive(cellPosition));

        arrayOfAdjacentCells.push(downLeftAlive(cellPosition));
        arrayOfAdjacentCells.push(downAlive(cellPosition));
        arrayOfAdjacentCells.push(downRightAlive(cellPosition));

        return arrayOfAdjacentCells;
    }

    var getConnectedCells = (cellPosition, board) => {
        var arrayOfConnectedCells = [];

        function _getActiveAdjacentCells(cellPosition){
            let activeAdjacentCells = [];

            var adjacentCells = getAdjacentCells(cellPosition);

            for(var i = 0; i < adjacentCells.length; i++){
                
                var cell = adjacentCells[i];

                if(board[cell].active){
                    activeAdjacentCells.push(cell);
                }
            }

            return activeAdjacentCells;
        }

        function _getConnectedCells(cellPosition){
            var activeAdjacentCells = _getActiveAdjacentCells(cellPosition);

            if(activeAdjacentCells === undefined){
                console.log(cellPosition);
            }

            for(var i = 0; i < activeAdjacentCells.length; i++){
                //if this cell is not listed in the array of connected cell then add it and recursively look for other parts surrounding it
                if(!arrayOfConnectedCells.includes(activeAdjacentCells[i])){
                    arrayOfConnectedCells.push(activeAdjacentCells[i]);
                    _getConnectedCells(activeAdjacentCells[i]);
                }
            }
        }

        _getConnectedCells(cellPosition);
        return arrayOfConnectedCells;
    }

    function getPosition(x,y){
        return (y*_boardWidth) + x;
    }

    function getPositionX(cellPosition){
        return cellPosition % _boardWidth;
    }

    
    function getPositionY(cellPosition){
        return Math.floor(cellPosition/_boardWidth);
    }

    function getMooreCells(cellPositionX, cellPositionY){
        var arrayCell = [];
        for(var y = cellPositionY - 2; y <= cellPositionY + 2; y++){
            for(var x = cellPositionX - 2; x <= cellPositionX + 2; x++){
                arrayCell.push(getPosition(x,y));
            }
        }
        return arrayCell;
    }

    function captureCellsState(cellPositionX, cellPositionY, board){
        var cellPositions = getMooreCells(cellPositionX, cellPositionY);
        var arrayOfCellsState = [];
        
        for(var i = 0; i < cellPositions.length; i++ ){
            var obj = {
                id: i,
                active: board[cellPositions[i]].active
            }
            arrayOfCellsState.push(obj);
        }
        return arrayOfCellsState;
    }

    return {
        getAdjacentCells: getAdjacentCells,
        getConnectedCells: getConnectedCells,
        getMooreCells: getMooreCells,
        getPositionX: getPositionX,
        getPositionY: getPositionY,
        captureCellsState: captureCellsState
    }
};