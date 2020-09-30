import React from "react";
import './GameBoard.scss';


export default function GridRow(props) {

  const row = props.row.map(el => {
    return <div className='board-table-row-cell'>{el}</div>
  });

  return (
    <div className='board-table-row'>
      {row}
    </div>
  );
}