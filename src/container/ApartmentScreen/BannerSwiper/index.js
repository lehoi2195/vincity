import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
// import DeviceInfo from "react-native-device-info";
import { View } from "native-base";
// import { connect } from "react-redux";
import Swiper from "@components/Swiper";
import images from "../../../assets/images";

export default class HeaderSwiper extends Component {
  componentDidMount() {}

  // swiperIndexChanged = index => {
  //   console.log("swiperIndexChanged", "index", index);
  // };

  // handleOpenGallery = (images, index) => {
  //   this.props.openGallery(images, index);
  // };

  // randomImage = arrImage => {
  //   let newArrImage = [];
  //   const index = Math.floor(Math.random() * (arrImage.length - 5));
  //   for (let i = index; i < index + 5; i++) {
  //     newArrImage.push(arrImage[i]);
  //   }
  //   return newArrImage;
  // };

  render() {
    // const { apartment, width, height, isReality } = this.props;
    // const randomImgGround =
    //   apartment.imagesGround.length < 5
    //     ? apartment.imagesGround
    //     : this.randomImage(apartment.imagesGround);

    // const images = isReality
    //   ? [...[apartment.image], ...apartment.imagesFurniture]
    //   : [...randomImgGround, ...apartment.imagesFurniture];
    const demo = [
      { son: images.demoImage },
      { son: images.demoImage },
      { son: images.demoImage },
      { son: images.demoImage },
      { son: images.demoImage }
    ];

    return (
      <ImageBackground
        style={[styles.swiper, { ...this.props.style }]}
        source={images.linearSwiper}
      >
        <Swiper
          //showsButtons={true}
          ref={swiper => {
            this.swiper = swiper;
          }}
          // removeClippedSubviews={false}
          style={styles.slide}
          height={709}
          width={863}
          // autoplay={true}
          loop
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          // onIndexChanged={this.swiperIndexChanged}
        >
          {demo.map((item, index) => (
            <View key={index}>
              <Image
                defaultSource={images.placeholder}
                resizeMode="stretch"
                source={item.son}
                // source={images.tutorial1}
                style={[styles.imageSlide]}
              />
            </View>
          ))}
        </Swiper>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    width: 863,
    height: 750
  },

  slide: {},
  viewSlide: {
    height: 750,
    width: 863
  },
  imageSlide: {
    width: 863,
    height: 750
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
