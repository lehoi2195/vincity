import React, { Component } from "react";
import { ImageBackground, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { Text, View } from "native-base";

import ZoomLayout from "@components/ZoomLayout";

import styles from "./styles";
import variables from "@theme/variables";

const width = variables.deviceWidth;
const height = variables.deviceHeight;

const minZoom = 1;
const maxZoom = 5;

export default class MapProject extends Component {
  static defaultProps = {
    resizeMode: "cover"
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.scale = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x !== this.props.x)
      this.onScroll(nextProps.x, nextProps.y, nextProps.scale);
  }

  onScroll = (x, y, scale) => {
    this.zoomLayout.scrollTo(x, y, scale, true);
  };

  componentDidMount() {
    this.scale = setTimeout(() => {
      this.zoomLayout.setZoomScale();
    }, 10);
  }

  componentWillUnmount() {
    if (this.scale) clearTimeout(this.scale);
  }

  render() {
    const { onView360, source, title, children, onPress } = this.props;
    return (
      <View>
        <ZoomLayout
          ref={ref => (this.zoomLayout = ref)}
          style={styles.zoomLayout}
          minZoom={minZoom}
          maxZoom={maxZoom}
          zoomScale={3}
          imgRootHeight={width}
        >
          <ImageBackground
            resizeMode="contain"
            style={styles.imageMap}
            source={source}
          >
            {children}
          </ImageBackground>
        </ZoomLayout>

        {/* <TouchableOpacity style={styles.btnView360} onPress={onView360}>
          <Image source={images.i360} style={styles.img360} />
        </TouchableOpacity> */}
      </View>
    );
  }
}
