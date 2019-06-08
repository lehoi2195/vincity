import React, { Component } from 'react';
import { Image ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Text, View,  } from 'native-base';
import _ from 'lodash'

import images from '../../../assets/images';
import ApartmentCompare from '../ApartmentCompare';


@connect(
  state => ({
    apartmentsCompare : state.apartment.apartmentsCompare
  }),{}
)
class CompareScreen extends Component {
  componentDidMount(){}
  render() {
    const {apartment ,apartmentsCompare ,newCompares} = this.props
    console.log ("apartmentsCompare" ,apartmentsCompare)
    return (
            <View  style = {{ flex :1 }}>
            {_.isEmpty(apartmentsCompare) ? 
              <View center style={{ flex: 1 }}>
                <Image source={images.logoTransparent} />
                <Text black size14 style={{ paddingVertical: 10, paddingHorizontal: 50, textAlign: "center"  }}> Hãy chọn 2 căn hộ để so sánh nhé!</Text>
              </View>:
              <FlatList
                data = {apartmentsCompare.filter(item=>item._id === item._id)}
                extraData = {this.state}
                keyExtractor = {index => index.toString()}
                renderItem = {({item,index})=>
                  <ApartmentCompare 
                    key ={index}
                    apartment ={item}
                  />
            }
            />}
    
      
          </ View>
    )
  }
}

export default CompareScreen;
