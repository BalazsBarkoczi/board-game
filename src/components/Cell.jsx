import '../css/Cell.css';

function Cell({value, row, col, color, handleCellClick}){

    return(
        <td
            className={color}
            onClick={() => handleCellClick(row,col)}
        >
             {value}

        </td>
    );
}


export default Cell;