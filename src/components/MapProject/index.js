import React, { Component } from 'react'
import { ImageBackground, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Text, View } from 'native-base';

import ZoomLayout from '@components/ZoomLayout';

import styles from './styles';
import images from '@assets/images';
import variables from '@theme/variables';

const width = variables.deviceWidth;
const height = variables.deviceHeight;

const rootHeight = 1553;
const rootWidth = 2213;

const ratio = 1.7;

const minZoom = Platform.OS === 'ios' ? width / rootHeight : width / (rootHeight / ratio);
const maxZoom = DeviceInfo.isTablet() ? 5 : Platform.OS === 'ios' ? 2 : 3;

export default class MapProject extends Component {

  static defaultProps = {
    resizeMode: 'cover',
  }
  constructor(props) {
    super(props);
    this.state = {
    }

    this.scale = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x !== this.props.x)
      this.onScroll(nextProps.x, nextProps.y, nextProps.scale);
  }

  onScroll = (x, y, scale) => {
    this.zoomLayout.scrollTo(x, y, scale, true)
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.scale = setTimeout(() => {
        this.zoomLayout.setZoomScale()
      }, 10);
    } else {
      this.zoomLayout.setZoomScale()
    }
  }

  componentWillUnmount() {
    if (this.scale) clearTimeout(this.scale)
  }

  _measureContent = event => {
    const { width, height } = event.nativeEvent.layout;
    console.log("width: ", width, height)

  };

  render() {
    const { onView360, source, title, children, onPress } = this.props;
    return (
      <View style={styles.wrapper}>
        <ZoomLayout
          ref={ref => this.zoomLayout = ref}
          style={styles.zoomLayout}
          minZoom={minZoom}
          maxZoom={maxZoom}
          ratio={ratio}
          onLayout={this._measureContent}
        >
          <ImageBackground style={styles.imageMap} source={source}>
            {children}
          </ImageBackground>
        </ZoomLayout>

        {/* <TouchableOpacity style={styles.btnView360} onPress={onView360}>
          <Image source={images.i360} style={styles.img360} />
        </TouchableOpacity> */}
      </View >
    );
  }
}