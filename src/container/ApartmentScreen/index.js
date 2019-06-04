/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
} from "react-native";
import { View, Text, Content } from "native-base";
import { connect } from "react-redux";
import _ from "lodash";

import images from "../../assets/images";
import { getToken, isRequestPending } from "../../store/selectors";
const { width, height } = Dimensions.get("window");
import AppStyles from "@styles";
import HeaderSwiper from "./BannerSwiper";
import Info from "./Info";
import { getApartmentsCate } from "../../store/actions";

// import console = require("console");

const data = [
  { text: "Giới thiệu dự án" },
  { text: "Thông báo ngày 09-08" },
  { text: "Điều khoản mua nhà" },
  { text: "Giới thiệu dự án" },
  { text: "Thông báo ngày 09-08" },
  { text: "Điều khoản mua nhà" }
];

@connect(
  state => ({
    token: getToken(state),
    loading: isRequestPending(state, "getApartmentsCate")
  }),
  {
    getApartmentsCate
  }
)
export default class ApartmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: -1,
      nameType: '',
      apartmentCates: [],
      apartment: {}
    };
  }
  componentDidMount() {
    const { token, getApartmentsCate } = this.props;
 
    getApartmentsCate(token, (error, data) => {
      if (error) return;
      if (data && data.data) {
        this.setState({ apartmentCates: data.data });
        this.setState({ apartment: data.data[0] });
      }
    });
  }
  chooseApartment = (apartment, index ,item) => {


    this.setState({ selectIndex: index, nameType: apartment._id ,   });
    // console.log('dsa' , apartmentCates.(item => item._id !== nameType._id))
 
    
  };
  render() {
    const { apartmentCates, apartment, nameType, selectIndex } = this.state;
   
    return (
      <View style={styles.container}>
        <Image style={styles.banner} source={images.banner} />
        <View row style={{ margin: 42 }}>
          <HeaderSwiper />
          <View style={{ marginLeft: 22, width: 444 }}>
            {Object.keys(apartment).length > 0 ? (
              <Content style={{ padding: 36 }}>
                <Text
                  size24
                  extrabold
                  style={{ marginTop: 69, color: "#1C1C1C" }}
                >
                  Căn hộ {apartment.name}{" "}
                </Text>

                <View row style={{ marginTop: 10 }}>
                  <Image
                    source={images.designNormal}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text size14 style={{ color: "#57585B", marginLeft: 9 }}>
                    {" "}
                    Thiết kế số 1
                  </Text>
                </View>
                <Info apartment={apartment} />
                {/* <Info /> */}
                <View style={{ marginTop: 32 }}>
                  <Text bold size16 style={{ marginLeft: 5, color: "#000" }}>
                    Thông tin căn hộ thuộc dự án{" "}
                  </Text>
                  <View row style={styles.sTim}>
                    <Text grey3 size14 normal>
                      {" "}
                      Diện tích tim tường{" "}
                    </Text>
                    <Text grey3 size14 normal style={styles.txtS}>
                      123 m²
                    </Text>
                  </View>
                  <View row style={styles.sThong}>
                    <Text grey3 size14 normal>
                      {" "}
                      Diện tích thông thuỷ{" "}
                    </Text>
                    <Text grey3 size14 normal style={styles.txtS}>
                      {" "}
                      456 m²
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 85,
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity>
                    <Image
                      source={images.image360}
                      style={{ width: 118, height: 45 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <Text size14 style={{ color: "#1C1C1C" }}>
                    Tài liệu liên quan
                  </Text>
                  <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          row
                          style={{
                            borderBottomWidth: 1,
                            height: 39,
                            marginTop: 16,
                            borderColor: "#808284"
                          }}
                        >
                          <Image
                            style={{ width: 17, height: 22 }}
                            source={images.iconNote2}
                          />
                          <Text style={{ marginLeft: 24 }}>{item.text}</Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </Content>
            ) : null}
          </View>

          <View style={{ backgroundColor: "rgba(219, 219, 219, 0.3)", width: 422 }}>
            <Content>
              <FlatList
                data={apartmentCates}
                extraData={this.state}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                  return (
                    <View key={index} style={{ marginHorizontal: 34 }}>
                      <Text style={{ color: "#808284", marginTop: 32 }} size18>Căn hộ {item.name}</Text>
                      <View>
                        <FlatList
                          data={item.types}
                          extraData={this.state}
                          keyExtractor={item => item._id}
                          renderItem={({ item: apartment, index }) => {
                            console.log("nameType, selectIndex, ", item.name, nameType, selectIndex)
                            return (
                              <TouchableOpacity key={index}
                                style={{ backgroundColor: selectIndex === index && item._id === nameType ? '#FFCB2A' : "" , }}
                                onPress={() => {this.chooseApartment(item, index)}} >
                                <View row style={{
                                    borderBottomWidth: 1,
                                    borderColor: "#808284",
                                    paddingVertical: 16
                                  }}>
                                  <Image source={{ uri: apartment.featuredImage }} style={{ height: 80, width: 141 }}/>
                                  <View style={{ marginLeft: 16 }}>
                                    <Text size16 numberOfLines={1}  style={{ color: "#000000", width: 200 }} > {apartment.nameType} </Text>
                                    <View row style={{ marginTop: 11 }}>
                                      <Image source={images.designNormal}  style={{ height: 18, width: 18 }} />
                                      <Text mediumitalic  style={{  marginLeft: 9, color: "#57585B" }} > Thiết kế số 2 </Text>
                                    </View>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </Content>
            <View style={{ position: "absolute", bottom: 12, left: 111 }}>
              <TouchableOpacity>
                <Image
                  source={images.Compare}
                  style={{ width: 238, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sThong: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
    width: 375,
    height: 35,
    marginTop: 2
  },
  sTim: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
    width: 375,
    height: 35,
    backgroundColor: "#BDBDBD1A",
    marginTop: 16
  },
  infoApartment: {
    paddingHorizontal: 16,
    marginTop: 20,
    width: 214,
    height: 18
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  banner: {
    // flex: 1,
    width,
    height: 222
  }
});
