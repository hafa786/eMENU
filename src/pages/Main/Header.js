import React from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import Logo from 'assets/images/logo.png';
import User from './user.png';
// import './style.css';

const Header = ({
  showMobileMenu,
  toggleMobileNavVisibility,
}) => (
    // <Navbar fluid={true} style={{height: '77px', marginBottom: '0px', paddingLeft: '0px'}}>
      
    
      <Navbar.Collapse style={{paddingLeft: '0px'}}>

        <Nav pullLeft style={{paddingLeft: '0px'}}>
        <a style={{color: 'white'}} href="#/frontpage"><img src={Logo} style={{width: '210px', height: '85px', float: 'left'}} /></a>

        </Nav>

        <Nav pullRight>
      
          <img src={User} style={{width: '8%', height: '100%', float: 'right', marginTop: '25px'}} />
     
          {/* <NavItem >Account</NavItem>
          
          <NavItem >Log out</NavItem> */}
        </Nav>
      </Navbar.Collapse>
    // </Navbar>
  );

const mapDispatchToProp = dispatch => ({
  toggleMobileNavVisibility: () => dispatch(toggleMobileNavVisibility())
});

export default connect(null, mapDispatchToProp)(Header);