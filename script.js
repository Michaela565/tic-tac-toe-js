const gameBoard = (() =>{
    // puts input into array
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
    
    return{
        setSquare,
        getSquare,
        clear,
        boardArray
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
        score;
    };

    const getSign = () => {
        return _sign;
    };

    return {getScore, incrementScore, takeInput, getSign};
};

const gameController = (() =>{
    let roundCount = 0;
    let whosTurn = "X";
    const playerOne = player("X");
    const playerTwo = player("O");

    const checkRows = () =>{
        for (let i = 0; i < 3; i++) {
            let row =[];
            for (let j = i * 3; j < i * 3 + 3; j++) {
                row.push(gameBoard.getSquare(j));
            }
            console.log(row);
            if(row.every( square => square == undefined)) return false;
            if(row.every( square => square == row[0])) return true;
        }
        return false
    };

    const checkColumns = () =>{
        //console.log("checkColumns()");
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
        if(diagonalTwo.every( square => square == diagonalOne[0])) return true;
        return false;
    }

    const isWin = () => {
        console.log("isWin()");
        if(checkRows() || checkColumns() || checkDiagonals()) return true;
        return false;
    };

    const end = () => {
        if(whosTurn == playerOne.getSign()){
            playerOne.incrementScore();
            console.log("X wins");
        }
        else{
            playerTwo.incrementScore();
            console.log("O wins");
        }
        return screenController.restart();
    };

    const declareNewRound = () => {
        ++roundCount;
        if(whosTurn == playerOne.getSign()){
            //console.log("O")
            whosTurn = playerTwo.getSign();
        }
        else{
            //console.log("X")
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
        if(whosTurn == "O"){
            playerTwo.takeInput(e.target.dataset.index);
        }
        screenController.changeSign(e.target, whosTurn);
        if(isWin()){
            end();
        }
        screenController.removeEventListenerFromABox(e.target, 'click', playRound);
    };


    return{
        getWhosTurn,
        playRound,
        roundCount
    };
    // track whos round
    // check if win
})();

const screenController = (() =>{
    const DOMgameBoard = document.getElementById("game-board");
    const DOMboardBoxes = document.querySelectorAll(".board-box");
    const DOMwhosTurn = document.querySelector(".whos-turn");
    console.log(DOMboardBoxes);
    
    const addEventListenersToBoxes = (eventType, functionToExecute) => {
        DOMboardBoxes.forEach( box => box.addEventListener(eventType, functionToExecute));
    };

    const removeEventListenerFromABox = (box, eventType, functionToExecute) => {
        box.removeEventListener(eventType, functionToExecute);
    }

    const changeSign = (box, sign) => {
        box.innerHTML = sign;
    };

    const changeWhosTurn = (sign) => {
        DOMwhosTurn.innerHTML = `It's ${sign} turn`;
    };

    const restart = () => {
        DOMboardBoxes.forEach( box => box.removeEventListener('click', gameController.playRound));
        DOMboardBoxes.forEach( box => box.innerHTML = "");
        addEventListenersToBoxes('click', gameController.playRound);
        gameBoard.clear();
    };

    addEventListenersToBoxes('click', gameController.playRound);

    return{
        removeEventListenerFromABox,
        changeSign,
        changeWhosTurn,
        restart
    };
    // displays gameboard
    // updates gameboard
    // displays whos turn it is
    // show if a win has occured
})();