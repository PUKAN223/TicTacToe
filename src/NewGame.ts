import * as fs from 'fs';
import { BLUE, BOLD, GREEN, RED, S_RESET, YELLOW, checkWin, clearScreen, generateRoomId, getUserInput, printBoard } from '../TicTacToe';

const Board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
]
export function NewGame() {
    setUp();
    let roomId = generateRoomId();
    let choice = getUserInput("What team [X : O]: ")
    console.log(BOLD + `Your RoomId is: ${GREEN}${roomId}${S_RESET}`);
    console.log(`Please give ${GREEN}RoomId${S_RESET} to others ${YELLOW}Player.\n${S_RESET}`);
    if (choice == "X" || "O") {
        let XO = new TicTacToe(choice, roomId);
        XO.createGame()
    }
    // const animationFrames = ['Waiting Player', 'Waiting Player.', 'Waiting Player..', 'Waiting Player...'];
    // let animationIndex = 0;
    // const animationInterval = setInterval(() => {
    //     process.stdout.write(`\r${BOLD}${animationFrames[animationIndex]}${S_RESET}`);
    //     animationIndex = (animationIndex + 1) % animationFrames.length;
    // }, 500);
}
function stdW(text: string) {
    process.stdout.write(text)
}
//SetUp
function setUp() {
    const folderPath = './Game';
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
    }
}


class TicTacToe {
    private board: Array<Array<string>>
    private owner: string = ''
    private roomId: string = ''
    private winner: string | null = null
    private turn: string = "X" ? "O" : "X";
    constructor(owner: string, roomId: string) {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];
        this.owner = owner
        this.roomId = roomId
    }
    createGame() {
        if (this.owner == "O" || "X") {
            let dataS = {
                Id: this.roomId,
                Owner: this.owner,
                Turn: this.turn,
                Board: this.board
            }
            fs.readFile("./Game/data.json", (err, data) => {
                let DataP = JSON.parse(data.toString())
                DataP.push(dataS)
                console.log(DataP)
                fs.writeFileSync("./Game/data.json", JSON.stringify(DataP))
            })
        }
    }
    setBoard(position: number, Team: string) {
        const row = Math.floor(position / 3);
        const col = position % 3;
        if (this.board[row][col] !== " ") {
            clearScreen();
            console.log(RED + BOLD + 'That spot is already taken. Press any key to try again!');
            printBoard(this.board);
            getUserInput();
        } else {
            this.board[row][col] = Team;
            if (checkWin(this.board, Team)) {
                this.winner = Team;
            } else {
                this.turn = this.turn === "X" ? "O" : "X";
            }
        }
    }
    load() {

    }
}