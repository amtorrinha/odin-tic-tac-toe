function player (number, symbol) {
    const name = "Player" + number;
    return { name, number, symbol };
}

const gameBoard = (function () {
    const BOARD_SIZE = 9;
    const EMPTY = " ";
    const X_FILL = "X";
    const O_FILL = "O";
    boardState = Array(BOARD_SIZE).fill(EMPTY);

    const playRound = (index, symbol) => {
        cellState = boardState[index];
        console.log("CELL STATE "+ cellState);
        console.log(boardState.length);
        console.log(boardState);
        if (cellState !== EMPTY) return; // cell already used
        else {
            console.log("IM PLAYING");
            console.log(symbol);
            boardState[index] = symbol;
            console.log(index);
            console.log(boardState[index]);
            return index; // return for validation 
        }
    }

    const resetBoard = () => {
        boardState = Array(BOARD_SIZE).fill(EMPTY);
    }
    return { boardState, playRound, resetBoard };
})();

const game = (function() {
    player1 = player(1, gameBoard.X_FILL);
    player2 = player(2, gameBoard.O_FILL);
    currentPlayer = player1;

    gameBoard.resetBoard();
    const cells = document.querySelectorAll(".cell");
    // Add Click Interaction
    cells.forEach(function(cell, index) {
        cell.addEventListener('click', () => {
            playRound(index);
        });
    })

    const initGame = () => {
        //above code was inside here b4
    };

    const playRound = (index) => {
        console.log("PLAYING ROUND " + index);
        console.log(currentPlayer);
        if(gameBoard.playRound(index, currentPlayer.symbol)) {
            currentPlayer = currentPlayer === player1 ? player2 : player1; // switch player
            // check game end logic
            displayGame();
        };
    }

    const displayGame = () => {
        cells.forEach(function(cell, index) {
            cell.innerHTML = gameBoard.boardState[index];
        });
    }

    const playGame = () => {

    }
    return { initGame, displayGame, playGame };
})();

game.initGame();
game.displayGame();
// game.playGame();
