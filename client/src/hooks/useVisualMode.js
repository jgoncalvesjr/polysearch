import {useState} from 'react';

function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [difficulty, setDifficulty] = useState("Easy");

  return {mode, setMode, difficulty, setDifficulty};
}

export default useVisualMode;