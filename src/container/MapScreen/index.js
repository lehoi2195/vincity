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
const rootHeight = 1080;
const rootWidth = 1371;
const ratio = 2;
const a = rootWidth / (2 * ratio);
const b = rootHeight / (2 * ratio);
const minZoom =
  Platform.OS === "ios" ? width / rootHeight : width / (rootHeight / ratio);

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseSubdivision: false,
      dataDetail: {},
      showModal: false,
      activeIndex: 0,
      titleModal: "CHỌN PHÂN KHU",
      showRegion: false,
      isFocus: true,
      nameRegion: "Chọn phân khu",
      nameBuilding: "Chọn Toà",
      chooseType: "region",
      sourceRegion: "",
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

      top:0,
      right:0
    };
  }

  componentDidMount() {
    const { token, getAllProjects } = this.props;
    const { data } = this.props.navigation.state.params;
    console.log("this.props.navigation.state.params", data._id);
    getAllProjects(token, data._id, (error, data) => {
      if (error) return;
      if (data && data.data) {
        console.log("data.dataSon: ", data.data);
        this.setState({ dataDetail: data.data } , () =>{console.log("333333333" ,  this.state.dataDetail.zones )});
      }
    });
  }
  handleTextLayout(evt){
 
    
    console.log("containerHight" , this.state.containerHight);
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
      this.setState(
        {
          dataDefineZone: dataZone,
          nameRegion: zone.name,
          x: 1000,
          y: 700,
          scale: scale,
          imgHighLight: dataZone.buildings,
          sourceRegion: dataZone.highlight,
          nameBuilding: "Chọn Toà"
        },
        () => {
          console.log(
            "dsafasd: ",
            this.state.x,
            this.state.y,
            this.state.scale
          );
        }
      );
    }
  };

  regionMargin = margin => {
    console.log("marginhghhvjhjhjhhjhhgjghhjg", margin);
    return margin / ratio;
  };

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
    // const { nameRegion } = this.state;
    // if (nameRegion === "Chọn phân khu") {
      Toast.show({ text: "Vui lòng chọn phân khu trước!" });
    //   return;
    // }
    this.setState({
      showRegion: true,
    });
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  regionSize = size => {
    if (Platform.OS === "ios") return size;
    return size / ratio;
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
  onPress = () => {
    this.setState({ chooseSubdivision: !this.state.chooseSubdivision });
  };
  renderChoose = ( {item , index})=>{
    return (
      <View key = {index} style={{ width: 280 ,}}>
        <TouchableOpacity
          onPress={() => this.chooseRegion(item)}
          style={{
            height: 55,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }


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
      nameRegion,
      nameBuilding,
      sourceRegion,
      activeIndex,
      dataDefineZone,
      isVisible
    } = this.state;

    console.log("llllllllll", x, y);

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
              }} >
              <Image
                source={images.btnBackBlack}
                style={{ width: 20, height: 10, marginRight: 18 }}
              />
              <Text style={{ color: "#434345" }}>Quay lại</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onPress()}
              onLayout={({ nativeEvent: { layout: { x, y } } }) => {
                 this.setState({ top: y , right : x },);
            }}
              style={
                [styles.btnSubdivision , { 
                backgroundColor: chooseSubdivision ? "#FFDB6B" : "#F2F2F2",
                marginLeft: chooseSubdivision ? 0 : 17}]
              }
            >
              <Text size16 style={{ backgroundColor: "#464A5B" }}> Chọn phân khu  </Text>
              <Text />
              <Image source={images.icDown} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.onSelectBuilding}
              onLayout={({ nativeEvent: { layout: { x, y } } }) => {
                this.setState({ top: y , right : x },);
               }}
              style={[styles.btnSubdivision ,
                {backgroundColor: "#F2F2F2",
                marginTop :12,
                marginLeft:showRegion ? 0 : 17}]
              } >
              <Text size16 style={{ backgroundColor: "#464A5B" }}> Chọn tòa </Text>
              <Text />
              <Image source={images.icDown} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>

            
          </View>
        </View>
         {chooseSubdivision ? ( 
                <FlatList
                  style={{
                    top :this.state.top,
                    right :this.state.right + 465,
                    position: "absolute",
                    backgroundColor: "#FFDB6B"
                  }}
                  data={data.zones}
                  renderItem={this.renderChoose }
                />
              ) : null}

          {showRegion ? (
            <FlatList 
            style = {{
              top :this.state.top,
              right :this.state.right + 465,
              position: "absolute",
              backgroundColor: "#FFDB6B"
            }}
            
            data={dataDetail.zones}
            renderItem={this.renderChoose }/>
          ): null}
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
