import {useState} from 'react';

function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [difficulty, setDifficulty] = useState("Easy");

  //store GridRowSquare id being attempted on the board here
  const [currentAttempts, setCurrentAttempts] = useState([]);
  
  //Array of arrays of solved GridRowSquare ids.
  //length of array is score.
  const [solvedAttempts, setSolvedAttempts] = useState([]);

  const attempt = (id) => {
    const attempts = [...currentAttempts, id];
    setCurrentAttempts(attempts);
  };
  const solved = () => {
    const tmpSolved = [...solvedAttempts, currentAttempts];
    setSolvedAttempts(tmpSolved);
    setCurrentAttempts({});
  }

  return {mode, setMode, difficulty, setDifficulty, currentAttempts, attempt, solvedAttempts, solved};
}

export default useVisualMode;