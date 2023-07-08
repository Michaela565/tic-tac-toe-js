const gameBoard = (() =>{
    // creates the game board
    // stores data in it
    boardArray = new Array(9);

    const setSquare = (index, playerSign) => {
        boardArray[index] = playerSign.toUpperCase();
    };

    const getSquare = (index) => {
        return boardArray[index];
    };

    const clear = () => {
        boardArray = undefined;
        boardArray = new Array(9);
    };
    
    const checkIfAllFilled = () =>{
        return !boardArray.includes(undefined);
    };

    return{
        setSquare,
        getSquare,
        clear,
        checkIfAllFilled
    }
})();

const player = (sign) =>{
    // takes input
    // stores score
    let score = 0;
    const _sign = sign;

    const takeInput = (index) => {
        gameBoard.setSquare(index, _sign);
    };

    const incrementScore = () => {
        ++score;
    };

    const getScore = () => {
        return score;
    };

    const getSign = () => {
        return _sign;
    };

    return {getScore, incrementScore, takeInput, getSign};
};

const gameController = (() =>{
    let whosTurn = "X";
    const playerOne = player("X");
    const playerTwo = player("O");

    const checkRows = () =>{
        for (let i = 0; i < 3; i++) {
            let row =[];
            for (let j = i * 3; j < i * 3 + 3; j++) {
                row.push(gameBoard.getSquare(j));
            }
            if(row.every( square => square == undefined)) return false;
            if(row.every( square => square == row[0])) return true;
        }
        return false
    };

    const checkColumns = () =>{
        for (let i = 0; i < 3; i++) {
            let column = [];
            for (let j = i; j < i + 7; j += 3) {
                column.push(gameBoard.getSquare(j));
            }
            
            if(column.every( square => square == undefined)) return false;
            if(column.every( square => square == column[0])) return true;
        }
        return false
    };

    const checkDiagonals = () => {
        const diagonalOne = [gameBoard.getSquare(0), gameBoard.getSquare(4), gameBoard.getSquare(8)];
        const diagonalTwo = [gameBoard.getSquare(2), gameBoard.getSquare(4), gameBoard.getSquare(6)];
        if(diagonalOne.every( square => square == undefined)) return false;
        if(diagonalOne.every( square => square == diagonalOne[0])) return true;
        if(diagonalTwo.every( square => square == undefined)) return false;
        if(diagonalTwo.every( square => square == diagonalTwo[0])) return true;
        return false;
    }

    const isWin = () => {
        if(checkRows() || checkColumns() || checkDiagonals()) return true;
        return false;
    };

    const end = () => {
        if(whosTurn == playerOne.getSign()){
            playerOne.incrementScore();
            screenController.changeScore(playerOne.getSign(), playerOne.getScore());
        }
        else{
            playerTwo.incrementScore();
            screenController.changeScore(playerTwo.getSign(), playerTwo.getScore());
        }
        screenController.changeWhoWon(whosTurn);
        screenController.giveRestartEventListeners();
        return;
    };

    const noWinEnd = () => {
        screenController.giveRestartEventListeners();
    };

    const declareNewRound = () => {
        if(whosTurn == playerOne.getSign()){
            whosTurn = playerTwo.getSign();
        }
        else{
            whosTurn = playerOne.getSign();
        }
    };

    const getWhosTurn = () => {
        return whosTurn;
    };

    const playRound = (e) => {
        screenController.changeWhosTurn(getWhosTurn());
        declareNewRound();
        if(whosTurn == "X"){
            playerOne.takeInput(e.target.dataset.index);
        }
        else{
            playerTwo.takeInput(e.target.dataset.index);
        }
        screenController.changeSign(e.target, whosTurn);
        if(isWin()) end();
        screenController.removeEventListenerFromABox(e.target, 'click', playRound);
        if(gameBoard.checkIfAllFilled()) noWinEnd();
    };


    return{
        getWhosTurn,
        playRound
    };
    // track whos round
    // check if win
})();

const screenController = (() =>{
    const DOMboardBoxes = document.querySelectorAll(".board-box");
    const DOMwhosTurn = document.querySelector(".whos-turn");
    const DOMwhoWon = document.querySelector(".who-won");
    const DOMscoreOne = document.getElementById("score-one");
    const DOMscoreTwo = document.getElementById("score-two");
    
    const addEventListenersToBoxes = (eventType, functionToExecute) => {
        DOMboardBoxes.forEach( box => box.addEventListener(eventType, functionToExecute));
    };

    const removeEventListenersFromBoxes =  (eventType, functionToExecute) => {
        DOMboardBoxes.forEach( box => box.removeEventListener(eventType, functionToExecute));
    };

    const removeEventListenerFromABox = (box, eventType, functionToExecute) => {
        box.removeEventListener(eventType, functionToExecute);
    }

    const changeScore = (sign, score) => {
        if(sign == "X") DOMscoreOne.innerHTML = `X score: ${score}`;
        else DOMscoreTwo.innerHTML = `O score: ${score}`;
    };

    const changeSign = (box, sign) => {
        box.innerHTML = sign;
    };

    const changeWhosTurn = (sign) => {
        DOMwhosTurn.innerHTML = `It's ${sign} turn`;
    };

    const changeWhoWon = (sign) => {
        DOMwhoWon.innerHTML = `${sign} won`;
    };

    const giveRestartEventListeners = () => {
        removeEventListenersFromBoxes('click', gameController.playRound);
        addEventListenersToBoxes('click', restart);
    };

    const removeRestartEvenListeners = () => {
        removeEventListenersFromBoxes('click', restart);
    };

    const restart = () => {
        gameBoard.clear();
        changeWhoWon("No one");
        DOMboardBoxes.forEach( box => box.innerHTML = "");
        removeRestartEvenListeners();
        addEventListenersToBoxes('click', gameController.playRound);
    };

    addEventListenersToBoxes('click', gameController.playRound);

    return{
        removeEventListenerFromABox,
        changeSign,
        changeWhosTurn,
        changeWhoWon,
        giveRestartEventListeners,
        changeScore,
        restart
    };
    // displays gameboard
    // updates gameboard
    // displays whos turn it is
    // show if a win has occured
})();