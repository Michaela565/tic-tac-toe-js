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
    let score = 0;
    // takes input
    // stores score
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