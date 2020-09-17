import React, { useEffect } from 'react';
import client from '../api/client';

export default function OutboxPage() {
  useEffect(() => {
    client
      .get('/messages/outbox')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div></div>;
}
