import { describe, test, expect } from "vitest"
import { isFull, Row, Mark, OptionalMark, Board, TicTacToe, isLegalMove, getWinner} from "../src/toDo.ts";

// Remember, you'll need to use "import" to bring in the
// functions you want to test from "../src/toDo.ts"
//
// Use the tests in introFunctions.test.ts as a guide.

describe( 'isFullYes', () => {
    const myBoard : TicTacToe = new TicTacToe();
    myBoard.makeMove( 0, 0 );
    myBoard.makeMove( 1, 0 );
    myBoard.makeMove( 2, 0 );
    myBoard.makeMove( 0, 1 );
    myBoard.makeMove( 1, 1 );
    myBoard.makeMove( 2, 1 );
    myBoard.makeMove( 0, 2 );
    myBoard.makeMove( 1, 2 );
    myBoard.makeMove( 2, 2 );
    test( 'Full', () => {
        expect( isFull(myBoard.board) ).toBe( true );
    });
});

describe( 'isFullMaybe', () => {
    const myBoard : TicTacToe = new TicTacToe();
    myBoard.makeMove( 0, 0 );
    myBoard.makeMove( 1, 0 );
    myBoard.makeMove( 1, 2 );
    myBoard.makeMove( 2, 2 );
    test( 'Half', () => {
        expect( isFull(myBoard.board) ).toBe( false );
    });
});

describe( 'isFullNo', () => {
    const myBoard : TicTacToe = new TicTacToe();
    test( 'No', () => {
        expect( isFull(myBoard.board) ).toBe( false );
    });
});

describe( 'isFull1', () => {
    test( 'placeholder', () => {
        expect( true ).toBe( true );
    });
});

describe( 'isLegal', () => {
    const myBoard : TicTacToe = new TicTacToe();
    myBoard.makeMove( 0, 0 );
    myBoard.makeMove( 1, 0 );
    myBoard.makeMove( 1, 2 );
    test( 'Yes', () => {
        expect( isLegalMove(myBoard.board, 0, 1) ).toBe( true );
    });
    test( 'No', () => {
        expect( isLegalMove(myBoard.board, 0, 0) ).toBe( false );
    });
    test( 'No', () => {
        expect( isLegalMove(myBoard.board, 3, 3) ).toBe( false );
    });
});

describe( 'Winner1', () => {
    const myBoard : TicTacToe = new TicTacToe();
    myBoard.makeMove( 0, 0 );
    myBoard.makeMove( 1, 1 );
    myBoard.makeMove( 0, 1 );
    myBoard.makeMove( 2, 1 );
    myBoard.makeMove( 0, 2 );
    test( 'X', () => {
        expect( getWinner(myBoard.board) ).toBe( 'X' );
    });
});

describe( 'Winner2', () => {
    const myBoard : TicTacToe = new TicTacToe();
    myBoard.makeMove( 2, 0 );
    myBoard.makeMove( 0, 0 );
    myBoard.makeMove( 1, 1 );
    myBoard.makeMove( 0, 1 );
    myBoard.makeMove( 2, 1 );
    myBoard.makeMove( 0, 2 );
    test( 'O', () => {
        expect( getWinner(myBoard.board) ).toBe( 'O' );
    });
});

describe( 'Winner3', () => {
    const myBoard : TicTacToe = new TicTacToe();
    myBoard.makeMove( 0, 0 );
    myBoard.makeMove( 1, 1 );
    myBoard.makeMove( 0, 2 );
    myBoard.makeMove( 0, 1 );
    myBoard.makeMove( 1, 0 );
    myBoard.makeMove( 2, 0 );
    myBoard.makeMove( 1, 2 );
    myBoard.makeMove( 2, 2 );
    myBoard.makeMove( 2, 1 );
    
    test( 'null', () => {
        expect( getWinner(myBoard.board) ).toBe( null );
    });
});