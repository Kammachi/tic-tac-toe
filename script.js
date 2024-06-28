const Game = (function () {

    const Gameboard = {
        board: [['', 'X', ''], ['X', 'O', 'O'], ['', '', '']], 

        resetBoard: function() {
            this.board = [['', '', ''], ['', '', ''], ['', '', '']];
        },
        
        checkWin: function() {
            board = this.board;
            

            for (let i = 0; i < 3; i++) {
                /* Check horizontally */

                if (["OOO", "XXX"].includes(board[i].join(''))) {
                    return true;
                } 

                /* Check vertically */

                if (["OOO", "XXX"].includes(
                    board[0][i] + board[1][i] + board[2][i])) {
                    return true;
                }
            }

            if (["OOO", "XXX"].includes(
                board[0][0] + board[1][1] + board[2][2]) || 
                ["OOO", "XXX"].includes(
                board[0][2] + board[1][1] + board[2][0])) {

                return true;
            }

            return false;
        },

        render: function () {
            const gameContainer = document.querySelector('.gameContainer');

            for (let row of this.board) {
                for (let cell of row) {
                    const gameSquare = document.createElement('div');
                    
                    gameSquare.classList.add('gameSquare');
                    gameSquare.textContent = cell;

                    gameContainer.appendChild(gameSquare);
                }
            }
        }
    }

    const Players = {
        players: [],

        createPlayer: function(name) {
            let score = 0;

            this.players.push({name, score});
        },

        resetScore: function() {
            for (const player in this.players) {
                player.score = 0;
            }
        }
    }

    
    function newGame() {
        Gameboard.resetBoard();
        Players.resetScore();

        let sign = 'X';
        let running = true;

        while (running) {
            // render()

            const playerChoiceX = prompt('x coordinate:');
            const playerChoiceY = prompt('y coordinate:');

            Gameboard.board[playerChoiceX][playerChoiceY] = sign;

            sign = sign === 'X' ? 'O' : 'X';

            if (Gameboard.checkWin()) {
                running = false;
            }

        }
    }

    newGame();

    return Gameboard.board;
})();


