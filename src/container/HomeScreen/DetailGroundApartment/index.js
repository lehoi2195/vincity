import React, { Component } from 'react';
import { Image , StyleSheet , TouchableOpacity } from 'react-native';
import { Text, View, Container } from 'native-base';
import images from '../../../assets/images';
import Info from '../../ApartmentScreen/Info';
// import console = require('console');

class DetailGroundApartment extends Component {
    render() {
        const { apartment } = this.props.navigation.state.params
        console.log("4324234234234234234" , apartment)
        return (
            <Container>
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ height: 1080, width: 1371 }}>

                    </View>
                    <View style={{ width: 465, padding: 66,  }}>
                        
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
                            <Text>Mẫu  Song Lập</Text>
                            <Image source={images.starDeActive} style={{ height: 25, height: 25 }} />
                        </View>
                        <View row style={{}}>
                            <Image source={images.designNormal} style={{ width: 22, height: 22 }} />
                            <Text size14 > SL 01</Text>
                        </View>

                        <Info apartment={apartment} />
                        <View row style={{ justifyContent: 'space-between' , backgroundColor :'#fff' , marginVertical : 30 }}>
                            <View row style={{  }}>
                                <Image source={images.share} style={{ height: 25, width: 25 }} resizeMode={'contain'} />
                                <Image source={images.download} style={{ height: 25, width: 25 ,marginLeft :51 }} resizeMode={'contain'} />
                            </View>

                            <Image source={images.xem360} style={{ height: 41, width: 105 }} resizeMode={'contain'} />
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
})