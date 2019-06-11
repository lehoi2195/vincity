/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Image, Dimensions } from "react-native";
import { View, Text } from "native-base";
const { width, height } = Dimensions.get("window");
import { connect } from 'react-redux';

import images from "../../assets/images";
import ContactItem from "../../components/ContactItem";
import { getToken, isRequestPending } from "../../store/selectors";
import { getContact } from "../../store/actions";
// import console = require("console");

@connect(
  state => ({
    token: getToken(state),
    loading: isRequestPending(state, "getContact"),
    project: state.user.allProjects[0]
  }),
  {
    getContact
  }
)

export default class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataVinCity: [],
    }
  }
  componentDidMount() {
    const { token, getContact, project } = this.props;
    getContact(token, (error, data) => {
        if (error) return;
        if (data && data.data) {
            this.setState({
                dataVinCity: data.data.filter(_pro => _pro.project._id === project._id)
            })
        }
    })
}
  render() {
    const {dataVinCity} = this.state
    console.log("BuiHongSon" , dataVinCity)
    return (
      <View style={{ flex :1}}>
        <Image style={styles.banner} source={images.banner} />
        <View row style ={{justifyContent:"space-evenly" ,flex :1 }}>
          {/* <View style={styles.row1}>
            <Image source={images.logoTransparent} style={styles.logo} />
            <Text  mediumitalic style={{  marginTop: 100,  fontSize: 28,   color: "#464A5B",   fontFamily:  "Assets/Montserrat-MediumItalic.ttf#Montserrat MediumItalic"  }} >
              Thông tin liên hệ
            </Text>
            <Text extrabold style={{ marginTop: 18, fontSize: 34, color: "#464A5B" }} >   VINHOMES OCEAN PARK  </Text>
            <View style={styles.line} />
          </View> */}
          
          <View style = {{}}>
            <Image source={images.logoTransparent} style={styles.logo} />
            <Text  mediumitalic style={{  marginTop: 100,  fontSize: 28,   color: "#464A5B",   fontFamily:  "Assets/Montserrat-MediumItalic.ttf#Montserrat MediumItalic"  }} >
              Thông tin liên hệ
            </Text>
            <Text extrabold style={{ marginTop: 18, fontSize: 34, color: "#464A5B" }} >VINHOMES OCEAN PARK</Text>
            <View style={styles.line} />
          </View>

          {dataVinCity.length > 0 ?  

          <View style={styles.row2}>
            <ContactItem
              source={images.address}
              title = "Website"
              content={dataVinCity[0].website}
            />
            <ContactItem
              source={images.email}
              title = "Email"
              content={dataVinCity[0].email}
            />
            <ContactItem
              source={images.call}
              title = "Hotline"
              content={dataVinCity[0].phone}
            />
            <ContactItem
              source={images.facebook}
              title = "Fanpage"
              content={dataVinCity[0].fanpage}
            />
            <ContactItem
              source={images.location}
              title = "Địa chỉ"
              content={dataVinCity[0].address}
            />
          </View> :
           <View center style={{ flex: 1 }}>
             <Image source={images.logoTransparent} />
              <Text black size14 style={{  paddingVertical: 10,  paddingHorizontal: 50,  textAlign: "center"  }}  >
                  Cùng chờ đón những cập nhật mới trong thời gian tới nhé!
             </Text>
          </View>
          
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
 
  },
  banner: {
    // flex: 1,
    width,
    height: 222
  },
  logo: {
    width: 192,
    height: 152
  },
  row1: {
    backgroundColor :'yellow',
    // marginTop: 155,
    marginLeft: 225
  },
  row2: {
    // marginTop: 155,
    marginLeft: 450
  },
  line: {
    backgroundColor: "#464A5B",
    height: 3,
    width: 144,
    marginTop: 24
  }
});
