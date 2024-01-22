"use strict";
function drawTicTacToeBoard(board) {
    var GREEN = '\x1b[32m';
    var WHITE = '\x1b[37m';
    var BOLD = '\x1b[1m';
    var RESET = '\x1b[0m';
    console.log(GREEN + "╭───┬───┬───╮");
    for (var i = 0; i < 3; i++) {
        var row = board[i];
        console.log("".concat(GREEN, "\u2502 ").concat(BOLD + WHITE).concat(row[0]).concat(RESET + GREEN) +
            " \u2502 ".concat(BOLD + WHITE).concat(row[1]).concat(RESET + GREEN) +
            " \u2502 ".concat(BOLD + WHITE).concat(row[2]).concat(RESET + GREEN, " \u2502"));
        if (i !== 2) {
            console.log(GREEN + "├───┼───┼───┤");
        }
    }
    console.log(GREEN + "╰───┴───┴───╯");
}
// Example usage:
var exampleBoard = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['X', 'O', 'X']
];
drawTicTacToeBoard(exampleBoard);
