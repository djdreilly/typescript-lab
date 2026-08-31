/*
Types Exercises
*/

// TODO: Use 'type' to define a datatype named 'Mark' that
// is allowed to be either the string "X" or the string "O".

export type Mark = "X" | "O"

// TODO: Define a datatype named 'OptionalMark' that is 
// allowed to be either a 'Mark' or null.

export type OptionalMark = Mark | null

// TODO: Define a datatype named 'Row' that is an array
// containing exactly three 'OptionalMark's.

export type Row = [OptionalMark, OptionalMark, OptionalMark]

// TODO: Define a datatype named 'Board' that is an
// array containing exactly three 'Row's.

export type Board = [Row, Row, Row]



/*
Functions Exercises
*/

// TODO: Test this function (put your tests in
//       tests/toDo.tests.ts) and then write its
//       body here. The header and purpose
//       statement are given to you below.
/*
// Return whether 'board' does not contain a 'null'.
export function isFull( board : Board ): boolean
{    
}
*/
export function isFull( board : Board ): boolean
{    
    for (const Row of board) {
        for (const Mark of Row) {
            console.log(Mark);
            if (Mark === null) {
                return false;
            }
        }
    }
    return true;
}


// TODO: Test and write this function.
/*
// Return whether integer 'row' and 'column' identify a legal
// position on the board which is not already marked.
export function isLegalMove( board: Board, row : number, column : number ): boolean
{    
}
*/
export function isLegalMove( board: Board, row : number, column : number ): boolean
{    
    if (row < 0 || row > 2 || column < 0 || column > 2) {
        return false;
    } else if (board[row][column]===null){
        return true;
    }
    return false;
}

// TODO: Test and write this function.
/*
// Return the 'Mark' of the winner, or null of there is no winner.
export function getWinner( board : Board ): OptionalMark
{
}
*/
export function getWinner( board : Board ): OptionalMark
{
    if (board[0][0] !== null && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
        return board[0][0];
    } else if (board[1][0] !== null && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
        return board[1][0];
    } else if (board[2][0] !== null && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
        return board[2][0];
    } else if (board[0][0] !== null && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
        return board[0][0];
    }   else if (board[0][1] !== null && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {  
        return board[0][1];
    } else if (board[0][2] !== null && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
        return board[0][2];
    } else if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    } else if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    } else {
        return null;
    }
}


// TODO: test and write this function.
/*
// Return a three-line string representing the state of 'board'. For example:
// "BOARD X - - 
//        - X O
//        O - -"    
//  Each of the three lines should end with two whitespace characters '\r' and '\n'.
//  Make sure that the rows show up aligned with each other (you're setting up
//  something that will be useful in the next lab).
export function getBoardStr( board : Board ): string
{    
}
*/
export function getBoardStr( board : Board ): string
{    
    let boardStr = "";
    boardStr += "BOARD ";
    for (const row of board) {
        if (boardStr !== "BOARD ") {
            boardStr+= "      ";
        }
        for (const mark of row) {
            if (mark === null) {
                boardStr += "- ";
            } else {
                boardStr += mark + " ";
            }
        }
        boardStr += "\r\n";
    }
    return boardStr;
}



/*
Interfaces and Classes Exercises
*/

// TODO: Complete this class. Most of its
// methods will be very easy; you'll just call
// the functions you already defined above.
/*
export class TicTacToe {
    board: Board;
    // This keeps track of whose turn it is: 'X' or 'O'.
    nextToPlay: Mark;

    // Return a message displaying the board.
    getBoardMsg(): string
    {
    }

    // Return whether integer 'row' and 'column' identify
    // a valid next move.
    isLegalMove( row : number, column : number ): boolean
    {
    }

    // If 'row' in [0,2] and 'col' in [0,2] represent a valid next move, then 
    //    (1) mark the board with 'nextToPlay' at the indicated position,
    //    (2) switch 'nextToPlay' to the other 'Mark', and
    //    (3) return 'true'
    // Otherwise, just return 'false'.
    makeMove( row : number, col : number ) : boolean
    {
    }

    // Return whether all spaces have been marked.
    isFull() : boolean
    {
    }

    // Return the 'Mark' of the winner, or null of there is no winner.
    checkForWinner() : OptionalMark
    {
    }
}
*/
export class TicTacToe {
    board: Board;
    // This keeps track of whose turn it is: 'X' or 'O'.
    nextToPlay: Mark;

    constructor(  )
    {
        this.board = [
            [ null, null, null ],
            [ null, null, null ],
            [ null, null, null ]
        ];
        this.nextToPlay = "X";
    }

    // Return a message displaying the board.
    getBoardMsg(): string
    {
        return getBoardStr(this.board);
    }

    // Return whether integer 'row' and 'column' identify
    // a valid next move.
    isLegalMove( row : number, column : number ): boolean
    {
        return isLegalMove(this.board, row, column);
    }

    // If 'row' in [0,2] and 'col' in [0,2] represent a valid next move, then 
    //    (1) mark the board with 'nextToPlay' at the indicated position,
    //    (2) switch 'nextToPlay' to the other 'Mark', and
    //    (3) return 'true'
    // Otherwise, just return 'false'.
    makeMove( row : number, col : number ) : boolean
    {
        if (this.isLegalMove(row, col)) {
            this.board[row][col] = this.nextToPlay;
            if (this.nextToPlay === "X") {
                this.nextToPlay = "O";
            } else {
                this.nextToPlay = "X";
            }
            return true;
        }
        return false;
    }

    // Return whether all spaces have been marked.
    isFull() : boolean
    {
        return isFull(this.board);
    }

    // Return the 'Mark' of the winner, or null of there is no winner.
    checkForWinner() : OptionalMark
    {
        return getWinner(this.board);
    }
}







