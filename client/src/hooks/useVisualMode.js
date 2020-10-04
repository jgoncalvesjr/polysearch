import {useState} from 'react';

function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [multiplayer, setMultiplayer] = useState(false);
  const [gameId, setGameId] = useState('');
  const [hostId, setHostId] = useState('');

  //store GridRowSquare id being attempted on the board here
  const [attempts, setAttempts] = useState([]);
  
  //Array of arrays of solved GridRowSquare ids.
  //length of array is score.
  const [solved, setSolved] = useState([]);

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

  
  const back = () => {
    if(history.length > 1) {
      const newHistory = [...history.slice(0, history.length-1)];
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };
  const addAttempt = (id, row, col, replace = false) => {
    //console.log("adding first attempt", id);
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
    const tmpArray = [];
    setAttempts(tmpArray);
  }


  
  return {
    mode, 
    transition, 
    back, 
    difficulty, 
    setDifficulty, 
    attempts, 
    addAttempt, 
    solved, 
    SetCurrentSolved, 
    multiplayer, 
    setMultiplayer, 
    gameId, 
    setGameId, 
    hostId, 
    setHostId
  };
}

export default useVisualMode;