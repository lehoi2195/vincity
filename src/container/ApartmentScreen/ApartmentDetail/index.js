import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Text, View, Content, Container } from 'native-base'

import Info from '../Info';
import images from '../../../assets/images';
const { width, height } = Dimensions.get("window");

class ApartmentDetail extends Component {
  render() {
    const { apartment, data } = this.props
    return (
      
      
      <View style={{ marginLeft: 22, width: 444 }}>
        {Object.keys(apartment).length > 0 ? (
          <Content style={{ padding: 36 }}>
            <Text size24 extrabold style={{ paddingVertical: 36, color: "#1C1C1C" }} >  Căn hộ {apartment.nameType} </Text>
            <View row style={{ marginTop: 10 }}>
              <Image source={images.designNormal} style={{ width: 22, height: 22 }} />
              <Text size14 style={{ color: "#57585B", marginLeft: 9 }}>  Thiết kế số 1 </Text>
            </View>
            <Info apartment={apartment} />

            <View style={{ marginTop: 32 }}>
              <Text bold size16 style={{ marginLeft: 5, color: "#000" }}>Thông tin căn hộ thuộc dự án </Text>
              <View row style={styles.sTim}>
                <Text grey3 size14 normal>Diện tích tim tường </Text>
                <Text grey3 size14 normal style={styles.txtS}>{apartment.heartWall} m² </Text>
              </View>
              <View row style={styles.sThong}>
                <Text grey3 size14 normal>Diện tích thông thuỷ </Text>
                <Text grey3 size14 normal style={styles.txtS}>{apartment.clearSpan} m² </Text>
              </View>
            </View>

            <View style={{ height: 85, justifyContent: "flex-end", flexDirection: "row", alignItems: "center" }} >
              <TouchableOpacity>
                <Image source={images.image360} style={{ width: 125, height: 55 }} resizeMode="contain" />
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <Text size14 style={{ color: "#1C1C1C" }}> Tài liệu liên quan </Text>
              <FlatList
                data={data}
                extraData={this.state}
                renderItem={({ item, index }) => {
                  return (
                    <View row style={{ borderBottomWidth: 1, height: 39, marginTop: 16, borderColor: "#808284" }} >
                      <Image style={{ width: 17, height: 22 }} source={images.iconNote2} />
                      <Text style={{ marginLeft: 24 }}>{item.text}</Text>
                    </View>);
                }}
              />
            </View>
          </Content>
        ) : null}
      </View>
    )
  }
}

export default ApartmentDetail
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