/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Image, Dimensions,TouchableOpacity,FlatList,TouchableHighlight } from "react-native";
import { View, Text, Content } from "native-base";

import images from "../../assets/images";
const { width, height } = Dimensions.get("window");
import AppStyles from "@styles";
import HeaderSwiper from "./BannerSwiper";
import Info from "./Info";
const data = [
  {text : "Giới thiệu dự án"},
  {text : "Thông báo ngày 09-08"},
  {text : "Điều khoản mua nhà"},
  {text : "Giới thiệu dự án"},
  {text : "Thông báo ngày 09-08"},
  {text : "Điều khoản mua nhà"},

 

]
const datas = [
  {title : 'Căn hộ 2 phòng ngủ',
          child:[
                 {name :'2 phòng ngủ / 1 WC' , sl :'Thiết kế số 2'},
                 {name :'2 phòng ngủ / 1 WC' , sl :'Thiết kế số 2'},

    ] },
  {title : 'Căn hộ 1 phòng ngủ',
    child:[
           {name :'1 phòng ngủ / 1 WC' , sl :'Thiết kế số 1'},
  ] },
  {title : 'Căn hộ 1 phòng ngủ',
    child:[
           {name :'1 phòng ngủ / 1 WC' , sl :'Thiết kế số 1'},
  ] },
  
 
]
export default class ApartmentScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.banner} source={images.banner} />
        <View row style={{ margin: 42 }}>
          <HeaderSwiper />
          <View style = {{marginLeft :22  ,width :444 , }}>
            <Content style = {{padding : 36  }}>
              <Text size24 extrabold style = {{marginTop : 69 ,color : '#1C1C1C'}}> Căn hộ 2 phòng ngủ +1 / </Text>
              <View row style = {{marginTop :10}}>
                <Image
                  source={images.designNormal}
                  style={{ width: 22, height: 22, }}
                />
                <Text size14 style={{ color :'#57585B', marginLeft: 9 }}> Thiết kế số 1</Text>
              </View>
              <Info />

              {/* <Info /> */}
              <View style = {{marginTop :32}}>
                <Text bold size16 style={{ marginLeft: 5, color :'#000' }}>Thông tin căn hộ thuộc dự án </Text>
                <View row style={styles.sTim}>
                  <Text grey3 size14 normal> Diện tích tim tường </Text>
                  <Text grey3 size14 normal style={styles.txtS}>123 m²</Text>
                </View>
                <View row style={styles.sThong}>
                  <Text grey3 size14 normal> Diện tích thông thuỷ </Text>
                  <Text grey3 size14 normal style={styles.txtS}> 456 m²</Text>
                </View>
              </View>

              <View style = {{height : 85 ,justifyContent :'flex-end',flexDirection :'row' ,alignItems :'center'}}>
                <TouchableOpacity>
                  <Image source ={images.image360} style = {{width : 118 , height : 45}} resizeMode = 'contain'/>
                  </TouchableOpacity>
              
              </View>
              <View style = {{}}>
                <Text size14 style ={{color :'#1C1C1C'}}>Tài liệu liên quan</Text>
                <FlatList 
                data = {data}
                renderItem = {({item,index})=>{
                  return (
                    <View row style = {{  borderBottomWidth :1 ,height :39 ,marginTop : 16 ,borderColor :'#808284'}}>
                      <Image style ={{width : 17 , height :22 }} source ={images.iconNote2}  />
                      <Text style = {{marginLeft :24}}>{item.text}</Text>
                    </View>) }}
                />
              </View>
              
            </Content>
          </View>

          <View style={{ backgroundColor: 'rgba(219, 219, 219, 0.3)', width: 422  }}>
            <Content>
          <FlatList 
                data = {datas}
                renderItem = {({item,index})=>{
                  return (
                    <View style = {{marginHorizontal : 34}}>
                        <Text style = {{color : '#808284',marginTop :32}} size18>{item.title}</Text>
                        <View  style = {{}}>
                         {item.child.map((apartment,index) =>
                          <TouchableHighlight activeOpacity ={0.7} underlayColor ='#FFCB2A' onPress = {()=>{}}>
                            <View row style = {{borderBottomWidth : 1 , borderColor :'#808284' , paddingVertical :16}}>
                               <Image source = {images.demoImage} style = {{height :80 , width : 141 }} resizeMode ='contain'/>
                               <View style ={{marginLeft :16}}>
                                  <Text size16 numberOfLines={1} style = {{color :'#000000',width:200}}>{apartment.name}</Text>
                                  <View row style ={{marginTop :11}}> 
                                     <Image source = {images.designNormal} style = {{height :18 ,width :18 }}/>
                                     <Text mediumitalic style ={{marginLeft :9 ,color :'#57585B',}}>{apartment.sl}</Text>
                                 </View>
                               </View>
                             </View> 
                             </TouchableHighlight> 
                         )}
                      
                    
                        </View>
                    </View>
                   
                  )
                }}
                />
                </Content>
                <View  style = {{position :'absolute' , bottom: 12 ,left :111 }}>
                  <TouchableOpacity>
                   <Image source = {images.Compare} style = {{width :238 , height :50}}/>
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
