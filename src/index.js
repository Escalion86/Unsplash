import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import reducer from './reducers/index';

const store = createStore( reducer );

// store.dispatch({
//     type: 'LOAD_STORAGE'
// })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const detectScrollAtBottom = () => {
//   const windowHeight = window.innerHeight
//     ? window.innerHeight
//     : document.documentElement.offsetHeight;
//   const { body } = document;
//   const html = document.documentElement;
//   const docHeight = Math.max(
//     body.scrollHeight,
//     body.offsetHeight,
//     html.clientHeight,
//     html.scrollHeight,
//     html.offsetHeight
//   );
//   const windowBottom = Math.round(windowHeight + window.pageYOffset);

//   // Small hack for windows. It counts windowBottom in different way
//   const difference = docHeight - windowBottom;
//   const additional = difference >= 1 && difference <= 2 ? difference : 0;

//   return windowBottom + additional >= docHeight;
// };
