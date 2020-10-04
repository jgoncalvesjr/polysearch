import {useState} from 'react';

function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [difficulty, setDifficulty] = useState("Easy");
  const [multiplayer, setMultiplayer] = useState(false);

  //store GridRowSquare id being attempted on the board here
  const [attempts, setAttempts] = useState([]);
  
  //Array of arrays of solved GridRowSquare ids.
  //length of array is score.
  const [solved, setSolved] = useState([]);

  //set the duration of the current game.
  const [duration, setDuration] = useState('7:00');

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

  return {mode, setMode, difficulty, setDifficulty, attempts, addAttempt, 
    solved, SetCurrentSolved, multiplayer, setMultiplayer, duration, setDuration
  };
}

export default useVisualMode;