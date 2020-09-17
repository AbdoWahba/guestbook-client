import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { setAuthState, setProfile, setRedirection } from '../store/actions';
import client, { refreshAuthHeaders } from '../api/client';

class LoginPage extends React.Component {
  state = { email: '', password: '', name: '' };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = this.state;
    client
      .post('/users/', { email, password, name })
      .then((res) => {
        const authToken = res.headers['x-auth-token'];
        localStorage.setItem('auth_token', authToken);
        refreshAuthHeaders();
        this.props.setAuthState(authToken);
        this.props.setProfile(res.data);
        this.props.setRedirection('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <FormGroup>
          <Label for='signupName'>Email</Label>
          <Input
            type='text'
            name='name'
            id='signupName'
            placeholder='enter you name'
            onChange={this.onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='signupEmail'>Email</Label>
          <Input
            type='email'
            name='email'
            id='signupEmail'
            placeholder='enter you email'
            onChange={this.onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='signupPassword'>Password</Label>
          <Input
            type='password'
            name='password'
            id='signupPassword'
            placeholder='enter your password'
            onChange={this.onInputChange}
          />
        </FormGroup>

        <Button>Sign up</Button>
      </Form>
    );
  }
}

export default connect(undefined, { setAuthState, setProfile, setRedirection })(
  LoginPage
);
