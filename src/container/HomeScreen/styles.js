import DeviceInfo from "react-native-device-info";
import { Platform, Dimensions } from "react-native";
import variables from "@theme/variables";
const { width, height } = Dimensions.get("window");
const ratio = 1;
const imgWidth = width;
const imgHeight = height;
// const imgWidth = 838;
// const imgHeight = 1167.62;

const regionHeight = imgWidth;
const regionWidth = imgHeight;

export default {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  wrapper: {
    flex: 1,
    backgroundColor: "#fffcf5"
  },

  ground: {
    width,
    height
  },

  zoomLayout: {
    width,
    height
  },

  imageMap: {
    width: "100%",
    height: "100%"
  },

  //Header
  header: {
    justifyContent: "space-between",
    width: height,
    height: width * 0.15,
    flexDirection: "row",
    position: "absolute",
    top: 0
  },

  btnBack: {
    marginTop: DeviceInfo.isTablet() ? width * 0.04 : width * 0.06,
    marginLeft: width * 0.135
  },

  imgBack: {
    width: DeviceInfo.isTablet() ? 40 : 22,
    height: DeviceInfo.isTablet() ? 20 : 12
  },

  arrowDown: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: width * 0.12
  },
  imgDropDown: {
    width: width * 0.13,
    height: width * 0.13,
    marginTop: 15
  },

  txtTitle: {
    textAlign: "center",
    marginTop: width * 0.04
  },

  right: {
    height: 1,
    width: width * 0.2
  },

  btnView360: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 22,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3
  },

  btnDetail: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  modalGuide: {
    margin: 0,
    alignItems: "center"
  },
  viewGuide: {
    margin: 0,
    width: variables.deviceWidth,
    height: variables.deviceHeight
  },
  G6: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: DeviceInfo.isTablet() ? height / 2.3 : height / 2.2,
    right: DeviceInfo.isTablet() ? width / 6 : width / 6
  },
  imgG3: {
    width: DeviceInfo.isTablet() ? width * 0.1 : width * 0.133,
    height: DeviceInfo.isTablet()
      ? (width * 0.1) / 0.4626
      : (width * 0.133) / 0.4626
  }
};
