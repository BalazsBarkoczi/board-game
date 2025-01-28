import { useState } from 'react'
import './css/App.css'
import Cell from './components/Cell';

function App() {

  const ROW_COUNT = 5;
  const COL_COUNT = 5;
  const MIN_LINE_LENGTH = 3;

  const [board, setBoard] = useState(Array(ROW_COUNT).fill(Array(COL_COUNT).fill(null)));
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0); // 0: C, 1: M, 2: T

  const characters = ['C', 'M', 'T'];


  const handleCellClick = (row, col) => {
    if (board[row][col] !== null || gameOver) return;

    const updatedBoard = board.map((boardRows, i) => (
      boardRows.map((cell, j) => (
        i === row && j == col ? { char: characters[currentCharIndex], color: "black" } : cell
      ))
    ));

    setBoard(updatedBoard);
    setCurrentCharIndex((prev) => (prev + 1) % characters.length);

    countLines(updatedBoard, row, col);

    if (!updatedBoard.flat().some((cell) => cell === null)) {
      setGameOver(true);
    }
  }

  const resetGame = () => {
    setBoard(Array(ROW_COUNT).fill(Array(COL_COUNT).fill(null)));
    setCurrentCharIndex(0);
    setGameOver(false);
    setLines(0);
  }

  const countLines = (board, row, col) => {
    const activeChar = board[row][col].char;

    const directions = [
      [1, 0], //down
      [0, 1], //right
      [1, 1], //bottom right
      [1, -1] //bottom left
    ];


    directions.forEach(([iDir, jDir]) => {

      let firstHalfCount = countConsecutive(board, row, col, iDir, jDir, activeChar);
      let secondHalfCount = countConsecutive(board, row, col, -iDir, -jDir, activeChar);

      //color lines
      if (firstHalfCount + secondHalfCount + 1 >= MIN_LINE_LENGTH) {
        colorLines(board, row, col, iDir, jDir, firstHalfCount, secondHalfCount, activeChar);
      }

      const isFirstHalfAlmostLine = firstHalfCount === MIN_LINE_LENGTH - 1 && secondHalfCount <= MIN_LINE_LENGTH - 1;
      const isSecondHalfAlmostLine = secondHalfCount === MIN_LINE_LENGTH - 1 && firstHalfCount <= MIN_LINE_LENGTH - 1;
      const isExactLine = firstHalfCount + secondHalfCount + 1 === MIN_LINE_LENGTH;

      if (isFirstHalfAlmostLine) {
        setLines((prev) => prev + 1);
      }
      else if (isSecondHalfAlmostLine) {
        setLines((prev) => prev + 1);
      }
      else if (isExactLine) {
        setLines((prev) => prev + 1);
      }
    });

  }

  const countConsecutive = (board, row, col, iDir, jDir, activeChar) => {
    let count = 0;

    let i = row + iDir;
    let j = col + jDir;

    while (i >= 0 && i < ROW_COUNT && j >= 0 && j < COL_COUNT && board[i][j]?.char === activeChar) {
      count++;
      i += iDir;
      j += jDir;
    }

    return count;
  }

  const colorLines = (board, row, col, iDir, jDir, firstHalfCount, secondHalfCount, activeChar) => {
    const color = {
      "C": "green",
      "M": "blue",
      "T": "red"

    }

    const updatedBoard = JSON.parse(JSON.stringify(board)); //deep copy

    for (let k = 0; k < firstHalfCount + secondHalfCount + 1; k++) {
      const startRowPos = row + iDir * firstHalfCount;
      const startColPos = col + jDir * firstHalfCount;

      updatedBoard[startRowPos + iDir * -k][startColPos + jDir * -k].color = color[activeChar];
    }

    setBoard(updatedBoard);
  }

  return (
    <>

      <h1>CMT BOARD GAME</h1>

      <table className='main-board'>
        <tbody>

          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Cell key={`${rowIndex}-${colIndex}`}
                  value={cell?.char}
                  row={rowIndex}
                  col={colIndex}
                  color={cell?.color}
                  handleCellClick={handleCellClick}
                />
              ))}
            </tr>
          ))}

        </tbody>
      </table>

      {gameOver && (
        <p>GAME OVER</p>
      )}

      <p>Next: {characters[currentCharIndex]}</p>
      <p>Lines: {lines}</p>

      <button onClick={resetGame}>Reset</button>
    </>
  )
}

export default App
