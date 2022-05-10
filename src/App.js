import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Routes from './Routes';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={ store }>
      <Routes />
    </Provider>
  );
}

export default App;
