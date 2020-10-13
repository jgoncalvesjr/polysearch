import React, { Fragment, useEffect, useState } from "react";
import DifficultyButton from "../DifficultyButton";
import NewGameSetup from '../NewGameSetup';
import GameBoard  from '../GameBoard';
import GameOverBoard from '../GameOverBoard';
import useVisualMode from "../../hooks/useVisualMode";
import HiddenWordsList from "../HiddenWordsList";

import GameLobby from "../GameLobby";
import GameHome from "../GameHome";
import Chat from "../Chat";
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

const HOME = "HOME";
const SETUP = "SETUP";
const NEWGAME = "NEWGAME";
const ENDGAME = "ENDGAME";
const GAMELOBBY = "GAMELOBBY";

const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
const DIAGANOL_LEFT_UP = "DIAGANOL_LEFT_UP";
const DIAGANOL_LEFT_DOWN = "DIAGANOL_LEFT_DOWN";
const DIAGANOL_RIGHT_UP = "DIAGANOL_RIGHT_UP";
const DIAGANOL_RIGHT_DOWN = "DIAGANOL_RIGHT_DOWN";

export default function Game(props) {

    const {
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
    } = useVisualMode(
      HOME,
      props.gameLink ? props.gameLink : undefined //multiplayer link.
      );
    useEffect(() => {
      if(gameLink) {
        retrieveMultiplayerGame();
      }
    }, [gameLink]);

    useEffect(() => {
      if(gameId) {
        if(multiplayer) {
          localStorage.setItem('gameId', gameId);
          transition(GAMELOBBY);
        } else {
          transition(NEWGAME)
        }
      }
    }, [gameId]);  

    const getLanguageDescription = (languageCode) => {
      switch(languageCode)
      {
        case 'br': 
          return 'Português';
        case 'en': 
          return 'English';
        case 'fr': 
          return 'Français';
        case 'es':
          return 'Español';
        case 'it':
          return 'Italiano';
      }
    };
    
    function removeDuplicates(array) {
      return array.filter((a, b) => array.indexOf(a) === b)
    };
    
    const getGameLanguages = () => {
      if(props.game != null) {
        return removeDuplicates(props.game.words.map(word => {
          return getLanguageDescription(word.language);
        }));
      }
      return null;
    }
    
    const checkSolved = () => {
      const localUserName = localStorage.getItem('username') ? localStorage.getItem('username') : localStorage.getItem('guestuser');
      const localUserAvatar = localStorage.getItem('avatar');
      if (attempts.length === 0) {
        return;
      }
      //go through current attempts and see if it match any words on the board
      const WordArray = attempts.map(el => {
        return props.game.rows[el.row][el.col];
      })
      let word = WordArray.join('');
      let found = props.game.words.find(gameWord => word === gameWord.word.toUpperCase());
      if (found) {
        SetCurrentSolved();
        if(multiplayer) {
          const localScore = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
          socket.emit('gameData', {HostedGameId:gameId, name:localUserName, score: localScore, avatar: localUserAvatar});
          socket.emit('solved', {HostedGameId: gameId, HostedGameSolved:localStorage.getItem('solved')});
          return;
        }
      }
      word = WordArray.reverse().join('');
      found = props.game.words.find(gameWord => word === gameWord.word.toUpperCase());
      if (found) {
        SetCurrentSolved();
        if(multiplayer) {
          const localScore = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
          socket.emit('gameData', {HostedGameId:gameId, name:localUserName, score: localScore, avatar: localUserAvatar});
          socket.emit('solved', {HostedGameId: gameId, HostedGameSolved:localStorage.getItem('solved')});
          return;
        }
      }    
  };

  useEffect(() => {
    checkSolved();
  }, [attempts]);
  const cancelScreen = () => {
    back();
  };
  const newGame = () => {
    transition(SETUP);
  };

  const joinGame = () => {
    alert("join game");
  };

  const resumeGame = () => {
    alert("resume game");
  }; 
  const retrieveMultiplayerGame = () => {
    props.startMultiplayerGame(gameLink) 
    .then(({data_hostId, link, difficultyLevel, bolMultiplayer, gameDuration}) => {
      setHostId(data_hostId);
      setDifficulty(difficultyLevel);
      setDuration(gameDuration)
      setMultiplayer(bolMultiplayer);
      setGameId(link);
    })
    .catch(error => {
    })
  };

  const startGame = () => {
    props.getNewGame(multiplayer, difficulty, duration) //if multiplayer, need to send game id.
    .then(({data_hostId, link, difficultyLevel, bolMultiplayer, gameDuration}) => {
      setHostId(data_hostId);
      setGameId(link);
    })
    .catch(error => {
      console.log("startGame Error", error);
    })
  };

  useEffect(() => {
    socket.on('start', ({ HostedGameId}) => {
      if (HostedGameId === gameId) {
        onHostedGameStart();
      }
    });
  }, [gameId]);

  useEffect(() => {  
    socket.on('solved', ({HostedGameId, HostedGameSolved}) => {
       if (HostedGameId === gameId) {
        const objSolved = JSON.parse(HostedGameSolved);
        setRcvdOponentSolved(objSolved);
       }
    });  
  }, [gameId]);

  useEffect(() => {
    if(rcvdOponentSolved.length > 0) {
      const tmp = [...opponentSolved, rcvdOponentSolved];
      setOpponentSolved(tmp);
    }
  }, [rcvdOponentSolved]);

  useEffect(() => {
    if(mode === ENDGAME && multiplayer) {
      const userName = localStorage.getItem('username') ? localStorage.getItem('username') : localStorage.getItem('guestuser');
      socket.emit('GameOverScore', {HostedGameId: gameId,  name: userName, score: solved.length, avatar: localStorage.getItem('avatar')});
    }
  }, [mode]);

  useEffect(() => {
    socket.on('GameOverScore', ({HostedGameId,  name, score, avatar}) => {
      if (HostedGameId === gameId) {
        setRcvdGameOverScore({name, score: score ? parseInt(score) : 0, avatar});
      }
    });
  }, [gameId]);

  useEffect(() => {
    if(Object.keys(rcvdGameOverScore).length > 0) {
      const tmpGameOverScore = [...matchWinner, rcvdGameOverScore];
      setMatchWinner(tmpGameOverScore);
    }
  }, [rcvdGameOverScore]);

  const onHostedGameStart = () => {
    transition(NEWGAME);
  }
  const startMultiPlayerGame = () => {
    socket.emit("start", {'HostedGameId': gameId });
    onHostedGameStart();
  };
  

  const playAgain = () => {

  };
  const joinPolySearch = () => {

  };
  const showMain = () => {
    reset(HOME);
  };
  // =====================================================
  const validateMove = (row, col, direction) => {
    if (direction === LEFT) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row}-${col - (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;
        }
        return true;
    }
    if (direction === RIGHT) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row}-${col + (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;
        }
        return true;        
    }
    if (direction === UP) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row - (i + 1)}-${col}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;
        }
        return true;        
    } 
    if (direction === DOWN) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row + (i + 1)}-${col}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;
        }
        return true;        
    }
    if (direction === DIAGANOL_LEFT_UP) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row - (i + 1)}-${col - (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;            
        }
        return true; 
    }
    if (direction === DIAGANOL_LEFT_DOWN) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row  + (i + 1)}-${col - (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;            
        }
        return true; 
    }    
    if (direction === DIAGANOL_RIGHT_UP) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row  - (i + 1)}-${col + (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;            
        }
        return true; 
    }     
    if (direction === DIAGANOL_RIGHT_DOWN) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row  + (i + 1)}-${col + (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;            
        }
        return true; 
    } 
    return false;
  }
  const connectMoves = id => {
    const [row, col] = id.split('-').map(function(el){
        return parseInt(el);
    });
    if (attempts.length == 0) {
        addAttempt(id, row, col);
        return;
    }
    if (validateMove(row, col, LEFT)
      || validateMove(row, col, RIGHT)
      || validateMove(row, col, UP)
      || validateMove(row, col, DOWN)
      || validateMove(row, col, DIAGANOL_LEFT_UP)
      || validateMove(row, col, DIAGANOL_LEFT_DOWN)
      || validateMove(row, col, DIAGANOL_RIGHT_UP)
      || validateMove(row, col, DIAGANOL_RIGHT_DOWN)) {
        addAttempt(id, row, col);
      } else { //Not valid. start new attempts
        addAttempt(id, row, col, true);
      } 
  }

  const selectGameContent = id => {
    connectMoves(id);
  };

  const endGame = () => {
    transition(ENDGAME);
  };
  
  const setGameDuration = time => {
    setDuration(time);
  };

  return(
    <div>
      {mode === HOME && <GameHome 
        newGame={newGame}
        joinGame={joinGame}
        resumeGame={resumeGame}
      />}
      {mode === SETUP && <NewGameSetup 
        startGame={startGame} 
        cancelScreen={cancelScreen}
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
        multiplayer={multiplayer}
        setMultiplayer={setMultiplayer}
        duration={duration}
        setGameDuration={setGameDuration}
      />}
      {mode === GAMELOBBY && <GameLobby
        startMultiPlayerGame={startMultiPlayerGame}
        cancelScreen={cancelScreen}
        duration={duration}
        difficulty={difficulty}
        gameMode={duration ? 'Time Attack' : 'Chill'}
        hostOfGame={hostId}
        link={gameId}
        languages={getGameLanguages()}
      />}
      {mode === NEWGAME && <GameBoard 
        game={props.game}
        selectGameContent={selectGameContent}
        attempts={attempts}
        solved={solved}
        opponentSolved={opponentSolved}
        endGame={endGame}
        multiplayer={multiplayer}
        duration={duration}
        score={score}
        cancelScreen={cancelScreen}
      />}
      {mode === ENDGAME && <GameOverBoard 
        game={props.game}
        playAgain={playAgain}
        joinPolySearch={joinPolySearch}
        showMain={showMain}
        attempts={attempts}
        solved={solved}
        opponentSolved={opponentSolved}
        endGame={endGame}
        multiplayer={multiplayer}
        duration={duration} 
        score={score}  
        matchWinner={matchWinner}
      />}
      {(mode ===  NEWGAME || mode === GAMELOBBY || mode === ENDGAME) && multiplayer &&
      <Chat loggedUser={localStorage.getItem('username')} />
      }
    </div>
  );
}
