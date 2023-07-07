const gameBoard = (() =>{
    // puts input into array
    boardArray = new Array(9);

    const setSquare = (index, playerSign) => {
        boardArray[index] = playerSign.toUpperCase();
    };

    const getSquare = (index) => {
        boardArray[index];
    };

    const clear = () => {
        boardArray = undefined;
        boardArray = new Array(9);
    };
    
    return{
        setSquare,
        getSquare,
        clear
    }
})();

const player = (sign) =>{
    // takes input
    // stores score
    let score = 0;

    const takeInput = (index, sign) => {
        gameBoard.setSquare(index, sign);
    };

    const incrementScore = () => {
        ++score;
    };

    const getScore = () => {
        score;
    };

    const getSign = () => {
        sign;
    };

    return {getScore, incrementScore, takeInput, getSign};
};

const gameController = (() =>{
    let roundCount = 0;
    let whosTurn;
    let winner;
    const playerOne = player("X");
    const playerTwo = player("O");

    const checkRows = () =>{
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = i * 3; j < i * 3 + 3; j++) {
                row.push(gameBoard.getSquare[j]);
            }
            
            if(row.every( square => square == row[0])) return true;
        }
        return false
    };

    const checkColumns = () =>{
        for (let i = 0; i < 3; i++) {
            let column = [];
            for (let j = i; j < i + 7; j + 3) {
                column.push(gameBoard.getSquare[j]);
            }
            
            if(column.every( square => square == column[0])) return true;
        }
        return false
    };

    const checkDiagonals = () => {
        if(gameBoard.getSquare[0] == gameBoard.getSquare[4] == gameBoard.getSquare[8]) return true;
        else if(gameBoard.getSquare[2] == gameBoard.getSquare[4] == gameBoard.getSquare[6]) return true;
        return false;
    }

    const isWin = () => {
        if(checkColumns == true || checkRows == true || checkDiagonals == true) return true;
        return false;
    };

    const end = () => {
        return winner == whosTurn;
    };

    const declareNewRound = () => {
        if(isWin) return end;
        ++roundCount;
        if(whosTurn == playerOne.getSign()){
            whosTurn == playerTwo.getSign();
        }
        else{
            whosTurn == playerOne.getSign();
        }
    };

    const getWhosTurn = () => {
        whosTurn;
    }

    return{
        getWhosTurn,
        declareNewRound,
        roundCount
    };
    // track whos round
    // check if win
})();

const screenController = (() =>{
    const DOMgameBoard = document.getElementById("game-board");
    // displays gameboard
    // updates gameboard
    // displays whos turn it is
    // show if a win has occured
})();