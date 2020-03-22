//Navbar component
import React, { Component } from 'react'
import{
  Collapse, //the responsive hamburger menu
  Navbar,
  NavbarToggler, //toggle hamburger
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container //to move everything to middle
} from 'reactstrap'

export class AppNavbar extends Component {

  //we can declare state like this
  state = {
    isOpen: false
  }

  toggle=()=>{
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <Navbar color="dark" dark expand="sm" className="mb-5">
        {/*to wrap things in the middle*/}
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          {/*set this to whatever isOpen is in the state
          tell Collapse that this is for the navbar*/}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href="www.google.com">Google</NavLink>
              </NavItem>
            </Nav> 
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default AppNavbar
