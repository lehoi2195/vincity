import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';

const { width, height } = Dimensions.get("window");
import HeaderSwiper from '../BannerSwiper'
import Swiper from "../../../components/Swiper";
import images from '../../../assets/images';
import Info from '../Info';

const demo = [
  { son: images.demoImage },
  { son: images.demoImage },
  { son: images.demoImage },
  { son: images.demoImage },
  { son: images.demoImage }
];

export class ApartmentCompare extends Component {
  render() {
    const { apartment } = this.props
    return (
      <View row style={{ borderBottomWidth: 1, padding: 30, justifyContent: 'space-evenly' }}>
        <View>
          <Swiper
            //showsButtons={true}
            ref={swiper => {
              this.swiper = swiper;
            }}
            style={styles.slide}
            height={345}
            width={420}
            loop
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}   >
            {demo.map((item, index) => (
              <View key={index}>
                <Image
                  defaultSource={images.placeholder}
                  resizeMode="stretch"
                  source={item.son}
                  style={[styles.imageSlide]}
                />
              </View>
            ))}
          </Swiper>
        </View>

        {/* <View style = {{height : 345 , width :420 ,backgroundColor :'red'}}></View> */}
        <View style={{}}>
          <Text size24 extrabold style={{ color: "#1C1C1C" }} >  Căn hộ {apartment.nameType} </Text>
          <View row style={{}}>
            <Image source={images.designNormal} style={{ width: 22, height: 22 }} />
            <Text size14 style={{ color: "#57585B", marginLeft: 9 }}>  Thiết kế số 1 </Text>
          </View>
          <View style={{ width: 400 }}>
            <Info apartment={apartment} />
          </View>
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
        </View>
      </View>
    )
  }
}

export default ApartmentCompare;
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
  swiper: {
    width: 450,
    height: 450
  },

  slide: {},
  viewSlide: {
    height: 450,
    width: 450
  },
  imageSlide: {
    width: 450,
    height: 450
  },
  dot: {
    backgroundColor: "#F0F0F0",
    width: 6,
    height: 6,
    marginRight: 8,
    marginBottom: 10,
    transform: [{ rotate: "45deg" }]
  },
  activeDot: {
    backgroundColor: "#2EB569",
    width: 6,
    height: 6,
    marginRight: 8,
    marginBottom: 10,
    transform: [{ rotate: "45deg" }]
  }
});
