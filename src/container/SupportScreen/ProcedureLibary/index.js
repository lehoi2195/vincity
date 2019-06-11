import React, { Component } from 'react';
import { StyleSheet ,Image} from 'react-native';
import {Text, View} from "native-base";

import AppStyles from "../../../styles";
import images from '../../../assets/images';
import Header from '../../../components/Header';

class ProcedureLibary extends Component {
  render() {
    return (
      <View style={[styles.wrapper, AppStyles.paddingContent]}>
        <Header title={"Thủ tục"} />
        <View center style={{ flex: 1 }}>
          <Image source={images.logoTransparent} />
          <Text black size14 style={{  paddingVertical: 10,  paddingHorizontal: 50,  textAlign: "center"  }}  >
               Cùng chờ đón những cập nhật mới trong thời gian tới nhé!
          </Text>
          </View> 
      </View>
    )
  }
}

export default ProcedureLibary;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  folder: {
    
    alignItems: 'center',
    width: 560,
    height:344,
    // marginVertical: 20
},
img: { 
  width:560,
  height: 344,
  justifyContent :'center' ,
  alignItems :'center'
},

});