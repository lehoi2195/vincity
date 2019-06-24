import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, Linking, FlatList, ImageBackground } from 'react-native';
import { Text, View, Container } from 'native-base';

import images from '../../../assets/images';
import Info from '../../ApartmentScreen/Info';
import Swiper from "../../../components/Swiper";
import HeaderSwiper from "../../ApartmentScreen/BannerSwiper"
// import console = require('console');
const data = [
    { text: "Tiêu chuẩn bàn giao" },
    { text: "Mặt bằng căn hộ" },

];

class DetailGroundApartment extends Component {
    openBrowser = link360 => {
        Linking.canOpenURL(link360)
            .then(supported => {
                if (!supported) {
                    Linking.openURL(link360)
                } else {
                    Linking.openURL(link360)
                }
            })
            .catch(error => console.log("error : ", error))
    }
    render() {
        const { apartment } = this.props.navigation.state.params
        console.log("4324234234234234234", apartment)
        return (
            <Container>
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ height: 1080, width: 1371, }}>
                        <ImageBackground resizeMode={'contain'} source={images.LinearGradient}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 1371,
                                height: 196,
                                position: 'absolute',
                                top: 0,
                                zIndex: 99999
                            }} >

                            <Text size30 white style={{ fontWeight: 'bold' }}>Căn hộ {apartment.description}</Text>
                        </ImageBackground>
                        <HeaderSwiper apartment={apartment} />
                    </View>
                    <View style={{ width: 465, padding: 66, }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginBottom: 58
                            }}>
                            <Image
                                source={images.btnBackBlack}
                                style={{ width: 20, height: 10, marginRight: 18 }} />
                            <Text style={{ color: "#434345" }}>Quay lại</Text>
                        </TouchableOpacity>

                        <View row style={{ justifyContent: 'space-between' }}>
                            <Text size24 extrabold style={{ color: "#1C1C1C" }}>Căn hộ {apartment.description}</Text>
                            {/* <Image source={images.starDeActive} style={{ height: 25, height: 25 }} /> */}
                        </View>
                        <View row style={{ marginTop: 20 }}>
                            <Image source={images.designNormal} style={{ width: 22, height: 22 }} />
                            <Text size14 > Thiết kế số 01</Text>
                        </View>

                        <Info apartment={apartment} />
                        {/* <View row style={{ justifyContent: 'space-between', backgroundColor: '#fff', marginVertical: 30 }}>
                            <View row style={{}}>
                                <Image source={images.share} style={{ height: 25, width: 25 }} resizeMode={'contain'} />
                                <Image source={images.download} style={{ height: 25, width: 25, marginLeft: 51 }} resizeMode={'contain'} />
                            </View>
                            <TouchableOpacity onPress={() => this.openBrowser(apartment.images360[1].link)}>
                                <Image source={images.xem360} style={{ height: 41, width: 105 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View> */}



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
                        <TouchableOpacity onPress={() => this.openBrowser(apartment.images360[1].link)} style={{ height: 85, justifyContent: "flex-end", flexDirection: "row", alignItems: "center" }} >
                            <Image source={images.xem360} style={{ height: 41, width: 105 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <View style={{}}>
                            <Text size16 bold style={{ marginLeft: 5, color: "#000" }}> Tài liệu liên quan </Text>
                            <FlatList
                                data={data}
                                extraData={this.state}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity key={index} style={{ flexDirection: 'row', borderBottomWidth: 1, height: 39, marginTop: 36, borderColor: "#808284" }} >
                                            <Image style={{ width: 17, height: 22 }} source={images.iconNote2} />
                                            <Text style={{ marginLeft: 24 }}>{item.text}</Text>
                                        </TouchableOpacity>)
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

export default DetailGroundApartment;
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
    },
    imageSlide: {
        width: 1371,
        height: 1080
    },
})