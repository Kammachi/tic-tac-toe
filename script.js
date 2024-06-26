const Game = (function () {

    const Gameboard = {
        board: ['', 'X', '', 'X', 'O', 'O', '', '', ''], 

        resetBoard: function() {
            this.board = ['', '', '', '', '', '', '', '', ''];
        },

        render: function () {
            const gameContainer = document.querySelector('.gameContainer');

            for (let position of this.board) {
                const gameSquare = document.createElement('div');
                
                gameSquare.classList.add('gameSquare');
                gameSquare.textContent = position;

                gameContainer.appendChild(gameSquare);
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

            const playerChoice = prompt('Input a number of a square:');

            Gameboard.board[playerChoice] = sign;

            sign = sign === 'X' ? 'O' : 'X';

            running = false;
        }
    }

    newGame();

})();


