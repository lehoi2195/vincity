import React, { Component } from "react";
import { StatusBar, View } from "react-native";
import { Root } from "native-base";
import { connect } from "react-redux";

import Router from "./router";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Root>
        <Router />
      </Root>
    );
  }
}
