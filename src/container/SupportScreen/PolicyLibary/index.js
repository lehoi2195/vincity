import React, { Component } from 'react';
import { StyleSheet ,FlatList ,Image ,TouchableOpacity  ,ImageBackground} from 'react-native';
import {Text, View} from "native-base";

import Header from '../../../components/Header';
import AppStyles from "../../../styles";
import images from '../../../assets/images';
import PolicyList from '../PolicyList';
// import console = require('console');
// import console = require('console');

class PolicyLibary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPolicy: false,
      policySelected :{},
      folderIndex : 0
    };
  }

  onPress = (item, index) => {
    this.setState({
      showPolicy: true,
      policySelected: item,
      folderIndex: index
    });
  };
  onBack = () => {
    this.setState({
      showPolicy: false,
      policySelected: {},
      folderIndex: 0
    });
  };

  renderPolicyList() {
    return (
     <PolicyList 
      policy={this.state.policySelected}
      onBack={this.onBack}/>
    );
  }
  renderPolicy(){
    const { data } = this.props;
    return (
      <View style={[styles.wrapper, AppStyles.paddingContent]}>
        <Header title={"Chính sách hỗ trợ"} />
          { data.length === 0 ? 
            <View center style={{ flex: 1 }}>
              <Image source={images.logoTransparent} />
                <Text black size14 style={{  paddingVertical: 10,  paddingHorizontal: 50,  textAlign: "center"  }}  >
                     Cùng chờ đón những cập nhật mới trong thời gian tới nhé!
                </Text>
            </View> : 
            <FlatList 
              keyExtractor={item => item._id}
              data = {data}
              numColumns={2}
              renderItem = {({item,index})=>{
              return (
                <TouchableOpacity key={index} 
                  onPress={() => this.onPress(item, index)}
                  style={[styles.folder, { marginRight: 20 ,marginVertical :20 }]}>    
                    <ImageBackground source={images.policy} style={styles.img} >
                      <Image source={images.hand} style = {{width : 117 , height : 117}} resizeMode ={'contain'}/>
                      <Text size20 white style ={{marginTop:12}}>{item.name}</Text>
                    </ImageBackground>  
                </TouchableOpacity>
                    )
                  }}
                />}
            </View>
          )

  }

  render(){
    return this.state.showPolicy ? this.renderPolicyList() :this.renderPolicy()
  }


//  render() {
//     const { data } = this.props;
//     console.log("kkkkkkkkkkkkkkkkk" , data)

   
//     return (
//       <View style={[styles.wrapper, AppStyles.paddingContent]}>
//          <Header title={"Chính sách hỗ trợ"} />
//          { data.length === 0 ? 
//          <View center style={{ flex: 1 }}>
//                 <Image source={images.logoTransparent} />
//                 <Text black size14 style={{  paddingVertical: 10,  paddingHorizontal: 50,  textAlign: "center"  }}  >
//                          Cùng chờ đón những cập nhật mới trong thời gian tới nhé!
//                 </Text>
//               </View> : 
//           <FlatList 
//             keyExtractor={item => item._id}
//             data = {data}
//             numColumns={2}
//             renderItem = {({item,index})=>{
//               return (
//                 <TouchableOpacity key={index} 
//                   onPress={() => {
//                     // Communications.phonecall(item.hotline, true)
//                   }}
//                   style={[styles.folder, { marginRight: 20 ,marginVertical :20 }]}>
                 
//                   <ImageBackground source={images.policy} style={styles.img} >
//                      <Image source={images.hand} style = {{width : 117 , height : 117}} resizeMode ={'contain'}/>
//                      <Text size20 white style ={{marginTop:12}}>{item.name}</Text>
//                   </ImageBackground>  

//                 </TouchableOpacity>
//               )
//             }}
//           />}
//       </View>
//     )
//   }
}

export default PolicyLibary
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