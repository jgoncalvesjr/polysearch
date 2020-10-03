import React from "react";
import './GameBoard.scss';
import GridRowSquare from './GridRowSquare';


export default function GridRow(props) {

  const getSolved = id => {
    if (!props.solved) {
      return false;
    }
    return props.solved.flat().find(el => el.id === id)? true : false;
  };

  const getAttempted = id => {
    if (!props.attempts) {
      return false;
    }
    return props.attempts.find(el => el.id === id)? true : false;
  };
  const row = props.row.map((el, index) => {
    const id = `${props.rowid}-${index}`;
    const attempting = getAttempted(id);
    const solved = getSolved(id);
      return <GridRowSquare 
        key={id} 
        id={id} 
        content={el} 
        attempting={attempting}
        solved={solved}         
        selectGameContent={props.selectGameContent}
      />
  });

  return (
    <div className='board-table-row'>
      {row}
    </div>
  );
}