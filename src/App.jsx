import { useState } from 'react'
import './css/App.css'
import Cell from './components/Cell';

function App() {

  const ROW_COUNT = 5;
  const COL_COUNT = 5;

  const [board, setBoard] = useState(Array(ROW_COUNT).fill(Array(COL_COUNT).fill('')));

  const handleCellClick = (row,col) =>{
    console.log(row,col)

    if(board[row][col] !== '') return;

    const updatedBoard = board.map((boardRows,i)=>(
        boardRows.map((cell, j)=>(
          i === row && j == col ? 'X' : cell
        ))
    ));

    setBoard(updatedBoard);
  }


  return (
    <>

    <h1>CMT BOARD GAME</h1>

    <table className='main-board'>
      <tbody>

        {board.map((row, rowIndex)=>(
          <tr key={rowIndex}>
            {row.map((cell,colIndex)=>(
              <Cell key={`${rowIndex}-${colIndex}`} value={cell} row={rowIndex} col={colIndex} color={'black'} handleCellClick={handleCellClick}  />
            ))}
          </tr>
        ))}

      </tbody>
    </table>

    </>
  )
}

export default App
