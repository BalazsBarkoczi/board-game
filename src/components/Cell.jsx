function Cell({ value, row, col, color, handleCellClick, nextChar }) {
    return (
      <td
        className="border-2 border-black px-4 py-2 w-20 h-20 items-center text-center group"
        onClick={() => handleCellClick(row, col)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {value ? (
            <span className={`text-${color}-600 font-bold text-3xl`}>{value}</span>
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
  