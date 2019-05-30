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
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { Text, View } from "native-base";
import images from "../../assets/images";
const { width, height } = Dimensions.get("window");
import DeviceInfo from "react-native-device-info";
import {
  login,
  saveBuildingType,
  saveDataGetAllProject,
  getApartmentsType,
  getBuildingType,
  getAllProjects
} from "../../store/actions";

import { isRequestPending } from "../../store/selectors/common";
import { connect } from "react-redux";
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleLogin = (error, data) => {
    this.setState({ loading: false });
    if (error) {
      Alert.alert(
        "Thông báo",
        `Xảy ra lỗi! Vui lòng kiểm tra kết nối và thử lại sau!`,
        [{ text: "Đồng ý" }],
        { cancelable: false }
      );
      return;
    }

    // console.log("login data", data, error);
    const { getAllProjects, getBuildingType, getApartmentsType } = this.props;

    getAllProjects(data.data.token, (error, data) => {
      if (error) return;
      if (data && data.data) {
        console.log("project data", data);
        this.props.saveDataGetAllProject(data);
      }
    });

    // get data building_TYPE
    getBuildingType(data.data.token);
    // get data apartment_TYPE
    getApartmentsType(data.data.token);
  };

  goLogin = async () => {
    const { isTutorial } = this.props;
    this.props.login(
      {
        deviceId: DeviceInfo.getUniqueID() + "",
        deviceType: Platform.OS + ""
      },
      (err, data) => this.handleLogin(err, data)
    );
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.goLogin();
    }, 300);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={images.background}
          style={{
            width,
            height,
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Image
            source={images.logoTransparent}
            style={{ width: 280, height: 220, marginTop: 188 }}
          />
          {this.state.loading ? (
            <ActivityIndicator
              color="black"
              size={60}
              style={{ marginBottom: 188 }}
            />
          ) : (
            <TouchableOpacity onPress={() => this.props.onExplorer()}>
              <Image
                style={{ width: 380, height: 80, marginBottom: 188 }}
                source={images.btnExplorer}
              />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  login,
  saveBuildingType,
  getApartmentsType,
  getBuildingType,
  getAllProjects,
  saveDataGetAllProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  touch: {
    backgroundColor: "#FFDB6B",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(255, 203, 42, 0.29)",
    shadowOffset: { width: 5, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 1
  }
});
