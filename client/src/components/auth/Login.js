import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import { login } from '../../actions/authAction'
import { clearErrors } from '../../actions/errorAction'


export class LoginModal extends Component {

  state = {
    modal: false, //this tells whether modal open or not
    email: '',
    password: '',
    msg: '' //this is for displaying messages such as success, error etc.
  }

  componentDidUpdate(prevProps) {
    //we just want to see that error changed from previous. If yes then display
    const { error } = this.props //we took this error in props in mapStatetoProps
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        //now we set the msg of the state to the error msg
        this.setState({ msg: error.msg.msg }) //in redux tool we saw that msg is in msg.msg
      } else {
        this.setState({ msg: null })
      }
    }

    //if the modal is open and the person is authenticated, close it
    if (this.state.modal && this.props.isAuthenticated) {
      this.toggle()
    }
  }

  toggle = () => {
    //just before the toggle we clear all the errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal
    })
  }

  //this will allow the onChange method to be used for any attribute
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state

    const user = {
      email, password
    }

    //Attempt to login
    this.props.login(user);
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">Login</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}{/**checks whether there is any msg to be displayed in the state.msg and displays it */}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>

                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Email' className='mb-3' onChange={this.onChange} />

                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='Password' className='mb-3' onChange={this.onChange} />

                <Button color='dark' style={{ marginTop: '2rem' }} block>Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  //because we want to close the modal once we are authenticated
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
  //this all is from the root reducer
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
