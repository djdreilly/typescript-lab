import { TicTacToe } from "./toDo.js";
const myBoard = new TicTacToe();
let winner = null;
while (!myBoard.isFull() && winner === null) {
    const row = Math.floor(Math.random() * 3);
    const col = Math.floor(Math.random() * 3);
    if (myBoard.isLegalMove(row, col)) {
        console.log(myBoard.getBoardMsg());
        myBoard.makeMove(row, col);
        winner = myBoard.checkForWinner();
    }
}
console.log(myBoard.getBoardMsg());
if (winner) {
    console.log(`Player ${winner} wins!`);
}
else {
    console.log("It's a tie!");
}
//# sourceMappingURL=index.js.map