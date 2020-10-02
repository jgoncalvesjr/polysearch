import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function JoinGame(props) {

  const { gameid } = useParams();
  console.log(gameid);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/games/${gameid}`
    }).then(({ data }) => {
      console.log(data);
    })
      .catch(err => console.log(err));
  }, []);

  return <></>;
  
}