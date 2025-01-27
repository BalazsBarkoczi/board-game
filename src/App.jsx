import { useState } from 'react'
import './css/App.css'
import Cell from './components/Cell';

function App() {

  const ROW_COUNT = 5;
  const COL_COUNT = 5;

  const [board, setBoard] = useState(Array(ROW_COUNT).fill(Array(COL_COUNT).fill('')));

  const [gameOver, setGameOver] = useState(false);

  const characters = ['C','M','T'];
  const [currentCharIndex, setCurrentCharIndex ] = useState(0);

  const handleCellClick = (row,col) =>{
    console.log(board)

    if(board[row][col] !== '' || gameOver) return;

    const updatedBoard = board.map((boardRows,i)=>(
        boardRows.map((cell, j)=>(
          i === row && j == col ? characters[currentCharIndex] : cell
        ))
    ));

    setBoard(updatedBoard);
    setCurrentCharIndex((prev) => (prev + 1) % 3 );

    if(!updatedBoard.flat().some((cell) => cell === '') ){
      setGameOver(true);
    }
  }

  const resetGame = () => {
    setBoard(Array(ROW_COUNT).fill(Array(COL_COUNT).fill('')));
    setCurrentCharIndex(0);
    setGameOver(false);
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
              value={cell} 
              row={rowIndex} 
              col={colIndex} 
              color={'black'} 
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
