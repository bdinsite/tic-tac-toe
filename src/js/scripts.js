// RENDER GAME BOARD
(function renderBoard() {
    const boardContainer = document.querySelector('.boardContainer');
        
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

// START NEW GAME
const startButton = document.querySelector('.newGame');
startButton.addEventListener('click', newGame);

function newGame() {
    console.log('Game started');
    startGame();
}

function startGame() {
    const selectedCell = document.querySelectorAll('.boardCol button');

    selectedCell.forEach(cell => cell.addEventListener('click', clickedCell));

    function clickedCell(evt) {
        console.log(evt.target.className);
    }
    
}