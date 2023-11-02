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
    const remove = document.querySelectorAll('.boardCol'); // Old game board
    const h2 = document.querySelector('h2'); // Old winner message from gameOver();
    if(remove){
        remove.forEach(div => div.remove());
    };
    if(h2){
        h2.remove();
    };
    renderBoard();
    console.log('Game started');
    startGame();
}

// PLAYER
function startGame() {
    //const selectedCell = document.querySelectorAll('.boardCol div');
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
    //console.log(availableCells);
    if(availableCells.length == 0) {
        //gameOver();
        checkWinner(player);
        return true; // We want the previous step to end if this is true
    }
}

function pickRandomCell(availableCells, player) {
    const pickItem = Math.floor(Math.random()*availableCells.length);
    const arrItem = availableCells[pickItem];
    const cellTarget = document.getElementById(arrItem);
    cellTarget.textContent = 'O';
    cellTarget.classList = 'unavailable';
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
    // console.log(playerArr);
    // console.log(computerArr);
    // console.log(playerArr.length + computerArr.length);
    checkTie(playerArr, computerArr, player);
}

function checkTie(playerArr, computerArr, player) {
    if(playerArr.length + computerArr.length == 9) {
        gameOver("It's a bloody tie!");
        return;
    }
    checkTurn(player);
    //gameOver(computerArr);
}

function checkTurn(player) {
    if(player == 'Player'){
        computerMove();
    // } else if(player == 'Computer') {
    //     startGame();
    }
}

// GAME OVER
function gameOver(input) {
    const container = document.querySelector('.wrapper .container');
    const h2 = document.createElement('h2');
    const cells = document.querySelectorAll('.boardCol button');
    cells.forEach(cell => cell.disabled = true);
    h2.textContent = input;
    container.appendChild(h2);
    console.log(input);
}