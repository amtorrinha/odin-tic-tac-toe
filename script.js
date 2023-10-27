function player (number, name, symbol) {
    return { number, name, symbol };
}

const gameBoard = (function () {
    const BOARD_SIZE = 9;
    const EMPTY = " ";
    const X_FILL = "X";
    const O_FILL = "O";

    let boardState = Array(BOARD_SIZE).fill(EMPTY);

    const playRound = (index, symbol) => {
        cellState = boardState[index];
        if (cellState !== EMPTY) return; // cell already used
        else {
            boardState[index] = symbol;
            return symbol; // return for validation 
        }
    }

    const getCellState = (index=undefined) => {
        if(index !== undefined) return boardState[index];
        else return boardState;
    }

    const isFinished = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] === EMPTY) continue;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        if (!boardState.includes(EMPTY)) return EMPTY; // It's a tie!
    }

    const resetBoard = () => {
        boardState = Array(BOARD_SIZE).fill(EMPTY);
    }

    return { EMPTY, X_FILL, O_FILL, getCellState, playRound, isFinished, resetBoard };
})();

const game = (function() {
    let player1;
    let player2;
    let currentPlayer = player1;
    let isActive = false;

    const cells = document.querySelectorAll(".cell");
    // Add Click Interaction
    cells.forEach(function(cell, index) {
        cell.addEventListener('click', () => {
            playRound(index);
        });
    })

    const form = document.getElementById('myForm');
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        initGame();
        
        var elements = form.elements;
        // Disable each form element
        for (var i = 0; i < elements.length; i++) {
            elements[i].disabled = true;
        }
    });

    const resetBtn = document.querySelector(".reset-btn");
    resetBtn.addEventListener("click", function() {
        resetGame();
    });

    const initGame = () => {
        gameBoard.resetBoard();
        name1 = document.getElementById('player1').value;
        name2 = document.getElementById('player2').value;
        player1 = player(1, name1, gameBoard.X_FILL);
        player2 = player(2, name2, gameBoard.O_FILL);
        currentPlayer = player1;
        isActive = true;
    };

    const playRound = (index) => {
        if (!isActive) return;
        if(gameBoard.playRound(index, currentPlayer.symbol)) {
            displayGame();
            // Checks game end
            isFinished = gameBoard.isFinished();
            if (isFinished) {
                if (isFinished === gameBoard.EMPTY) endGame(true);
                else endGame();
            }
            currentPlayer = (currentPlayer === player1) ? player2 : player1; // switch player
        };
    }

    const displayGame = () => {
        cells.forEach(function(cell, index) {
            cell.innerHTML = gameBoard.getCellState(index);
        });
    }

    const endGame = (tie = false) => {
        if (tie) alert("It's a tie!");
        else alert(`Game Finished. ${currentPlayer.name} wins!`);
        setTimeout(function() { resetGame(); }, 1000);
    }

    const resetGame = () => {
        currentPlayer = player1;
        gameBoard.resetBoard();
        displayGame();
    }

    return { initGame, displayGame};
})();

