import React, { Component } from "react";
import {
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import { Container, Text, View } from "native-base";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";

import styles from "./styles";
import images from "@assets/images";
import { getAllProjects } from "@store/actions";
import { getToken } from "@store/selectors";
import variables from "@theme/variables";
import ZoomLayout from "@components/ZoomLayout";
import { defineProject } from "@constants/define";
const { width, height } = Dimensions.get("window");

const regionWidth = width;
const regionHeight = height;

const ratio = 1;
const minZoom = width / regionWidth;
const maxZoom = 2.5;

class HomeScreen extends Component {
  state = {
    data: null,
    srcHighLight: images.opacityOPSmall,
    backgroundColor: "rgba(0,0,0,0.3)"
  };

  componentDidMount() {
    const index = defineProject.findIndex(proj => proj.key === "OCEAN_PARK");
    console.log("index", index);
    if (index >= 0) {
      const data = {
        ...defineProject[index],
        ...{ _id: defineProject[index]._id }
      };
      this.setState({
        data
      });
    }
  }

  render() {
    const { data, backgroundColor, srcHighLight } = this.state;
    console.log("hight light", data);
    if (data !== null)
      return (
        <View center style={{ flex: 1 }}>
          <View row style={styles.wrapper}>
            <View style={[styles.ground, { backgroundColor }]}>
              <ZoomLayout
                ref={ref => (this.zoomLayout = ref)}
                style={[styles.zoomLayout, { flexWrap: "nowrap" }]}
                minZoom={minZoom}
                maxZoom={maxZoom}
                cropWidth={width}
                cropHeight={height}
                imageWidth={regionWidth}
                imageHeight={regionHeight}
                imgRootHeight={regionHeight}
                ratio={1}
              >
                <ImageBackground
                  resizeMode={"contain"}
                  style={styles.imageMap}
                  source={data.regionMap}
                >
                  
                </ImageBackground>
                <TouchableOpacity
                  style={[
                    styles.btnDetail,
                    {
                      width: data.btnHighlight.width,
                      height: data.btnHighlight.height,
                      position: "absolute",
                      top: data.btnHighlight.top,
                      left: data.btnHighlight.left,
                      zIndex: 999999
                    }
                  ]}
                  onPress={this.onSubdivision}
                >
                  <Text black bold style={{ fontSize: 20 }}>
                    {data.name}
                  </Text>
                </TouchableOpacity>
              </ZoomLayout>
            </View>
          </View>
        </View>
      );
    else return <View style={{ flex: 1 }} />;
  }
}
const mapStateToProps = state => {
  console.log("redux", state);
  return {
    token: getToken(state),
    allProjects: state.user.allProjects
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllProjects
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
