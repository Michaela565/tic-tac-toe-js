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

    return {sign, getScore, incrementScore, takeInput, getSign};
};

const gameController = (() =>{
    // track whos round
    // check if win
})();

const screenController = (() =>{
    // displays gameboard
    // updates gameboard
    // displays whos turn it is
    // show if a win has occured
})();