import React, { Component } from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
// import {v4 as uuid} from 'uuid'
import {connect} from 'react-redux'
import {getItems, deleteItems} from '../actions/itemActions'

export class ShoppingList extends Component {

  //Now we will come from our itemReducer so no need for this
  // state = {
  //   items: [
  //     {id: uuid(), name: 'Eggs'},
  //     {id: uuid(), name: 'Milk'},
  //     {id: uuid(), name: 'Steak'},
  //     {id: uuid(), name: 'Water'},
  //   ]
  // }

  componentDidMount(){
    //this is where we would call any actions
    this.props.getItems();
  }

  onDeleteClick=(id)=>{
    //now we will call the action in the redux
    this.props.deleteItems(id)
  }

  render() {

    const {items} = this.props.item //now this is where our state lives
    //const {items} = this.state;

    return (
      <div>
        <Container>
          {/* <Button
            color='dark'
            style={{marginBottom: '2rem'}}
            onClick={()=>{
              const name = prompt('Enter item: ')
              if(name){
                this.setState({
                  items: [...items, {id: uuid(), name: name}]
                })
              }
            }}
          >Add Item</Button> */}

          <ListGroup>
            <TransitionGroup className='shopping-list'>
              {/**mapping through the items now */
                items.map(({_id, name})=>(
                  <CSSTransition key={_id} timeout={500} classNames='fade'>
                    <ListGroupItem>
                      <Button className='remove-btn' color='danger' size='sm' onClick={this.onDeleteClick.bind(this, _id)}>
                      &times;
                      </Button>
                      {name}
                    </ListGroupItem>
                  </CSSTransition>
                ))
              }
            </TransitionGroup>
          </ListGroup>

        </Container>
      </div>
    )
  }
}

const mapStateToProps = state=>({
  //this item will be the same name as that in the rootReducer
  item: state.item
})

//now for redux instead of this we will use connect
//connect will take the mapStateToProps and any actions that we want to use
export default connect(mapStateToProps, {getItems, deleteItems})(ShoppingList)
