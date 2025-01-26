import '../css/Cell.css';

function Cell({value, row, col, color}){

    return(
        <td
            className={color}
        >
            {value}:{row},{col}

        </td>
    );
}


export default Cell;