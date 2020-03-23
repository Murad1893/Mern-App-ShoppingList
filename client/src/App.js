import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import { Provider } from 'react-redux'
import store from './store'
import ItemModal from './components/itemModal'
import { Container } from 'reactstrap'
import { loadUser } from './actions/authAction'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser()) //so this will directly call this function when the app loads
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar></AppNavbar>
          <Container>
            <ItemModal></ItemModal>
            <ShoppingList></ShoppingList>
          </Container>
        </div>
      </Provider>
    );
  }

}

export default App;
