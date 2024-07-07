const Game = (function () {

    const Gameboard = {
        board: [['', 'X', ''], ['X', 'O', 'O'], ['', '', '']],

        resetBoard: function() {
            this.board = [['', '', ''], ['', '', ''], ['', '', '']];
        },

        checkAvailability: function (squareId) {
            return this.board.flat()[squareId] === '';
        },

        addSign: function(squareId, signToAdd) {
            let boardFlat = this.board.flat();

            boardFlat[squareId] = signToAdd;

            let newBoard = [];
            let newRow = [];

            for (let i = 0; i < 9; i++) {

                newRow.push(boardFlat[i]);

                if ((i + 1) % 3 === 0) {
                    newBoard.push(newRow);
                    newRow = [];
                }
            }

            this.board = newBoard;
        },

        render: function () {
            const gameContainer = document.querySelector('.gameContainer');

            let currentId = 0;

            for (let row of this.board) {
                for (let cell of row) {
                    const oldSquare = document.querySelector('.gameSquare');
                    gameContainer.removeChild(oldSquare);

                    const gameSquare = document.createElement('div');
                    
                    gameSquare.id = currentId
                    gameSquare.classList.add('gameSquare');
                    gameSquare.textContent = cell;

                    gameContainer.appendChild(gameSquare);

                    currentId++;
                }
            }
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

            /* Check diagonally */

            if (["OOO", "XXX"].includes(
                board[0][0] + board[1][1] + board[2][2]) || 
                ["OOO", "XXX"].includes(
                board[0][2] + board[1][1] + board[2][0])) {

                return true;
            }

            return false;
        },

        checkFull: function() {
            return !this.board.flat().includes('');
        }
    }


    const Players = {
        players: [],

        createPlayer: function(name) {
            let score = 0;

            sign = this.players.length === 0 ? 'X' : 'O';

            this.players.push({name, sign, score});
        },

        resetScore: function() {
            for (const player of this.players) {
                player.score = 0;
            }
        },

        addScore: function(sign) {
            for (let player of this.players) {
                if (player.sign === sign) {
                    player.score++;
                    alert(`${player.name} wins`);
                }
            }
        }
    }

    Players.createPlayer('player1');
    Players.createPlayer('player2');


    function newGame() {
        Gameboard.resetBoard();
        Players.resetScore();

        let currentTurn = 'X';

        function setListener() {
            const gameSquares = document.querySelectorAll('.gameSquare');

            gameSquares.forEach((square) => {
                square.addEventListener('click', game)
            });
        }

        setListener()

        function game(event) {

            if (!Gameboard.checkAvailability(event.target.id)) {
                return;
            }
            
            Gameboard.addSign(event.target.id, currentTurn)

            Gameboard.render()

            if (Gameboard.checkWin()) {
                Players.addScore(currentTurn);

                return;
            }

            if (Gameboard.checkFull()) {
                alert('draw');

                return;
            }

            currentTurn = currentTurn === 'X' ? 'O' : 'X';

            setListener()            
        }
    }


    return {newGame};
})();


