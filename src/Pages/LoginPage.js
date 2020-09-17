import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { setAuthState, setProfile, setRedirection } from '../store/actions';
import client, { refreshAuthHeaders } from '../api/client';

class LoginPage extends React.Component {
  state = { email: '', password: '' };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    client
      .post('/auth/', { email, password })
      .then((res) => {
        const { user, authToken } = res.data;
        localStorage.setItem('auth_token', authToken);
        refreshAuthHeaders();
        this.props.setAuthState(authToken);
        this.props.setProfile(user);
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
          <Label for='loginemail'>Email</Label>
          <Input
            type='email'
            name='email'
            id='loginemail'
            placeholder='enter you email'
            onChange={this.onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='loginpassword'>Password</Label>
          <Input
            type='password'
            name='password'
            id='loginpassword'
            placeholder='enter your password'
            onChange={this.onInputChange}
          />
        </FormGroup>

        <Button>Login</Button>
      </Form>
    );
  }
}

export default connect(undefined, { setAuthState, setProfile, setRedirection })(
  LoginPage
);
