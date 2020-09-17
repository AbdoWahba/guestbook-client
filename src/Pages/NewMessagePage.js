import React from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import client from '../api/client';

export default class NewMessagePage extends React.Component {
  state = { title: '', body: '', recievers: '', visible: false, msg: '' };
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendMsg = (e) => {
    e.preventDefault();
    this.setState({ visible: false, msg: '' });
    const { title, body, recievers } = this.state;
    const list_receivers = recievers
      .replace(/(\r\n|\n|\r|\s)/gm, '')
      .split(',');
    client
      .post('/messages', {
        title,
        body,
        list_receivers,
        parent_id: '0',
      })
      .then((res) => {})
      .catch((err) => {
        this.setState({ visible: true, msg: err.response.data.msg });
      });
  };
  onDismiss = () => this.setState({ visible: false });

  render() {
    return (
      <div>
        <Form onSubmit={this.sendMsg}>
          <FormGroup>
            <Label for='msgTitle'>Title</Label>
            <Input
              type='text'
              name='title'
              id='msgTitle'
              placeholder='with a placeholder'
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='msgBody'>Body</Label>
            <Input
              type='textarea'
              name='body'
              id='msgBody'
              onChange={this.onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for='recievers'>List of recievers</Label>
            <FormText color='muted'>
              please enter list of recievers emails separated by commas
            </FormText>
            <Input
              type='textarea'
              name='recievers'
              id='exampleText'
              placeholder='please enter list of recievers emails separated by commas'
              onChange={this.onInputChange}
            />
          </FormGroup>

          <Button block>Send Message</Button>
        </Form>
        <Alert
          color='danger'
          isOpen={this.state.visible}
          toggle={this.onDismiss}>
          {this.state.msg}
        </Alert>
      </div>
    );
  }
}
