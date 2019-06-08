/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
} from "react-native";
import { View, Text, Content,Toast} from "native-base";
import { connect } from "react-redux";
import _ from "lodash";

import images from "../../assets/images";
import { getToken, isRequestPending } from "../../store/selectors";
const { width, height } = Dimensions.get("window");
import AppStyles from "@styles";
import HeaderSwiper from "./BannerSwiper";
import ApartmentDetail from "./ApartmentDetail"
import { getApartmentsCate, saveApartmentCompare } from "../../store/actions";
import ListApartment from "./ListApartment";
import CompareScreen from './CompareScreen';

// import console = require("console");

const data = [
  { text: "Giới thiệu dự án" },
  { text: "Thông báo ngày 09-08" },
  { text: "Điều khoản mua nhà" },
  { text: "Giới thiệu dự án" },
  { text: "Thông báo ngày 09-08" },
  { text: "Điều khoản mua nhà" }
];

@connect(
  state => ({
    token: getToken(state),
    loading: isRequestPending(state, "getApartmentsCate")
  }),
  {
    getApartmentsCate,
    saveApartmentCompare
  }
)
export default class ApartmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected : new Map(),
      counter : 0,
      isCheck:false,
      click :false,
      nameType :'',
      apartmentId: '',
      apartmentCates: [],
      apartment: {},
      arrApartment:[],
      newCompares :''
    
    };
  }
  componentDidMount() {
    const { token, getApartmentsCate } = this.props;

    getApartmentsCate(token, (error, data) => {
      if (error) return;
      if (data && data.data) {
        this.setState({ 
           apartmentCates: data.data,
           apartmentId: data.data[0].types[0]._id,
           nameType : data.data[0]._id,
           apartment: data.data[0].types[0],
          })
      }
    });
  }
  chooseCompare = (apartment,item) => {
    this.setState({ apartmentId: apartment._id , nameType :item._id , apartment :apartment ,  });
  };
  onChoose = ()=>{
    this.setState({isCheck : !this.state.isCheck})

  }
  onClick = ()=>{
    this.setState({click : !this.state.click})
  }
  chooseApartment = (apartment ) => {
    this.setState({ counter: this.state.counter + 1 });

    this.setState((state)=>{
      const selected = new Map(state.selected);
      selected.set(apartment._id , !selected.get(apartment._id));
      return{selected }
    });
    const itemSelected = apartment
    const newCompares = [...this.state.arrApartment, itemSelected];
    this.setState({ arrApartment: newCompares }, () => {
      this.props.saveApartmentCompare ({data : this.state.arrApartment})
    });
    
  }
  unChooseApartment = (apartment )=>{
   
    this.setState({counter : this.state.counter - 1 })
    this.setState((state)=>{
      const selected = new Map(state.selected);
      selected.set(apartment._id, !selected.get(apartment._id));
      return { selected };
    })
    for(let i =0 ; i < this.state.arrApartment.length ; i++ ) {
      const element = this.state.arrApartment[i];
      if (element._id === apartment._id) {
        this.state.arrApartment.splice(i, 1)
        this.setState({ arrApartment: this.state.arrApartment ,newCompares :apartment._id},
          () =>{ 
              this.props.saveApartmentCompare ({data : this.state.arrApartment})
        })
        break;
      }
    }

  }
  render() {
    const { apartmentCates, apartment, apartmentId ,nameType ,isCheck ,click  , arrApartment ,newCompares} = this.state;

    return (
      <View style={styles.container}>
        <Image style={styles.banner} source={images.banner} />
        <View  style={{ padding: 42 ,flexDirection :'row' ,justifyContent :'space-between' ,flex :1 }}>
          <View row style = {{ flex :1}}>
            {isCheck ? 
              <CompareScreen apartment = {apartment} newCompares = {newCompares} data = {data}/>
            
            :
            <View row style ={{flex :1}}>
              <HeaderSwiper />
              <ApartmentDetail apartment={apartment} data = {data}/>
            </View>  }
          </View>    
         
          <View style={{ backgroundColor: "rgba(219, 219, 219, 0.3)", width: 422 }}>
            <Content>
              <FlatList
                data={apartmentCates}
                extraData={this.state}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                  return (
                    <View key={index} style={{  }}>
                      <Text style={{ color: nameType === item._id  ? "#FFCB2A":"#808284",marginLeft : 34 , marginTop: 32 }} size18>Căn hộ {item.name}</Text>
                      <View>
                        <FlatList
                          data={item.types}
                          extraData={this.state}
                          keyExtractor={item => item._id}
                          renderItem = {({item : apartment ,index})=>
                            <ListApartment
                            disable = {this.state.counter === 2 ? true :false}
                            isCheck = {isCheck}
                            // selected = {arrApartment.findIndex(apartmentIndex => apartmentIndex._id === apartment._id) >=0 }
                            selected={!!this.state.selected.get(apartment._id)}
                            item ={item}
                            index = {index}
                            apartment = {apartment}
                            apartmentId ={apartmentId}
                            chooseApartment = {(apartment,index)=>{this.chooseApartment(apartment )}}
                            unChooseApartment = {(apartment)=>{this.unChooseApartment(apartment )}}
                            chooseCompare = { (apartment ,item ,apartmentId)=>{this.chooseCompare(apartment , item )}}
                            /> 
                          }
                            />
                      </View>
                    </View>
                  );
                }}
              />
            </Content>
            <View style={{ position: "absolute", bottom: 12, left: 111 }}>
              <TouchableOpacity onPress = {()=>this.onChoose()}>   
                <Image  source={isCheck ?  images.isCheck : images.Compare} resizeMode = {'contain'} style={{ width: 238, height: 50 }}/> 
              </TouchableOpacity>
            </View>
          </View>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
 
  banner: {
    // flex: 1,
    width,
    height: 222
  }
});
