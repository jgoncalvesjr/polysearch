import React from "react";
import LeaderBoardItem from './LeaderBoardItem';

export default function LeaderBoard(props) {
  
  const boards = props.userBoards.map(el => {
    return <LeaderBoardItem 
      avatar={el.avatar}
      name={el.name}
      score={el.score}
      wordCount={props.wordCount}
    />
  });
  return (
    <div className='leader-board-container'>
      {boards}
    </div>
  );
}