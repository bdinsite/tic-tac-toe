(function renderBoard() {
    const boardContainer = document.querySelector('.boardContainer');

    const boardRow = document.createElement('div');
    boardRow.classList.add('boardRow');
        
    let rows = 3;
    let cols = 3;

    for(i=0; i<cols; i++) {
        const boardCol = document.createElement('div');
        boardCol.classList.add('boardCol');
        
        for(j=0; j<rows; j++) {
            const cell = document.createElement('button');
            cell.classList.add(`${i}${j}`);
            boardCol.appendChild(cell);
            boardContainer.appendChild(boardCol);
        }
    }

})();