import { Link } from 'react-router-dom';
import React from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';

const NotLoggedNav = () => (
  <Nav className='ml-auto' navbar>
    <NavItem>
      <Link to='/'>
        <NavLink>Home</NavLink>
      </Link>
    </NavItem>
    <NavItem>
      <Link to='/login'>
        <NavLink>Login</NavLink>
      </Link>
    </NavItem>
    <NavItem>
      <Link to='/signup'>
        <NavLink>Sign up</NavLink>
      </Link>
    </NavItem>
  </Nav>
);

export default NotLoggedNav;
