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

import MapProject from "../../components/MapProject";

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



const rootHeight = 1056;
const rootWidth = 1368;

const ratioWregion = rootWidth / 2213; // lay ben design cu
const ratioH = rootHeight / 1553; // lay ben design cu

const ratio = 1.7;
const a = rootWidth / (2 * ratio);
const b = rootHeight / (2 * ratio);
const minZoom = Platform.OS === "ios" ? width / rootHeight : width / (rootHeight / ratio);

class MapScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chooseSubdivision: false,
      dataDetail: {},
      showModal: false,
      activeIndex: 0,
      titleModal: "CHỌN PHÂN KHU",
      showRegion: false,
      showApartment: false,
      isFocus: true,
      nameRegion: "Chọn phân khu",
      nameBuilding: "Chọn Toà",
      chooseType: "region",
      sourceRegion: '',
      imgHighLight: [],
      x: 0,
      y: 0,
      scale: 3,
      hidden: true,
      //
      buildingType: [],
      listBuildOfType: [],
      dataDefineZone: [],
      allBuildingOfZone: [],
      isVisible: false,
      indexTour: 0,

      top: 0,
      right: 0,
      number: -1
    };
  }

  componentDidMount() {
    const { token, getAllProjects } = this.props;
    const { data } = this.props.navigation.state.params;
    console.log("buiHongson", data);
    console.log("this.props.navigation.state.params", data._id);
    getAllProjects(token, data._id, (error, data) => {
      if (error) return;
      if (data && data.data) {
        console.log("data.dataSon: ", data.data);
        this.setState({ dataDetail: data.data });
      }
    });
  }
  handleTextLayout(evt) {
    console.log("containerHight", this.state.containerHight);
    console.log(evt.nativeEvent.layout);
    // const {x, y, width , height} = evt.nativeEvent.layout
    // console.log("sadasdsadasasdasd" , x , y , width ,height)
    // if (a !== x)
    //  this.setState({ a: width } , ()=> console.log("lllllll" , a));
  }
  chooseRegion = async zone => {
    const { data } = this.props.navigation.state.params;

    console.log("zoneeeeeeee", zone);
    console.log("data.zonessssssss", data.zones);
    const { token, getZones, getAllBuildingOfZone } = this.props;
    this.setState({ chooseSubdivision: !this.state.chooseSubdivision });
    const zoneDefine = data.zones; // tìm được trong file ~/contants/define.js
    const index = await zoneDefine.findIndex(proj => proj.key === zone.key); // Tìm Dự Án trong zoneDefine
    console.log("dsadasdasdasd", index);
    if (index < 0) {
      Toast.show({
        text:
          "Bản đồ phân khu đang được cập nhật. Cùng chờ đón trong thời gian tới nhé!",
        duration: 2000
      });
    } else {
      const dataZone = zoneDefine[index]; // Lấy dữ liệu dự án trong zoneDefine
      console.log("dataZone: ", dataZone);
      const scale = dataZone.scale; // Tuỳ vào dự án, highlight lớn nhỏ, thì độ scale tỉ lệ nghịch theo size ảnh size highlight
      const signX = dataZone.left - a > 0 ? -1 : 1; // Xác định góc phần tư so với trục toạ độ xoy (Only Android)
      console.log(" signX", signX);
      const signY = dataZone.top - b < 0 ? 1 : -1;
      console.log(" signY", signY);
      this.setState({
        dataDefineZone: dataZone,
        nameRegion: zone.name,
        x: 1000,
        y: 700,
        scale: scale,
        imgHighLight: dataZone.buildings,
        sourceRegion: dataZone.highlight,
        nameBuilding: "Chọn Toà"
      });

      getZones(token, zone._id, (error, data) => {
        if (error) return;
        if (data && data.data) {
          this.setState(
            {
              buildingType: data.data.buildingCategories,
              listBuildOfType: data.data.buildingCategories[0].buildings
            },
            () =>
              console.log(
                "00000000",
                this.state.buildingType,
                this.state.listBuildOfType
              )
          );
        }
      });

      getAllBuildingOfZone(token, zone._id, (error, data) => {
        if (error) return;
        if (data && data.data) {
          this.setState({ allBuildingOfZone: data.data.buildings });
        }
      });
    }
  };

  regionMarginTop = margin => margin * ratioH;
  regionMarginLeft = margin => margin * ratioWregion;

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
    this.setState({ showRegion: !this.state.showRegion });
    if (this.state.showApartment) {
      this.setState({ showApartment: false });
    }
    if (this.state.chooseSubdivision) {
      this.setState({ chooseSubdivision: false });
    }
  };
  chooseTypeBuilding = index => {
    this.setState({ number: index });
    // if (index >= 2) {
    //     this.flatList.scrollToOffset({ offset: (index - 2) * (height * 0.656 / 4 - (width * 0.04)) });
    // } else {
    //     this.flatList.scrollToOffset({ offset: 0 });
    // }
    this.setState({
      listBuildOfType: this.state.buildingType[index].buildings,
      showApartment: !this.state.showApartment
    });
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  regionSizeW = size => size * ratioWregion;

  regionSizeH = size => size * ratioH;


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
            left: this.regionMarginLeft(building.left),
            top: this.regionMarginTop(building.top),
            width: this.regionSizeW(building.w),
            height: this.regionSizeH(building.h)
          }}
        >
          <Image
            resizeMode="contain"
            source={building.src}
            style={{
              width: this.regionSizeW(building.w),
              height: this.regionSizeH(building.h)
            }}
          />
        </TouchableOpacity>
      ));
    } else return null;
  };
  onPress = () => {
    this.setState({ chooseSubdivision: !this.state.chooseSubdivision });
  };
  renderChoose = ({ item, index }) => {
    return (
      <View key={index} style={{ width: 280 }}>
        <TouchableOpacity
          onPress={() => this.chooseRegion(item)}
          // onPress = {() => alert(index)}
          style={{
            height: 55,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  chooseApartment = async building => {
    this.setState({ showApartment: !this.state.showApartment });
    const { dataDefineZone } = this.state;
    const buildDefine = dataDefineZone.buildings;
    const index = await buildDefine.findIndex(
      build => build.key === building.key
    );
    if (index < 0) {
      this.hideModal();
      Toast.show({
        text:
          "Bản đồ toà nhà đang được cập nhật. Cùng chờ đón trong thời gian tới nhé!",
        duration: 3000
      });
    } else {
      const dataBuild = buildDefine[index];
      const scale = dataDefineZone.scaleApart;
      const signX = this.regionMarginLeft(dataBuild.left) - a > 0 ? -1 : 1;
      const signY = this.regionMarginTop(dataBuild.top) - b < 0 ? 1 : -1;
      this.setState({
        nameBuilding: dataBuild.name,
        imgHighLight: [dataBuild],
        x:
          Platform.OS === "ios"
            ? (dataDefineZone.left -
              dataDefineZone.wRegion / 2 +
              (dataBuild.left - dataDefineZone.left - dataBuild.w / 2)) *
            scale
            : signX *
            Math.abs(
              (dataBuild.left + dataBuild.w / 2) / ratio -
              rootWidth / (2 * ratio)
            ),
        y:
          Platform.OS === "ios"
            ? (dataDefineZone.top -
              dataBuild.h / 2 +
              (dataBuild.top - dataDefineZone.top - dataBuild.h)) *
            scale
            : signY *
            Math.abs(
              (dataBuild.top + dataBuild.h / 2) / ratio -
              rootHeight / (2 * ratio)
            ),
        scale: scale
      });
      // this.hideModal();
    }
  };
  renderBuilding = ({ item, index }) => {
    return (
      <View key={index} style={{ width: 280 }}>
        <TouchableOpacity
          onPress={() => this.chooseApartment(item)}
          style={{
            height: 55,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { data } = this.props.navigation.state.params;
    const {
      x,
      y,
      scale,
      chooseSubdivision,
      hidden,
      showModal,
      titleModal,
      buildingType,
      dataDetail,
      listBuildOfType,
      showRegion,
      showApartment,
      nameRegion,
      nameBuilding,
      sourceRegion,
      activeIndex,
      dataDefineZone,
      isVisible,
      chooseRegion
    } = this.state;

    console.log("sadasdasda", sourceRegion);
    console.log("numberrrr", this.state.number);
    return (
      <Container>
        <View style={[{ flexDirection: "row" }]}>
          <View style={styles.wrapper}>
            <MapProject
              onPress={this.onBack}
              source={data.zoneMap}
              title={"Bản đồ phân khu"}
              x={x}
              y={y}
              scale={scale}
            >
              {nameRegion !== 'Chọn phân khu'
                ? <View>
                  <Image
                    resizeMode="contain"
                    source={sourceRegion}
                    style={{
                      width: this.regionSizeW(dataDefineZone.wRegion),
                      height: this.regionSizeH(dataDefineZone.hRegion),
                      position: "absolute",
                      left: this.regionMarginLeft(dataDefineZone.left),
                      top: this.regionMarginTop(dataDefineZone.top)
                    }} />
                  {this.renderHighLight()}
                </View>
                : null
              }
            </MapProject>
          </View>
          <View style={{ width: 465 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: 42,
                marginVertical: 58
              }}
            >
              <Image
                source={images.btnBackBlack}
                style={{ width: 20, height: 10, marginRight: 18 }}
              />
              <Text style={{ color: "#434345" }}>Quay lại</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={showRegion ? true : false}
              onPress={this.onPress}
              onLayout={({
                nativeEvent: {
                  layout: { x, y }
                }
              }) => {
                this.setState({ top: y, right: x }, () =>
                  console.log(this.state.top, this.state.right)
                );
              }}
              style={[
                styles.btnSubdivision,
                {
                  backgroundColor: chooseSubdivision ? "#FFDB6B" : "#F2F2F2",
                  marginLeft: chooseSubdivision ? 0 : 17
                }
              ]}
            >
              <Text
                size16
                style={{
                  backgroundColor: "#464A5B",
                  fontWeight: chooseSubdivision ? "bold" : "normal"
                }}
              >
                Chọn phân khu{"\t"}
              </Text>
              <Text />
              <Image
                source={chooseSubdivision ? images.icDrop : images.icDrop1}
                style={{ width: 10, height: 10 }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={chooseSubdivision ? true : false}
              onPress={this.onSelectBuilding}
              onLayout={({
                nativeEvent: {
                  layout: { x, y }
                }
              }) => {
                this.setState({ top: y, right: x });
              }}
              style={[
                styles.btnSubdivision,
                {
                  backgroundColor: showRegion ? "#FFDB6B" : "#F2F2F2",
                  marginTop: 12,
                  marginLeft: showRegion ? 0 : 17
                }
              ]}
            >
              <Text
                size16
                style={{
                  backgroundColor: "#464A5B",
                  fontWeight: showRegion ? "bold" : "normal"
                }}
              >
                Chọn tòa{"\t "}
              </Text>
              <Text />
              <Image
                source={showRegion ? images.icDrop : images.icDrop1}
                style={{ width: 10, height: 10 }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {chooseSubdivision ? (
          <FlatList
            style={{
              top: this.state.top,
              right: this.state.right + 465,
              position: "absolute",
              backgroundColor: "#FFDB6B"
            }}
            data={dataDetail.zones}
            renderItem={this.renderChoose}
          />
        ) : null}

        {showRegion ? (
          <FlatList
            style={{
              top: this.state.top,
              right: this.state.right + 465,
              position: "absolute",
              backgroundColor: "#FFDB6B"
            }}
            keyExtractor={item => item._id}
            data={buildingType}
            renderItem={({ item, index }) => {
              const nameBuildType =
                index === 0 ? item.name : `Toà dạng ${item.name}`;

              return (
                <View key={index} style={{ width: 280 }}>
                  <TouchableOpacity
                    style={{
                      height: 55,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.chooseTypeBuilding(index)}
                  >
                    <Text
                      style={{
                        fontWeight:
                          this.state.number === index ? "bold" : "normal"
                      }}
                    >
                      {" "}
                      {nameBuildType}{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : null}
        {showApartment ? (
          <FlatList
            numColumns={2}
            style={{
              top: this.state.top + this.state.number * 55,
              right: this.state.right + 465 + 280,
              position: "absolute",
              backgroundColor: "#FFDB6B"
            }}
            data={listBuildOfType}
            renderItem={this.renderBuilding}
          />
        ) : null}
      </Container>
    );
  }
}
export default connect(
  state => ({
    token: getToken(state)
  }),
  {
    appRotate,
    getAllProjects,
    getZones,
    getAllBuildingOfZone
  }
)(MapScreen);
