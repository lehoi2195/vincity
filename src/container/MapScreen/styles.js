import DeviceInfo from "react-native-device-info";
import variables from "@theme/variables";
import { isIphoneX, isIphoneXR } from "@utils";
const width = variables.deviceWidth;
const height = variables.deviceHeight;
const ratioX = 1.5816;
const ratioY = 2.1706;
const leftt = isIphoneX()
  ? height - variables.tabbarHeight
  : isIphoneXR()
  ? height - variables.tabbarHeight - 84
  : height;
export default {
  wrapper: {
    width: width - 84,
    height
  },

  thePark: {},

  btnFillter: {
    justifyContent: "center",
    alignItems: "center",
    width: DeviceInfo.isTablet() ? width * 0.09 : width * 0.13,
    height: DeviceInfo.isTablet() ? width * 0.09 : width * 0.13,
    borderRadius: DeviceInfo.isTablet()
      ? (width * 0.09) / 2
      : (width * 0.13) / 2,
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

  img360: {
    width: 30,
    height: 30
  },

  itemOptions: {
    width: DeviceInfo.isTablet() ? width * 0.29 : width * 0.44,
    height: DeviceInfo.isTablet() ? width * 0.066 : width * 0.096,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: DeviceInfo.isTablet() ? 30 : 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    top: DeviceInfo.isTablet() ? width * 0.18 : width * 0.211,
    left: DeviceInfo.isTablet() ? width * 0.08 : width * 0.137
  },

  imgNext: {
    width: DeviceInfo.isTablet() ? 40 : 20,
    height: DeviceInfo.isTablet() ? 40 : 20
  },

  modal: {
    backgroundColor: "#fff",
    width: height * 0.656,
    height: width
  },

  headerModal: {
    width: "100%",
    height: width * 0.187,
    justifyContent: "space-between",
    paddingHorizontal: 20
  },

  backModal: {
    width: 20,
    height: 25,
    marginLeft: 33
  },

  region: {
    width: "100%",
    height: width * 0.613
  },

  itemRegion: {
    width: (height * 0.656) / 2 - 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  building: {
    width: "100%",
    height: width * 0.813
  },
  apartment: {
    width: "100%",
    height: 50,
    paddingLeft: width * (15 / width)
  },
  btnApartmentActive: {
    width: (height * 0.656) / 4 - width * 0.04,
    height: DeviceInfo.isTablet() ? width * (50 / width) : width * (35 / width),
    borderRadius: DeviceInfo.isTablet() ? (width * (50 / width)) / 2 : 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2EB569",
    marginRight: 7
  },
  btnApartment: {
    width: (height * 0.656) / 4 - width * 0.04,
    height: DeviceInfo.isTablet() ? width * (50 / width) : width * (35 / width),
    borderRadius: DeviceInfo.isTablet() ? (width * (50 / width)) / 2 : 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    marginRight: 7
  },
  buildingItem: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 10
  },
  bottomModal: {
    margin: 0,
    alignItems: "center"
  },
  modalContent: {
    margin: 0,
    width: variables.deviceHeight,
    height: variables.deviceWidth
  },
  G3: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: DeviceInfo.isTablet() ? width * 0.18 - 5 : width * 0.211 - 5,
    left: DeviceInfo.isTablet() ? width * 0.16 : width * 0.274
  },

  imgG3: {
    width: DeviceInfo.isTablet() ? width * 0.1 : width * 0.133,
    height: DeviceInfo.isTablet()
      ? (width * 0.1) / 0.4696
      : (width * 0.133) / 0.4696
  },

  G9: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: DeviceInfo.isTablet() ? width * 0.28 - 5 : width * 0.331 - 5,
    left: DeviceInfo.isTablet() ? width * 0.16 : width * 0.274
  },
  G10: {
    justifyContent: "center",
    alignItems: "center"
    // position: 'absolute',
    // top: width / ratioY - (width * 0.133 / 0.4696) / 2,
    // left: leftt / ratioX - (height * 0.2253) - ((DeviceInfo.isTablet() ? width * 0.1 : width * 0.133) / 2),
  },
  G100: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: height / 4,
    left: width / 6
  }
};
