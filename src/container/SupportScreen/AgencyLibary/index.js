import React, { Component } from 'react';
import { FlatList ,StyleSheet ,TouchableOpacity ,Image} from 'react-native';
import {Text, View} from 'native-base'

import AppStyles from "../../../styles";
import images from "../../../assets/images";
import Header from "../../../components/Header";
// import console = require('console');

class AgencyLibary extends Component {
  render() {
      const {data} = this.props
    return (
        <View style={[styles.wrapper, AppStyles.paddingContent]}>
         <Header title={"Danh sách đại lý"} />
         <FlatList  
            contentContainerStyle={{ paddingVertical: 40 }}
            numColumns={4}
            data = {data}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            // Communications.phonecall(item.hotline, true)
                        }}
                        style={[styles.folder, { marginRight: 20 ,marginVertical :20 ,borderWidth :1}]}>
                        <Image source={images.agency} style={styles.img} />
                        <Text bold grey2 numberOfLines={2}
                            style={{
                                position: 'absolute',
                                top: 12,
                                textAlign: 'center',
                                marginHorizontal: 4,
                                fontSize: 14
                            }}>
                            {item.name}</Text>
                        <Text bold white numberOfLines={1}
                            style={{ position: 'absolute', bottom: 10, fontSize:14 }}>{item.hotline}</Text>
                    </TouchableOpacity>
                )
            }}
         />
        </View>
    )
  }
}

export default AgencyLibary;
const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
  
    },
    folder: {

        alignItems: 'center',
        width: 275,
        height:140,
        // marginVertical: 20
    },
    img: {
        
        width:275,
        height: 140,
    },
    right: {
      marginTop: 20,
      marginLeft: 20
    }
  });