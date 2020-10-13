import React from "react";

import './LeaderBoardItem.scss'

export default function LeaderBoardItem(props) {

  return (
    <div className="leaderboard-label-container">
      <div class="leaderboard-label-avatar"><img src={props.avatar} alt="avatar" /></div>
      <div className="leaderboard-label-text-container">
        <div className="leaderboard-label-text-user">{props.name}</div>
        <div className="leaderboard-label-text">{props.score}/{props.wordCount}</div>
      </div>
    </div>    
  );
}