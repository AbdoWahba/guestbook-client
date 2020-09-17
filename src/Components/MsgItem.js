import React from 'react';
import { Col, Row } from 'reactstrap';
export default function MsgItem(props) {
  return (
    <div>
      <Row>
        <Col>{props.auther}</Col>
        <Col>{props.title}</Col>
        <Col>{props.date}</Col>
      </Row>
    </div>
  );
}
