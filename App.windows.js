import React, { Component } from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";

import getTheme from "./theme/components";
import variables from "./theme/variables";
import AppContainer from "./src";
import store from "./src/store";

// console.disableYellowBox = true;

export default class App extends Component {
  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </StyleProvider>
    );
  }
}
