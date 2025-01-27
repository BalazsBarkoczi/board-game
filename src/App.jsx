import { useState } from 'react'
import './css/App.css'
import Cell from './components/Cell';

function App() {

  const ROW_COUNT = 5;
  const COL_COUNT = 5;
  const MIN_LINE_LENGTH = 3;

  const [board, setBoard] = useState(Array(ROW_COUNT).fill(Array(COL_COUNT).fill(null)));

  const [gameOver, setGameOver] = useState(false);

  const characters = ['C','C','C']; // ['C','M','T']
  const [currentCharIndex, setCurrentCharIndex ] = useState(0);

  const handleCellClick = (row,col) =>{
    if(board[row][col] !== null || gameOver) return;

    const updatedBoard = board.map((boardRows,i)=>(
        boardRows.map((cell, j)=>(
          i === row && j == col ? {char: characters[currentCharIndex], color: "black"} : cell
        ))
    ));

    setBoard(updatedBoard);
    setCurrentCharIndex((prev) => (prev + 1) % 3 );

    countLines(updatedBoard,row,col);

    if(!updatedBoard.flat().some((cell) => cell === null) ){
      setGameOver(true);
    }
    console.log(updatedBoard)
  }

  const resetGame = () => {
    setBoard(Array(ROW_COUNT).fill(Array(COL_COUNT).fill(null)));
    setCurrentCharIndex(0);
    setGameOver(false);
  }

  const countLines = (board, row, col) =>{
    console.log("CURR:",row,col);

    const activeChar = board[row][col].char;
    const lines = 0;

    const directions = [
      [1,0], //down
      [0,1], //right
      [1,1], //bottom right
      [1,-1] //bottom left
    ];

    

    directions.forEach( ([iDir,jDir]) => {


      let firstHalfCount = 0;
      let secondHalfCount = 0;
      
      //first half
      let i = row + iDir;
      let j = col + jDir;

      while(i >= 0 && i < ROW_COUNT && j >= 0 && j < COL_COUNT && board[i][j]?.char === activeChar ){
        firstHalfCount++;
        i += iDir;
        j += jDir;
      }

      //second half
      i = row - iDir  ;
      j = col - jDir  ;

      while(i >= 0 && i < ROW_COUNT && j >= 0 && j < COL_COUNT && board[i][j]?.char === activeChar ){
        secondHalfCount++;
        i -= iDir;
        j -= jDir;
      }

      if(firstHalfCount + secondHalfCount + 1 >= MIN_LINE_LENGTH){
        //color act
        //board[row][col].color = "red";

        //color last first half
        //board[row + iDir * firstHalfCount][col + jDir * firstHalfCount].color = "red";

        //color last second half
        //board[row - iDir * secondHalfCount][col - jDir * secondHalfCount].color = "red";

        for(let k = 0; k < firstHalfCount + secondHalfCount + 1; k++){
          const startRowPos = row + iDir * firstHalfCount;
          const startColPos = col + jDir * firstHalfCount;

          board [startRowPos   + iDir * -k][startColPos   + jDir * -k].color = "red";
        }

      }

      console.log("First, Second",firstHalfCount, secondHalfCount)
    });


  }



  return (
    <>

    <h1>CMT BOARD GAME</h1>

    <table className='main-board'>
      <tbody>

        {board.map((row, rowIndex)=>(
          <tr key={rowIndex}>
            {row.map((cell,colIndex)=>(
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

    {gameOver &&(
      <p>GAME OVER</p>
    )}

        <p>Next: {characters[currentCharIndex]}</p>

    <button onClick={resetGame}>Reset</button>

    </>
  )
}

export default App
