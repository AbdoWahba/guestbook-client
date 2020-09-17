import React, { useEffect } from 'react';
import client from '../api/client';

export default function InboxPage() {
  useEffect(() => {
    client
      .get('/messages/inbox')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div></div>;
}
