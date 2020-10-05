import {useState} from 'react';

function useVisualMode(initMode, initGameId) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [multiplayer, setMultiplayer] = useState(false);
  const [gameId, setGameId] = useState(initGameId);
  const [hostId, setHostId] = useState('');

  //store GridRowSquare id being attempted on the board here
  const [attempts, setAttempts] = useState([]);
  
  //Array of arrays of solved GridRowSquare ids.
  //length of array is score.
  const [solved, setSolved] = useState([]);

  const [broadcastScore, setBroadcastScore] = useState(false);
  const [score, setScore] = useState(0);

  //set the duration of the current game.
  const [duration, setDuration] = useState('6:00');

  const transition = (newMode, replace = false) => {
    if (replace) {
      //cannot use back() here I think for the same reason mentioned below about mode.
      const newHistory = [...history.slice(0, history.length-1), newMode];
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);      
    } else {
      setMode(newMode);
      const newHistory = [...history, newMode];//cannot use mode here because even though setMode has bein called, it has not rendered yet.
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
  const updateLatestSolved = (HostedGameSolved) => {
    const tmpSolved = [...solved, HostedGameSolved];
    setSolved(tmpSolved);
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
    updateLatestSolved,
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
    score
  };
}

export default useVisualMode;