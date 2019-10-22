import { BrowserRouter, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Home from './pageComponents/Home';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import PlotsCollection from './pageComponents/PlotsCollection';
import CaptionModal from './pageComponents/CaptionModal';
import Demo from './pageComponents/Demo';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className='App'>
            < Route exact path='/' component = {Home} />
            < Route exact path='/plots-collection' component = {PlotsCollection} />
            < Route exact path='/contribute' component = {CaptionModal} />
            < Route exact path='/demo' component = {Demo} />

          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
