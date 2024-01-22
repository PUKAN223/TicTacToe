import * as readlineSync from 'readline-sync';
import { playWithGeniusAI } from './src/PlayWithAi';
import { NewGame } from './src/NewGame';

export const RED = "\x1b[31m";
export const GREEN = "\x1b[32m";
export const CYAN = "\x1b[36m";
export const WHITE = "\x1b[37m";
export const YELLOW = "\x1b[33m";
export const BLUE = "\x1b[34m";
export const BOLD = "\x1b[1m";
export const S_RESET = "\x1b[0m";

const Menu = `${YELLOW}Menu: \n${BLUE}[1] ${WHITE}New Game \n${BLUE}[2] ${WHITE}Join Game \n${BLUE}[3] ${WHITE}Quick Join \n${BLUE}[4] ${WHITE}Play With Genius AI \n${BLUE}[5] ${WHITE}Exit\n\n`;

export function clearScreen(): void {
  console.clear();
}

export function printBoard(board: string[][]): void {
  console.log(GREEN + "╭───┬───┬───╮");
  for (let i = 0; i < board.length; i++) {
    console.log(`${GREEN}│ ${BOLD + WHITE}${board[i][0]}${GREEN}` +
      ` │ ${BOLD + WHITE}${board[i][1]}${GREEN}` +
      ` │ ${BOLD + WHITE}${board[i][2]}${GREEN} │`);
    if (i !== 2) {
      console.log(GREEN + "├───┼───┼───┤");
    }
  }
  console.log(GREEN + "╰───┴───┴───╯");
}

export function checkWin(board: string[][], player: string): boolean {
  return [...Array(3).keys()].some(i =>
    board[i].every(cell => cell === player) ||
    board.every(row => row[i] === player) ||
    board.every((row, j) => row[j] === player) ||
    board.every((row, j) => row[2 - j] === player)
  );
}

export function isBoardFull(board: string[][]): boolean {
  return board.every(row => row.every(cell => cell !== " "));
}

export function getUserInput(prompt = ""): string {
  return readlineSync.question(prompt);
}

export function generateRoomId(length: number = 6): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomId = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomId += characters.charAt(randomIndex);
  }
  return roomId;
}

async function playGame(): Promise<void> {
  while (true) {
    console.log(Menu);
    const choice = getUserInput("Choose an option: ");

    switch (choice) {
      case '1':
        await NewGame()
        break;
      case '2':
        joinGame();
        break;
      case '3':
        quickJoin();
        break;
      case '4':
        await playWithGeniusAI();
        break;
      case '5':
        console.log(YELLOW + BOLD + 'Exiting the game.');
        return;
      default:
    }
    if (getUserInput() !== '\r') {
      break;
    }
  }
}

function joinGame(): void {
  console.log(WHITE + BOLD + 'Join Game');
  // Implement join game logic here
}

function quickJoin(): void {
  console.log(WHITE + BOLD + 'Quick Join');
  // Implement quick join logic here
}

playGame();
