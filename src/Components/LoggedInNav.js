import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState, setProfile } from '../store/actions';
import { refreshAuthHeaders } from '../api/client';
import {
  Nav,
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

const LoggedInNav = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(setAuthState(false));
    dispatch(setProfile(false));
    localStorage.clear();
    refreshAuthHeaders();
  };
  return (
    <Nav className='ml-auto' navbar>
      <NavItem>
        <Link to='/'>
          <NavLink>Home</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link to='/inbox'>
          <NavLink>Inbox</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link to='/outbox'>
          <NavLink>Outbox</NavLink>
        </Link>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Hi, {props.userName}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            onClick={() => {
              logoutHandler();
            }}>
            LogOut
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );
};

export default LoggedInNav;
