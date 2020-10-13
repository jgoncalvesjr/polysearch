import {useState} from 'react';

function useVisualMode(initMode, initGameLink) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [multiplayer, setMultiplayer] = useState(false);
  const [gameId, setGameId] = useState('');
  const [gameLink, setGameLink] = useState(initGameLink ? initGameLink : '');
  const [hostId, setHostId] = useState('');

  //set the duration of the current game.
  const [duration, setDuration] = useState('6:00');

  const [rcvdGameOverScore, setRcvdGameOverScore] = useState({});
  const [matchWinner, setMatchWinner] = useState([]);

  //store GridRowSquare id being attempted on the board here
  const [attempts, setAttempts] = useState([]);
  
  //Array of arrays of solved GridRowSquare ids.
  //length of array is score.
  const [solved, setSolved] = useState([]);
  const [opponentSolved, setOpponentSolved] = useState([]);
  const [rcvdOponentSolved,  setRcvdOponentSolved] = useState([]);

  const [broadcastScore, setBroadcastScore] = useState(false);
  const [score, setScore] = useState(0);


  const transition = (newMode, replace = false) => {
    if (replace) {
      const newHistory = [...history.slice(0, history.length-1), newMode];
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);      
    } else {
      setMode(newMode);
      const newHistory = [...history, newMode];
      setHistory(newHistory);
    }
  };
  const reset = newMode => {
    const newHistory = [newMode];
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);    
  };
  const back = () => {
    if(history.length > 1) {
      const newHistory = [...history.slice(0, history.length-1)];
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };
  const addAttempt = (id, row, col, replace = false) => {
    if (replace) {
      const newAtempts = [{id, row, col}];
      setAttempts(newAtempts);
    } else {
      const TmpAttempts = [...attempts, {id, row, col}];
      setAttempts(TmpAttempts);
    }
  };
  const SetCurrentSolved = () => {
    const tmpSolved = [...solved, attempts];
    setSolved(tmpSolved);
    localStorage.setItem('solved', JSON.stringify(attempts));
    const tmpArray = [];
    setAttempts(tmpArray);
    const tmpScore = score + 1;
    setScore(tmpScore);
    localStorage.setItem('score', tmpScore);
  }
  const updatOpponentSolved = (HostedGameSolved) => {
    const tmpSolved = [...opponentSolved, HostedGameSolved];
    setOpponentSolved(tmpSolved);
  };
  
  return {
    mode, 
    transition, 
    back, 
    reset,
    difficulty, 
    setDifficulty, 
    attempts, 
    addAttempt, 
    solved, 
    SetCurrentSolved, 
    multiplayer, 
    setMultiplayer, 
    duration, 
    setDuration,
    gameId, 
    setGameId, 
    hostId, 
    setHostId,
    broadcastScore,
    setBroadcastScore,
    score,
    opponentSolved, 
    setOpponentSolved,
    updatOpponentSolved,
    rcvdOponentSolved,  
    setRcvdOponentSolved,
    matchWinner, 
    setMatchWinner,    
    gameLink,
    rcvdGameOverScore, 
    setRcvdGameOverScore
  };
}

export default useVisualMode;