import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import {connect} from 'react-redux'
import {addItem} from '../actions/itemActions'

export class itemModal extends Component {

  state={
    modal: false,
    name: ''
  }

  toggle=()=>{
    this.setState({
      modal: !this.state.modal
    })
  }

  //this will allow the onChange method to be used for any attribute
  onChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e =>{
    e.preventDefault();

    const newItem = {
      //id: uuid(), no need for this is as in mongodb an id is created by itself
      name: this.state.name //because already changed from onChange()
    }

    //now we will call the action from the redux state
    this.props.addItem(newItem);

    //in order to close the window
    this.toggle()
  }

  render() {
    return (
      <div>
        <Button color='dark' style={{marginBottom: '2rem'}} onClick={this.toggle}>Add Item</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input type='text' name='name' id='item' placeholder='Add Shopping Item' onChange={this.onChange}/>
                <Button color='dark' style={{marginTop:'2rem'}} block>Add Item</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state=>({
  item: state.item
})


export default connect(mapStateToProps, {addItem})(itemModal)
