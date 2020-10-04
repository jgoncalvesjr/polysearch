import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UserProfile(props) {

  const userId = localStorage.userId;

  useEffect(() => {
    console.log(userId);
    axios({
      method: 'GET',
      url: `/api/users/${userId}`
    }).then(({ data }) => {
      console.log(data);
    })
      .catch(err => console.log(err));
  }, []);

  return <>test</>;
  
}