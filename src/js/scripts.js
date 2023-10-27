// RENDER GAME BOARD
function renderBoard() {
    const boardContainer = document.querySelector('.boardContainer');
        
    let rows = 3;
    let cols = 3;

    for(i=0; i<cols; i++) {
        const boardCol = document.createElement('div');
        boardCol.classList.add('boardCol');
        
        for(j=0; j<rows; j++) {
            const cell = document.createElement('div');
            cell.id = `${i}${j}`;
            boardCol.appendChild(cell);
            boardContainer.appendChild(boardCol);
        }
    }

}

// START NEW GAME
const startButton = document.querySelector('.newGame');
startButton.addEventListener('click', newGame);

function newGame() {
    const remove = document.querySelectorAll('.boardCol');
    if(remove){
        remove.forEach(div => div.remove());
    };
    renderBoard();
    console.log('Game started');
    startGame();
}

function startGame() {
    const selectedCell = document.querySelectorAll('.boardCol div');

    selectedCell.forEach(cell => cell.addEventListener('click', clickedCell));

    function clickedCell(evt) {
        evt.target.textContent = 'X';
        computerMove();
    }
    
}

function computerMove() {
    console.log('Computer is thinking...');
    const selectedCell = document.querySelectorAll('.boardCol div');
    const availableCells = [];

    // Look for empty cell
    selectedCell.forEach(cell => {
        if(cell.textContent == '') {
            availableCells.push(cell.id);
        }
    });

    // Pick random empty cell
    if(availableCells.length > 0) {
    const pickItem = Math.floor(Math.random()*availableCells.length);
    const arrItem = availableCells[pickItem];
    const cellTarget = document.getElementById(arrItem);
    cellTarget.textContent = 'O';
    } else {
        gameOver();
    }
}

function gameOver() {
    console.log("That's all, folks!")
}