import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './data/configureStore';
import './index.css';

const store = configureStore();

const app= (
   <Provider store={store}>
      <BrowserRouter basename="/">
        <div>
          <App/>
        </div>
      </BrowserRouter>
    </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    app,
    document.body.appendChild(document.createElement("div"))
  );
});