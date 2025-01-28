import Cell from './Cell'
import { useState } from 'react'

function Board() {

    //Constant variables
    const ROW_COUNT = 5;
    const COL_COUNT = 5;
    const MIN_LINE_LENGTH = 3;

    //State variables
    const [board, setBoard] = useState(Array(ROW_COUNT).fill(Array(COL_COUNT).fill(null)));
    const [lines, setLines] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [currentCharIndex, setCurrentCharIndex] = useState(0); // 0: C, 1: M, 2: T

    const characters = ['C', 'M', 'T'];


    const handleCellClick = (row, col) => {

        //Don't do anything if the cell is already filled or the game has ended
        if (board[row][col] !== null || gameOver) return;

        //Create a new board and update the clicked cell with the current character
        const updatedBoard = board.map((boardRows, i) => (
            boardRows.map((cell, j) => (
                i === row && j == col ? { char: characters[currentCharIndex], color: "black" } : cell
            ))
        ));

        setBoard(updatedBoard);
        setCurrentCharIndex((prev) => (prev + 1) % characters.length); //Move to the next char index

        //Check if new lines are created and color the characters
        checkLines(updatedBoard, row, col);

        //Check if the board if full
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

    //Function to check lines after each click
    const checkLines = (board, row, col) => {
        const activeChar = board[row][col].char; //Just placed character

        const directions = [
            [1, 0], //down
            [0, 1], //right
            [1, 1], //bottom right
            [1, -1] //bottom left
        ];


        directions.forEach(([iDir, jDir]) => {

            //Count consecutive cells in both directions
            let firstHalfCount = countConsecutive(board, row, col, iDir, jDir, activeChar);
            let secondHalfCount = countConsecutive(board, row, col, -iDir, -jDir, activeChar);

            //If a new or a longer line is formed color it
            if (firstHalfCount + secondHalfCount + 1 >= MIN_LINE_LENGTH) {
                colorLines(board, row, col, iDir, jDir, firstHalfCount, secondHalfCount, activeChar);
            }

            //Check if a new line is created or just expanding an already counted line
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

    //Helper function to count consecutive cells in a given direction
    const countConsecutive = (board, row, col, iDir, jDir, activeChar) => {
        let count = 0;

        let i = row + iDir;
        let j = col + jDir;

        //Keep counting while the cell contains the same character and is within bounds
        while (i >= 0 && i < ROW_COUNT && j >= 0 && j < COL_COUNT && board[i][j]?.char === activeChar) {
            count++;
            i += iDir;
            j += jDir;
        }

        return count;
    }

    //Helper function to color lines
    const colorLines = (board, row, col, iDir, jDir, firstHalfCount, secondHalfCount, activeChar) => {
        const color = {
            "C": "green",
            "M": "blue",
            "T": "red"

        }

        const updatedBoard = JSON.parse(JSON.stringify(board)); //Deep copy

        //From one end of the line color each til the other end of the line based on the given direction
        for (let k = 0; k < firstHalfCount + secondHalfCount + 1; k++) {
            const startRowPos = row + iDir * firstHalfCount;
            const startColPos = col + jDir * firstHalfCount;

            updatedBoard[startRowPos + iDir * -k][startColPos + jDir * -k].color = color[activeChar];
        }

        setBoard(updatedBoard);
    }

    return (
        <>
            {/* Game Board */}
            <table className="border-collapse border border-black mx-auto">
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <Cell
                                    key={`${rowIndex}-${colIndex}`}
                                    value={cell?.char}
                                    row={rowIndex}
                                    col={colIndex}
                                    color={cell?.color}
                                    handleCellClick={handleCellClick}
                                    nextChar={board[rowIndex][colIndex] === null ? characters[currentCharIndex] : null}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Game Over Card */}
            {gameOver && (
                <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                    <p className="text-2xl font-bold text-center">GAME OVER</p>
                    <p className="mt-4 text-lg text-center">
                        {lines > 0 ?
                            `Congratulations, you have ${lines} lines!` : "You have no lines, try again!"
                        }

                    </p>
                    <div className="mt-6 text-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={resetGame}
                        >
                            Reset Game
                        </button>
                    </div>
                </div>
            )}

            {/* Reset Button, hide it if the Card is displayed */}
            {!gameOver && (
                <div className='flex justify-center my-10'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={resetGame}
                    >
                        Reset
                    </button>
                </div>
            )}

        </>
    )
}

export default Board;