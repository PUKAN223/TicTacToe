import { printBoard, clearScreen, getUserInput, isBoardFull, checkWin, CYAN, BLUE, BOLD, RED, GREEN, YELLOW } from "../TicTacToe";
export async function playWithGeniusAI(): Promise<void> {
    const board: string[][] = Array.from({ length: 3 }, () => Array(3).fill(" "));
    let player: string = "X";
    let winner: string | null = null;
    printBoard(board);

    while (!winner && !isBoardFull(board)) {
        clearScreen();
        console.log(CYAN + `It's player ${BOLD + player + CYAN}'s turn.`);

        if (player === "X") {
            printBoard(board);
            const move = getUserInput("Enter your move: ");

            if (move === '\x1b') {
                clearScreen();
                console.log(RED + BOLD + 'You have exited the game.');
                return;
            }

            if (move.match(/[1-9]/)) {
                const position = parseInt(move, 10) - 1;
                const row = Math.floor(position / 3);
                const col = position % 3;

                if (board[row][col] !== " ") {
                    clearScreen();
                    console.log(RED + BOLD + 'That spot is already taken. Press any key to try again!');
                    printBoard(board);
                    getUserInput();
                } else {
                    board[row][col] = player;

                    if (checkWin(board, player)) {
                        winner = player;
                    } else {
                        player = player === "X" ? "O" : "X";
                    }
                }
            } else {
                clearScreen();
                console.log(RED + BOLD + 'Invalid input. Press any key to try again!');
                printBoard(board);
                getUserInput();
            }
        } else {
            // AI's turn (genius AI)
            const aiMove = getGeniusMove(board);
            const aiRow = Math.floor(aiMove as number / 3);
            const aiCol = aiMove as number % 3;

            board[aiRow][aiCol] = player;

            if (checkWin(board, player)) {
                winner = player;
            } else {
                player = player === "X" ? "O" : "X";
            }
        }
    }

    clearScreen();
    if (winner) {
        console.log(GREEN + BOLD + `Congratulations, player ${winner}! You have won the game.`);
    } else {
        console.log(YELLOW + BOLD + 'It\'s a tie! The game is a draw.');
    }
    printBoard(board);
}

function getGeniusMove(board: string[][]): number | undefined {
    const bestMove = minimax(board, "O").index;
    return bestMove;
}

function minimax(board: string[][], player: string): { score: number, index?: number } {
    const availableSpots = getEmptyCells(board);

    if (checkWin(board, "X")) {
        return { score: -1 };
    } else if (checkWin(board, "O")) {
        return { score: 1 };
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }

    const moves: { index: number, score: number }[] = [];
    for (let i = 0; i < availableSpots.length; i++) {
        const move = { index: availableSpots[i], score: 0 };

        board[Math.floor(move.index / 3)][move.index % 3] = player;

        if (player === "O") {
            const result = minimax(board, "X");
            move.score = result.score;
        } else {
            const result = minimax(board, "O");
            move.score = result.score;
        }

        board[Math.floor(move.index / 3)][move.index % 3] = " ";
        moves.push(move);
    }

    let bestMove: { index: number, score: number } | undefined;
    if (player === "O") {
        let bestScore = -Infinity;
        for (const move of moves) {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    } else {
        let bestScore = Infinity;
        for (const move of moves) {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    }

    return bestMove!;
}

function getEmptyCells(board: string[][]): number[] {
    const emptyCells: number[] = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === " ") {
                emptyCells.push(i * 3 + j);
            }
        }
    }
    return emptyCells;
}