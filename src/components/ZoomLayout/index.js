import React, { Component } from "react";
import { Dimensions, Platform, ScrollView } from "react-native";
import DeviceInfo from "react-native-device-info";
const { width, height } = Dimensions.get("window");

export default class ZoomLayout extends Component {
  state = {
    zoomScale: this.props.zoomScale || 2
  };
  static defaultProps = {
    minZoom: 1,
    maxZoom: 3,
    width,
    height
  };

  refZoomLayout = ref => {
    this.zoomLayout = ref;
  };

  setZoomScale = () => {
    const { ratio, imgRootHeight } = this.props;
    this.setState({ zoomScale: width / imgRootHeight });
  };

  scrollTo = (x, y, scale, animated) => {
    this.zoomLayout.scrollTo({ x, y, animated });
    this.setState({ zoomScale: scale });
  };

  render() {
    const { minZoom, maxZoom, children, style, ratio } = this.props;
    const { zoomScale } = this.state;
    return (
      <ScrollView
        ref={this.refZoomLayout}
        onScroll={event => {
          console.log("onScroll", event.nativeEvent);
        }}
        contentContainerStyle={style}
        maximumZoomScale={maxZoom}
        minimumZoomScale={minZoom}
        zoomScale={zoomScale}
        bounces={false}
        zoomEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }
}
