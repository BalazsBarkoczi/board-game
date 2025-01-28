import '../css/Cell.css';

function Cell({ value, row, col, color, handleCellClick }) {

    return (
        <td
        className={'border-2 border-black px-4 py-2 w-20 h-20 items-center text-center '}
        onClick={() => handleCellClick(row, col)}
        >
        <div className={`text-${color}-600 font-bold text-lg`}>
            {value}
        </div>
        </td>
    );
}


export default Cell;