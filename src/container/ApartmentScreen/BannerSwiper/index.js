import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from "react-native";

import { View, Text } from "native-base";
import Swiper from "../../../components/Swiper";

import imagess from "../../../assets/images";

export default class HeaderSwiper extends Component {

  componentDidMount() { }

  swiperIndexChanged = index => {
    console.log("swiperIndexChanged", "index", index);
  };

  // randomImage = arrImage => {
  //   let newArrImage = [];
  //   const index = Math.floor(Math.random() * (arrImage.length - 5));
  //   for (let i = index; i < index + 5; i++) {
  //     newArrImage.push(arrImage[i]);
  //   }
  //   return newArrImage;
  // };

  render() {
    const { apartment, isReality } = this.props;
    // console.log("lllllllllllllllll" ,apartment)
    // const randomImgGround = apartment.imagesGround.length < 5 ? apartment.imagesGround
    //   : this.randomImage(apartment.imagesGround);

    const images =
      [...[apartment.image], ...apartment.imagesFurniture];


    return (
      <View>
        <ImageBackground
          style={[styles.swiper, { ...this.props.style }]}
          source={imagess.linearSwiper}
        >

          <Swiper
            //showsButtons
            ref={swiper => {
              this.swiper = swiper;
            }}
            removeClippedSubviews={false}
            style={styles.slide}
            height={1080}
            width={1371}
            loop
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            onIndexChanged={this.swiperIndexChanged}
          >
            {images.map((item, index) => (
              <View key={index}>
                <Image
                  defaultSource={images.placeholder}
                  resizeMode='contain'
                  source={{ uri: item }}
                  style={[styles.imageSlide]}
                />
              </View>
            ))}
          </Swiper>
        </ImageBackground>
       
      </View>

    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    width: 1371,
    height: 1041
  },

  slide: {},
  viewSlide: {
    height: 1080,
    width: 1371
  },
  imageSlide: {
    width: 1371,
    height: 1080
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
