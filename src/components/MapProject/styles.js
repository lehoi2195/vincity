import DeviceInfo from "react-native-device-info";
import variables from "@theme/variables";
const width = variables.deviceWidth;
const height = variables.deviceHeight;

const rootWidth = 1371;
const rootHeight = 1080;

export default {
  wrapper: {
    height: rootHeight,
    width: rootWidth,
    backgroundColor: "#FFF"
  },

  zoomLayout: {
    width: rootWidth,
    height: rootHeight
  },

  imageMap: {
    width: "100%",
    height: "100%"
  },

  header: {
    justifyContent: "space-between",
    width: height,
    height: width * 0.15,
    flexDirection: "row",
    position: "absolute",
    top: 0
  },
  txtTitle: {
    textAlign: "center",
    marginTop: width * 0.04
  },
  backImg: {
    width: DeviceInfo.isTablet() ? 50 : 22,
    height: DeviceInfo.isTablet() ? 30 : 12
  },
  btnBack: {
    marginTop: width * 0.06,
    marginLeft: width * 0.135
  },

  img360: {
    width: 30,
    height: 30
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
  }
};
