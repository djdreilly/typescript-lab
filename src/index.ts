import { TicTacToe } from "./toDo.ts"
const myBoard : TicTacToe = new TicTacToe();
let winner : string | null = null;
const intervalId = setInterval(() => {

    let row : number = Math.floor(Math.random() * 3);
    let col : number = Math.floor(Math.random() * 3);
    while (myBoard.isLegalMove(row, col) === false) {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
    }

    console.log(myBoard.getBoardMsg());
    myBoard.makeMove(row, col);
    winner = myBoard.checkForWinner();
    
    if (myBoard.isFull() || winner !== null) {
        console.log(myBoard.getBoardMsg());
        clearInterval(intervalId);
    }
} , 5000);

if (winner) {
    console.log(`Player ${winner} wins!`);
} else {
    console.log("It's a tie!");
}