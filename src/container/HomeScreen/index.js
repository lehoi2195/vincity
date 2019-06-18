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
import { defineProject } from "../../constants/define";
const { width, height } = Dimensions.get("window");

const regionWidth = width;
const regionHeight = height;

const ratio = 1;
const minZoom = 1;
const maxZoom = 2.5;

class HomeScreen extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   data: { ...defineProject[0], ...{ _id: props.project[0]._id } },
    //   srcHighLight: images.opacityOPSmall,
    //   backgroundColor: "rgba(0,0,0,0.3)"
    // }
    this.state = {
      data: { ...defineProject[0], ...{ _id: props.project[0]._id } },
      // data :null,
      // title: 'Bản đồ liên kết vùng',
      // isFocus: true,
      // hidden: true,
      backgroundColor: 'rgba(0,0,0,0.3)',
      srcHighLight: images.opacityOPSmall,
      // isDidMount: false,
      // isVisible: false,
      // showView: false,
  };
  }

  componentDidMount() {
    const index = defineProject.findIndex(proj => proj.key === "OCEAN_PARK");
    console.log("defineProjecdasdsadat" , defineProject[0])
    console.log("llklklkklklkl" , this.props.project[0]._id)
    console.log("11111111" , index )

  //   console.log("index", index);
    if (index >= 0) {
      const data = {
        ...defineProject[index],
        ...{ _id: this.props.project[index]._id }
      };
      this.setState({ data} , ()=>{console.log("sadasdasdasd" , data )});
    }
  }

  onSubdivision = () => {
    const { data } = this.state;
    console.log("BuiHongson1996" , data)
    this.props.navigation.navigate("MapScreen", { data });
  };

  render() {
    const { data, backgroundColor, srcHighLight } = this.state;
    if (data !== null)
      return (
        <View center style={{ flex: 1 }}>
          <View row style={styles.wrapper}>
            <View style={[styles.ground, { backgroundColor: "#FFFCF5" }]}>
              <ZoomLayout
                ref={ref => (this.zoomLayout = ref)}
                style={[styles.zoomLayout, { flexWrap: "nowrap" }]}
                minZoom={minZoom}
                maxZoom={maxZoom}
                ratio={1}
              >
                <ImageBackground
                  resizeMode={"contain"}
                  style={styles.imageMap}
                  source={data.regionMap}
                >
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
                </ImageBackground>
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
    allProjects: state.user.allProjects,
    project: state.user.allProjects
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
