//Navbar component
import React, { Component, Fragment } from 'react'
import {
  Collapse, //the responsive hamburger menu
  Navbar,
  NavbarToggler, //toggle hamburger
  NavbarBrand,
  Nav,
  NavItem,
  Container //to move everything to middle
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/Login'
import { connect } from 'react-redux'

export class AppNavbar extends Component {

  //we can declare state like this
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {

    const { isAuthenticated, user } = this.props.auth
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout></Logout>
        </NavItem>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal></RegisterModal>
        </NavItem>
        <NavItem>
          <LoginModal></LoginModal>
        </NavItem>
      </Fragment>
    )

    return (
      <Navbar color="dark" dark expand="sm" className="mb-5">
        {/*to wrap things in the middle*/}
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          {/*set this to whatever isOpen is in the state
          tell Collapse that this is for the navbar*/}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {/**if authenticated then show logout else show register or login*/}
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar)
