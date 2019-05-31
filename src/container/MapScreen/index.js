import React, { Component } from "react";
import {
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Container, Text, View, Toast } from "native-base";
import { NavigationEvents } from "react-navigation";
import DeviceInfo from "react-native-device-info";

import MapProject from "@components/MapProject";

import styles from "./styles";
import images from "@assets/images";
import variables from "@theme/variables";

import {
  getZones,
  appRotate,
  getAllProjects,
  getAllBuildingOfZone
} from "@store/actions";
import { getToken } from "@store/selectors";
const width = variables.deviceWidth;
const height = variables.deviceHeight;
const rootHeight = 1553;
const rootWidth = 2213;
const ratio = 1.7;
const a = rootWidth / (2 * ratio);
const b = rootHeight / (2 * ratio);
const minZoom =
  Platform.OS === "ios" ? width / rootHeight : width / (rootHeight / ratio);

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetail: {},
      showModal: false,
      activeIndex: 0,
      titleModal: "CHỌN PHÂN KHU",
      showRegion: true,
      isFocus: true,
      nameRegion: "Chọn phân khu",
      nameBuilding: "Chọn Toà",
      chooseType: "region",
      sourceRegion: "",
      imgHighLight: [],
      x: 0,
      y: 0,
      scale: 1,
      hidden: true,
      //
      buildingType: [],
      listBuildOfType: [],
      dataDefineZone: [],
      allBuildingOfZone: [],
      isVisible: false,
      indexTour: 0
    };
  }

  componentDidMount() {
    const { token, getAllProjects } = this.props;
    const { data } = this.props.navigation.state.params;
    getAllProjects(token, data._id, (error, data) => {
      if (error) return;
      if (data && data.data) {
        console.log("data.data: ", data.data);
        this.setState({ dataDetail: data.data });
      }
    });
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  hideModal = () => {
    this.setState({ showModal: false });
  };

  onSelectRegion = () => {
    this.setState({
      showModal: true,
      showRegion: true,
      titleModal: "CHỌN PHÂN KHU",
      chooseType: "region"
    });
  };

  onSelectBuilding = () => {
    const { nameRegion } = this.state;

    if (nameRegion === "Chọn phân khu") {
      Toast.show({ text: "Vui lòng chọn phân khu trước!" });
      return;
    }
    this.setState({
      showModal: true,
      showRegion: false,
      titleModal: "CHỌN TOÀ NHÀ",
      chooseType: "building"
    });
  };

  renderRegion = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.chooseRegion(item)}
        style={styles.itemRegion}
      >
        <Text normal size14 grey1>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  renderBuilding = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.chooseApartment(item)}
        key={index}
        style={styles.itemRegion}
      >
        <Text normal size14 grey1>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  onFilter = () => {
    this.setState({
      nameBuilding: "Chọn Toà",
      nameRegion: "Chọn phân khu",
      x: 0,
      y: 0,
      scale: minZoom,
      imgHighLight: this.state.dataDefineZone.buildings,
      activeIndex: 0,
      listBuildOfType: []
    });
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

 

  regionSize = size => {
    if (Platform.OS === "ios") return size;
    return size / ratio;
  };

  regionMargin = margin => {
    if (Platform.OS === "ios") return margin;
    return margin / ratio;
  };
  //#endregion

  navigateGroundApartment = building => {
    const { allBuildingOfZone } = this.state;
    const index = allBuildingOfZone.findIndex(
      build => build.key === building.key
    );
    if (index < 0) {
      Toast.show({
        text:
          "Mặt bằng tầng đang được cập nhật. Cùng chờ đón trong thời gian tới nhé!",
        duration: 3000
      });
    } else {
      const buildOfZone = allBuildingOfZone[index];
      console.log({ ...building, ...buildOfZone });
      this.props.navigation.navigate("GroundApartment", {
        data: building,
        buildOfZone: { ...building, ...buildOfZone }
      });
    }
  };

  renderHighLight = () => {
    const { imgHighLight } = this.state;
    if (imgHighLight.length > 0) {
      return imgHighLight.map((building, index) => (
        <TouchableOpacity
          onPress={() => this.navigateGroundApartment(building)}
          key={index}
          style={{
            position: "absolute",
            left: this.regionMargin(building.left),
            top: this.regionMargin(building.top),
            width: this.regionSize(building.w),
            height: this.regionSize(building.h)
          }}
        >
          <Image
            source={building.src}
            style={{
              width: this.regionSize(building.w),
              height: this.regionSize(building.h)
            }}
          />
        </TouchableOpacity>
      ));
    } else return null;
  };

  render() {
    const { data } = this.props.navigation.state.params;
    const {
      x,
      y,
      scale,
      hidden,
      showModal,
      titleModal,
      buildingType,
      dataDetail,
      listBuildOfType,
      showRegion,
      nameRegion,
      nameBuilding,
      sourceRegion,
      activeIndex,
      dataDefineZone,
      isVisible
    } = this.state;
    return (
      <Container>
        <View row style={styles.wrapper}>
          <MapProject
            onPress={this.onBack}
            source={data.zoneMap}
            title={"Bản đồ phân khu"}
            x={x}
            y={y}
            scale={scale}
          >
            {nameRegion !== "Chọn phân khu" ? (
              <View>
                <Image
                  source={sourceRegion}
                  style={{
                    width: this.regionSize(dataDefineZone.wRegion),
                    height: this.regionSize(dataDefineZone.hRegion),
                    position: "absolute",
                    left: this.regionMargin(dataDefineZone.left),
                    top: this.regionMargin(dataDefineZone.top)
                  }}
                />
                {this.renderHighLight()}
              </View>
            ) : null}
          </MapProject>
        
        </View>
      </Container>
    );
  }
}
export default connect(
  state => ({
    token: getToken(state),
  }),
  {
    appRotate,
    getAllProjects,
    getZones,
    getAllBuildingOfZone
  }
)(MapScreen);
