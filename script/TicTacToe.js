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
exports.generateRoomId = exports.getUserInput = exports.isBoardFull = exports.checkWin = exports.printBoard = exports.clearScreen = exports.S_RESET = exports.BOLD = exports.BLUE = exports.YELLOW = exports.WHITE = exports.CYAN = exports.GREEN = exports.RED = void 0;
const readlineSync = require("readline-sync");
const PlayWithAi_1 = require("./src/PlayWithAi");
const NewGame_1 = require("./src/NewGame");
exports.RED = "\x1b[31m";
exports.GREEN = "\x1b[32m";
exports.CYAN = "\x1b[36m";
exports.WHITE = "\x1b[37m";
exports.YELLOW = "\x1b[33m";
exports.BLUE = "\x1b[34m";
exports.BOLD = "\x1b[1m";
exports.S_RESET = "\x1b[0m";
const Menu = `${exports.YELLOW}Menu: \n${exports.BLUE}[1] ${exports.WHITE}New Game \n${exports.BLUE}[2] ${exports.WHITE}Join Game \n${exports.BLUE}[3] ${exports.WHITE}Quick Join \n${exports.BLUE}[4] ${exports.WHITE}Play With Genius AI \n${exports.BLUE}[5] ${exports.WHITE}Exit\n\n`;
function clearScreen() {
    console.clear();
}
exports.clearScreen = clearScreen;
function printBoard(board) {
    console.log(exports.GREEN + "╭───┬───┬───╮");
    for (let i = 0; i < board.length; i++) {
        console.log(`${exports.GREEN}│ ${exports.BOLD + exports.WHITE}${board[i][0]}${exports.GREEN}` +
            ` │ ${exports.BOLD + exports.WHITE}${board[i][1]}${exports.GREEN}` +
            ` │ ${exports.BOLD + exports.WHITE}${board[i][2]}${exports.GREEN} │`);
        if (i !== 2) {
            console.log(exports.GREEN + "├───┼───┼───┤");
        }
    }
    console.log(exports.GREEN + "╰───┴───┴───╯");
}
exports.printBoard = printBoard;
function checkWin(board, player) {
    return [...Array(3).keys()].some(i => board[i].every(cell => cell === player) ||
        board.every(row => row[i] === player) ||
        board.every((row, j) => row[j] === player) ||
        board.every((row, j) => row[2 - j] === player));
}
exports.checkWin = checkWin;
function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== " "));
}
exports.isBoardFull = isBoardFull;
function getUserInput(prompt = "") {
    return readlineSync.question(prompt);
}
exports.getUserInput = getUserInput;
function generateRoomId(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let roomId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        roomId += characters.charAt(randomIndex);
    }
    return roomId;
}
exports.generateRoomId = generateRoomId;
function playGame() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            console.log(Menu);
            const choice = getUserInput("Choose an option: ");
            switch (choice) {
                case '1':
                    yield (0, NewGame_1.NewGame)();
                    break;
                case '2':
                    joinGame();
                    break;
                case '3':
                    quickJoin();
                    break;
                case '4':
                    yield (0, PlayWithAi_1.playWithGeniusAI)();
                    break;
                case '5':
                    console.log(exports.YELLOW + exports.BOLD + 'Exiting the game.');
                    return;
                default:
            }
            if (getUserInput() !== '\r') {
                break;
            }
        }
    });
}
function joinGame() {
    console.log(exports.WHITE + exports.BOLD + 'Join Game');
    // Implement join game logic here
}
function quickJoin() {
    console.log(exports.WHITE + exports.BOLD + 'Quick Join');
    // Implement quick join logic here
}
playGame();
