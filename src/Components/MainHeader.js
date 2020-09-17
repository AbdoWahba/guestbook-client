import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import LoggedInNav from './LoggedInNav';
import { useSelector } from 'react-redux';
import NotLoggedNav from './NotLoggedNav';
const MainHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn, userName } = useSelector((state) => {
    return {
      isLoggedIn: state.isAuthenticated,
      userName: state.accountProfile.name,
    };
  });
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <NavbarBrand>Geustbook</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {isLoggedIn && localStorage.getItem('auth_token') ? (
            <LoggedInNav userName={userName} />
          ) : (
            <NotLoggedNav />
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainHeader;
