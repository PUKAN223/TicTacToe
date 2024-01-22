function drawTicTacToeBoard(board: string[][]): void {
    const GREEN = '\x1b[32m';
    const WHITE = '\x1b[37m';
    const BOLD = '\x1b[1m';
    const RESET = '\x1b[0m';
  
    console.log(GREEN + "╭───┬───┬───╮");
  
    for (let i = 0; i < 3; i++) {
      const row = board[i];
      console.log(
        `${GREEN}│ ${BOLD + WHITE}${row[0]}${RESET + GREEN}` +
        ` │ ${BOLD + WHITE}${row[1]}${RESET + GREEN}` +
        ` │ ${BOLD + WHITE}${row[2]}${RESET + GREEN} │`
      );
  
      if (i !== 2) {
        console.log(GREEN + "├───┼───┼───┤");
      }
    }
  
    console.log(GREEN + "╰───┴───┴───╯");
  }
  
  // Example usage:
  const exampleBoard: string[][] = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['X', 'O', 'X']
  ];
  
  drawTicTacToeBoard(exampleBoard);
  