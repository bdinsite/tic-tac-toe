// RENDER GAME BOARD
function renderBoard() {
    const boardContainer = document.querySelector('.boardContainer');
        
    let rows = 3;
    let cols = 3;

    for(i=0; i<cols; i++) {
        const boardCol = document.createElement('div');
        boardCol.classList.add('boardCol');
        
        for(j=0; j<rows; j++) {
            const cell = document.createElement('button'); // Switch to button as div cannot be disabled
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
    const selectedCell = document.querySelectorAll('.boardCol button');

    selectedCell.forEach(cell => cell.addEventListener('click', clickedCell));

    function clickedCell(evt) {
        evt.target.textContent = 'X';
        evt.target.classList = 'unavailable';
        evt.target.disabled = true;
        //computerMove();
        checkWinner('Player');
    }
    
}

// COMPUTER
function computerMove() {
    console.log('Computer is thinking...');
    //const selectedCell = document.querySelectorAll('.boardCol div');
    const selectedCell = document.querySelectorAll('.boardCol button');
    const availableCells = [];

    // Look for empty cell
    selectedCell.forEach(cell => {
        if(cell.textContent == '') {
            availableCells.push(cell.id);
        }
    });

    // Pick random empty cell
    if(!emptyCells(availableCells, 'Computer')){
        pickRandomCell(availableCells, 'Computer');
    };
}

function emptyCells(availableCells, player) {
    if(availableCells.length == 0) {
        checkWinner(player);
        return true;
    }
}

function pickRandomCell(availableCells, player) {
    const pickItem = Math.floor(Math.random()*availableCells.length);
    const arrItem = availableCells[pickItem];
    const cellTarget = document.getElementById(arrItem);
    cellTarget.textContent = 'O';
    cellTarget.disabled = true;
    checkWinner(player);
}


// CHECK WINNER
function checkWinner(player) {
    const playerArr = [];
    const computerArr = [];
    const cellContent = document.querySelectorAll('.boardCol button');
    cellContent.forEach(cell => {
        if(cell.textContent == 'X'){
            playerArr.push(cell.id);
        } else if(cell.textContent == 'O'){
            computerArr.push(cell.id);
        }
    });
    checkArray(playerArr, computerArr, player);
    //console.log(playerArr);    
}

function checkArray(playerArr, computerArr, player) {
    if(playerArr.includes("00") && 
        ((playerArr.includes("01") && playerArr.includes("02")) ||
        (playerArr.includes("10") && playerArr.includes("20")) ||
        (playerArr.includes("11") && playerArr.includes("22")))) {
            gameOver('Player wins!');
            return;
        }
    else if(playerArr.includes("10") &&
        playerArr.includes("11") &&
        playerArr.includes("12")) {
            gameOver('Player wins!');
            return;
        }
    else if(playerArr.includes("20") &&
        playerArr.includes("21") &&
        playerArr.includes("22")) {
            gameOver('Player wins!');
            return;
        }
    else if(playerArr.includes("01") &&
        playerArr.includes("11") &&
        playerArr.includes("21")) {
            gameOver('Player wins!');
            return;
        }   
    else if(playerArr.includes("02") && 
        ((playerArr.includes("12") && playerArr.includes("22")) ||
        (playerArr.includes("11") && playerArr.includes("20")))) {
            gameOver('Player wins!');
            return;
        }

    else if(computerArr.includes("00") && 
        ((computerArr.includes("01") && computerArr.includes("02")) ||
        (computerArr.includes("10") && computerArr.includes("20")) ||
        (computerArr.includes("11") && computerArr.includes("22")))) {
            gameOver('Computer wins!');
            return;
        }
    else if(computerArr.includes("10") &&
        computerArr.includes("11") &&
        computerArr.includes("12")) {
            gameOver('Computer wins!');
            return;
        }
    else if(computerArr.includes("20") &&
        computerArr.includes("21") &&
        computerArr.includes("22")) {
            gameOver('Computer wins!');
            return;
        }
    else if(computerArr.includes("01") &&
        computerArr.includes("11") &&
        computerArr.includes("21")) {
            gameOver('Computer wins!');
            return;
        }
    else if(computerArr.includes("02") && 
        ((computerArr.includes("12") && computerArr.includes("22")) ||
        (computerArr.includes("11") && computerArr.includes("20")))) {
            gameOver('Computer wins!');
            return;
        }
    ;
    checkTie(playerArr, computerArr, player);
}

function checkTie(playerArr, computerArr, player) {
    if(playerArr.length + computerArr.lengt == 12) {
        gameOver("It's a bloody tie!");
    }
    checkTurn(player);
}

function checkTurn(player) {
    if(player == 'Player'){
        computerMove();
    }
}

function gameOver(input) {
    const cells = document.querySelectorAll('.boardCol button');
    cells.forEach(cell => cell.disabled = true);
    console.log(input);
}