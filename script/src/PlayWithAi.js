"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playWithGeniusAI = void 0;
const TicTacToe_1 = require("../TicTacToe");
function playWithGeniusAI() {
    return __awaiter(this, void 0, void 0, function* () {
        const board = Array.from({ length: 3 }, () => Array(3).fill(" "));
        let player = "X";
        let winner = null;
        (0, TicTacToe_1.printBoard)(board);
        while (!winner && !(0, TicTacToe_1.isBoardFull)(board)) {
            (0, TicTacToe_1.clearScreen)();
            console.log(TicTacToe_1.CYAN + `It's player ${TicTacToe_1.BOLD + player + TicTacToe_1.CYAN}'s turn.`);
            if (player === "X") {
                (0, TicTacToe_1.printBoard)(board);
                const move = (0, TicTacToe_1.getUserInput)("Enter your move: ");
                if (move === '\x1b') {
                    (0, TicTacToe_1.clearScreen)();
                    console.log(TicTacToe_1.RED + TicTacToe_1.BOLD + 'You have exited the game.');
                    return;
                }
                if (move.match(/[1-9]/)) {
                    const position = parseInt(move, 10) - 1;
                    const row = Math.floor(position / 3);
                    const col = position % 3;
                    if (board[row][col] !== " ") {
                        (0, TicTacToe_1.clearScreen)();
                        console.log(TicTacToe_1.RED + TicTacToe_1.BOLD + 'That spot is already taken. Press any key to try again!');
                        (0, TicTacToe_1.printBoard)(board);
                        (0, TicTacToe_1.getUserInput)();
                    }
                    else {
                        board[row][col] = player;
                        if ((0, TicTacToe_1.checkWin)(board, player)) {
                            winner = player;
                        }
                        else {
                            player = player === "X" ? "O" : "X";
                        }
                    }
                }
                else {
                    (0, TicTacToe_1.clearScreen)();
                    console.log(TicTacToe_1.RED + TicTacToe_1.BOLD + 'Invalid input. Press any key to try again!');
                    (0, TicTacToe_1.printBoard)(board);
                    (0, TicTacToe_1.getUserInput)();
                }
            }
            else {
                // AI's turn (genius AI)
                const aiMove = getGeniusMove(board);
                const aiRow = Math.floor(aiMove / 3);
                const aiCol = aiMove % 3;
                board[aiRow][aiCol] = player;
                if ((0, TicTacToe_1.checkWin)(board, player)) {
                    winner = player;
                }
                else {
                    player = player === "X" ? "O" : "X";
                }
            }
        }
        (0, TicTacToe_1.clearScreen)();
        if (winner) {
            console.log(TicTacToe_1.GREEN + TicTacToe_1.BOLD + `Congratulations, player ${winner}! You have won the game.`);
        }
        else {
            console.log(TicTacToe_1.YELLOW + TicTacToe_1.BOLD + 'It\'s a tie! The game is a draw.');
        }
        (0, TicTacToe_1.printBoard)(board);
    });
}
exports.playWithGeniusAI = playWithGeniusAI;
function getGeniusMove(board) {
    const bestMove = minimax(board, "O").index;
    return bestMove;
}
function minimax(board, player) {
    const availableSpots = getEmptyCells(board);
    if ((0, TicTacToe_1.checkWin)(board, "X")) {
        return { score: -1 };
    }
    else if ((0, TicTacToe_1.checkWin)(board, "O")) {
        return { score: 1 };
    }
    else if (availableSpots.length === 0) {
        return { score: 0 };
    }
    const moves = [];
    for (let i = 0; i < availableSpots.length; i++) {
        const move = { index: availableSpots[i], score: 0 };
        board[Math.floor(move.index / 3)][move.index % 3] = player;
        if (player === "O") {
            const result = minimax(board, "X");
            move.score = result.score;
        }
        else {
            const result = minimax(board, "O");
            move.score = result.score;
        }
        board[Math.floor(move.index / 3)][move.index % 3] = " ";
        moves.push(move);
    }
    let bestMove;
    if (player === "O") {
        let bestScore = -Infinity;
        for (const move of moves) {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    }
    else {
        let bestScore = Infinity;
        for (const move of moves) {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    }
    return bestMove;
}
function getEmptyCells(board) {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === " ") {
                emptyCells.push(i * 3 + j);
            }
        }
    }
    return emptyCells;
}
