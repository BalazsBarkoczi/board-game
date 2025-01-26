import { useState } from 'react'
import './css/App.css'
import Cell from './components/Cell';

function App() {

  const ROW_COUNT = 5;
  const COL_COUNT = 5;

  const [board, setBoard] = useState(Array(ROW_COUNT).fill(Array(COL_COUNT).fill('')));


  return (
    <>

    <h1>CMT BOARD GAME</h1>

    <table className='main-board'>
      <tbody>

        {board.map((row, rowIndex)=>(
          <tr key={rowIndex}>
            {row.map((cell,colIndex)=>(
              <Cell key={`${rowIndex}-${colIndex}`} value={'X'} row={rowIndex} col={colIndex} color={'black'}  />
            ))}
          </tr>
        ))}

      </tbody>
    </table>

    </>
  )
}

export default App
