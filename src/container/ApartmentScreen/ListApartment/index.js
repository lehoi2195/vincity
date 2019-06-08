import React, { Component } from 'react';
import {TouchableOpacity ,Image} from 'react-native';
import {Text, View } from 'native-base'

import images from '../../../assets/images';


class ListApartment extends Component {
    constructor(props){
        super(props);
        this.state= {
           
        }
    }
    onPress = (apartment,item)=>{
        const {chooseCompare} = this.props
        chooseCompare && chooseCompare(apartment,item)
    }
    onPressApartment= (apartment,selected ,index ,item )=>{
    
        const {chooseApartment , unChooseApartment ,disable} = this.props
        if(selected){
            unChooseApartment && unChooseApartment(apartment,index , item)
        }
        else{
            if(disable) return ;
            chooseApartment && chooseApartment(apartment , index,item )
        }
    }
  render() {
      const {apartment , apartmentId ,item ,selected ,isCheck , index ,disable} = this.props
      const BgSelect = selected ? '#FFCB2A' : "rgba(219, 219, 219, 0.3)"
      const BgApartMent =  apartment._id === apartmentId ? '#FFCB2A' : "rgba(219, 219, 219, 0.3)"

      console.log("selected" , disable)
      
    return (
        <TouchableOpacity
            disabled= {isCheck ? true :false}
            style={{ backgroundColor: isCheck ? BgSelect: BgApartMent }}
            onPress = {()=> this.onPress(apartment,item) }>

            <View  style={{ flexDirection :'row',borderBottomWidth: 1, borderColor: "#808284", paddingVertical: 16 ,marginHorizontal :34}}>
            {isCheck ? 
                <TouchableOpacity  
                    disabled = {selected ? false : disable}
                    style ={{marginRight :20}} 
                    onPress = {()=>this.onPressApartment(apartment,selected , index ,item )}>
                    <Image source = {selected ? images.Check : images.unCheck} resizeMode ={'contain'} style = {{height : 20 ,width: 20}}/>
                </TouchableOpacity> : null}
                <View row>
                    <Image source={{ uri: apartment.featuredImage }} style={{ height: 80, width: 141 }} />
                        <View style={{ marginLeft: 16 }}>
                            <Text size16 numberOfLines={1} style={{ color: "#000000", width: 200 }} > {apartment.nameType} </Text>
                            <View row style={{ marginTop: 11 }}>
                                <Image source={images.designNormal} style={{ height: 18, width: 18 }} />
                                <Text mediumitalic style={{ marginLeft: 9, color: "#57585B" }} > Thiết kế số 2 </Text>
                            </View>
                        </View>
                    </View>
                </View>
         </TouchableOpacity>
    )
  }
}

export default ListApartment