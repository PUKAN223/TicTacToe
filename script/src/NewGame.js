"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewGame = void 0;
const fs = require("fs");
const TicTacToe_1 = require("../TicTacToe");
const Board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
];
function NewGame() {
    setUp();
    let roomId = (0, TicTacToe_1.generateRoomId)();
    let choice = (0, TicTacToe_1.getUserInput)("What team [X : O]: ");
    console.log(TicTacToe_1.BOLD + `Your RoomId is: ${TicTacToe_1.GREEN}${roomId}${TicTacToe_1.S_RESET}`);
    console.log(`Please give ${TicTacToe_1.GREEN}RoomId${TicTacToe_1.S_RESET} to others ${TicTacToe_1.YELLOW}Player.\n${TicTacToe_1.S_RESET}`);
    if (choice == "X" || "O") {
        let XO = new TicTacToe(choice, roomId);
        XO.createGame();
    }
    // const animationFrames = ['Waiting Player', 'Waiting Player.', 'Waiting Player..', 'Waiting Player...'];
    // let animationIndex = 0;
    // const animationInterval = setInterval(() => {
    //     process.stdout.write(`\r${BOLD}${animationFrames[animationIndex]}${S_RESET}`);
    //     animationIndex = (animationIndex + 1) % animationFrames.length;
    // }, 500);
}
exports.NewGame = NewGame;
function stdW(text) {
    process.stdout.write(text);
}
//SetUp
function setUp() {
    const folderPath = './Game';
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}
class TicTacToe {
    constructor(owner, roomId) {
        this.owner = '';
        this.roomId = '';
        this.winner = null;
        this.turn = "X" ? "O" : "X";
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];
        this.owner = owner;
        this.roomId = roomId;
    }
    createGame() {
        if (this.owner == "O" || "X") {
            let dataS = {
                Id: this.roomId,
                Owner: this.owner,
                Turn: this.turn,
                Board: this.board
            };
            fs.readFile("./Game/data.json", (err, data) => {
                let DataP = JSON.parse(data.toString());
                DataP.push(dataS);
                console.log(DataP);
                fs.writeFileSync("./Game/data.json", JSON.stringify(DataP));
            });
        }
    }
    setBoard(position, Team) {
        const row = Math.floor(position / 3);
        const col = position % 3;
        if (this.board[row][col] !== " ") {
            (0, TicTacToe_1.clearScreen)();
            console.log(TicTacToe_1.RED + TicTacToe_1.BOLD + 'That spot is already taken. Press any key to try again!');
            (0, TicTacToe_1.printBoard)(this.board);
            (0, TicTacToe_1.getUserInput)();
        }
        else {
            this.board[row][col] = Team;
            if ((0, TicTacToe_1.checkWin)(this.board, Team)) {
                this.winner = Team;
            }
            else {
                this.turn = this.turn === "X" ? "O" : "X";
            }
        }
    }
    load() {
    }
}
