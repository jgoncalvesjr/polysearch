import React from "react";

import './GridRowSquare.scss';
const classNames = require('classnames');

export default function GridRowSquare(props) {

  const squareClass = classNames('board-table-row-cell', {'attempting': props.attempting, 'solved': props.solved}); 
  /*
      props.solved
        ? <div id={props.id} className={squareClass}>{props.content}</div>
        : <div id={props.id} className={squareClass}
            onClick={() => props.selectGameContent(props.id)}
          >
            {props.content}
          </div>  
  */
  return(
        <div id={props.id} className={squareClass}
            onClick={() => props.selectGameContent(props.id)}
        >
           {props.content}
        </div>
    ); 
}
