import React, { Component } from "react";
import { ImageBackground, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { Text, View } from "native-base";

import ZoomLayout from "../../components/ZoomLayout";

import styles from "./styles";
import variables from "@theme/variables";

const width = variables.deviceWidth;
const height = variables.deviceHeight;

const ratio = 1.7;
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
    if (nextProps.x !== this.props.x) {
      this.onScroll(nextProps.x, nextProps.y, nextProps.scale);
    }
    console.log("nextProps.x,nextProps.y", nextProps.x, nextProps.y);
  }

  onScroll = (x, y, scale) => {
    
    this.zoomLayout.scrollTo(x, y, scale, true);
    console.log("onScrollonScrollonScrollonScroll", x, y, scale);
  };

  componentDidMount() {
    if (Platform.OS === "ios") {
      this.scale = setTimeout(() => {
        this.zoomLayout.setZoomScale();
      }, 10);
    } else {
      this.zoomLayout.setZoomScale();
    }
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
          ratio={ratio}
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
