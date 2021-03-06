import React, { Component } from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
} from "react-native";

import { View } from "native-base";
import Swiper from "../../components/Swiper";

import images from "../../assets/images";
import { scale, verticalScale } from "@utils/scale";
export default class ApartmentSwiper extends Component {

    componentDidMount() { }

    swiperIndexChanged = index => {
        console.log("swiperIndexChanged", "index", index);
    };

    render() {
        const { apartment } = this.props;
        console.log("apartmentdfsf", apartment)
        if (Object.keys(apartment).length === 0)
            return (
                <ImageBackground
                    style={[styles.swiper, { ...this.props.style }]}
                    source={images.linearSwiper}
                />
            )
        return (
            <ImageBackground
                style={[styles.swiper, { ...this.props.style }]}
                source={images.linearSwiper}
            
            >
                <Swiper
                    //showsButtons
                    ref={swiper => {
                        this.swiper = swiper;
                    }}
                    removeClippedSubviews={false}
                    style={styles.slide}
                    height={verticalScale(709)}
                    width={scale(863)}
                    loop
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                    onIndexChanged={this.swiperIndexChanged}
                >
                    {apartment && apartment.imagesGround && apartment.imagesGround.map((item, index) => (
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
        );

    }
}

const styles = StyleSheet.create({
    swiper: {
        width: scale(863),
        height: verticalScale(670)
    },

    slide: {},
    viewSlide: {
        height: verticalScale(709),
        width: scale(863)
    },
    imageSlide: {
        width: scale(863),
        height: verticalScale(709)
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
