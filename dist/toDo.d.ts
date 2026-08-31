export type Mark = "X" | "O";
export type OptionalMark = Mark | null;
export type Row = [OptionalMark, OptionalMark, OptionalMark];
export type Board = [Row, Row, Row];
export declare function isFull(board: Board): boolean;
export declare function isLegalMove(board: Board, row: number, column: number): boolean;
export declare function getWinner(board: Board): OptionalMark;
export declare function getBoardStr(board: Board): string;
export declare class TicTacToe {
    board: Board;
    nextToPlay: Mark;
    constructor();
    getBoardMsg(): string;
    isLegalMove(row: number, column: number): boolean;
    makeMove(row: number, col: number): boolean;
    isFull(): boolean;
    checkForWinner(): OptionalMark;
}
