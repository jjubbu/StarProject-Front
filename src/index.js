import React from "react";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { GlobalStyle } from "./shared/global";
import { BrowserRouter } from "react-router-dom";
import { hydrate, render } from "react-dom";

import App from "./shared/App";

import store from "./redux/configureStore";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
}

reportWebVitals();
