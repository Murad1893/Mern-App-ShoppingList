import React, { Component } from 'react'
import { logout } from '../../actions/authAction'
import { connect } from 'react-redux'
import { NavLink } from 'reactstrap'

export class Logout extends Component {
  render() {
    return (
      <div>
        <NavLink onClick={this.props.logout} href="#">Logout</NavLink>
      </div>
    )
  }
}

export default connect(null, { logout })(Logout)
