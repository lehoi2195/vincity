import React, { Component } from "react";
import { StyleSheet , FlatList ,TouchableOpacity ,Image } from "react-native";
import { Text, View } from "native-base";

import AppStyles from "../../../styles";
import images from '../../../assets/images';
import Header from '../../../components/Header';
import DocumentList from '../DocumentList';

class SampleDocumentLibary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDocument: false,
      documentSelected :{},
      documentIndex : 0
    };
  }
  onPress = (item, index) => {
    this.setState({
      showDocument: true,
      documentSelected: item,
      documentIndex: index
    });
  };
  renderDocumentList(){
    return (
      <DocumentList 
       document={this.state.documentSelected}
       onBack={this.onBack}/>
     );
  }
  onBack = () => {
    this.setState({
      showDocument: false,
      documentSelected: {},
      documentIndex: 0
    });
  };
  renderDocument(){
    const { data } = this.props;
    return (
      <View style={[styles.wrapper, AppStyles.paddingContent]}>
        <Header title={"Mẫu văn bản"} />
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
          numColumns={4}
          renderItem = {({item,index})=>{
            return(
              <TouchableOpacity onPress={() => this.onPress(item, index)}  style = {{backgroundColor :"#F2F2F2" , width : 275 , height :140 ,justifyContent :'center' , alignItems :'center' , marginRight: 20 ,marginVertical :20}}>
                <Image source ={images.iconFolder} style = {{ width : 34 , height :30 ,marginBottom :14 }} resizeMode ="contain" />
                  <Text size14 black >{item.name}</Text>
              </TouchableOpacity>
            )
          }}
        />}
      </View>
    );
  }
  render() {
    return this.state.showDocument ? this.renderDocumentList() :this.renderDocument()
  }
}

export default SampleDocumentLibary;
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