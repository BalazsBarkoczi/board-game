import '../css/Cell.css'

function Cell({ value, row, col, color, handleCellClick, nextChar }) {
    return (
        <td
            className="border-2 border-black px-4 py-2 w-20 h-20 items-center text-center group"
            onClick={() => handleCellClick(row, col)}
        >
            <div className="relative w-full h-full flex items-center justify-center">

                {/*If the cell isn't empty show the value, if it's empty show to next charcter when hovered over the cell  */}
                {value ? (
                    <span className={color + " font-bold text-3xl"}>{value}</span> /* "font-bold text-3xl" */
                ) : (
                    nextChar && (
                        <span className="text-transparent group-hover:text-gray-400 font-bold text-lg">
                            {nextChar}
                        </span>
                    )
                )}
            </div>
        </td>
    );
}

export default Cell;
