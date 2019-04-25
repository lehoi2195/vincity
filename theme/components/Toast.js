import DeviceInfo from 'react-native-device-info'
import variable from "./../variables";

export default (variables = variable) => {
  const platform = variables.platform;

  const toastTheme = {
    ".danger": {
      backgroundColor: variables.brandDanger
    },
    ".warning": {
      backgroundColor: variables.brandWarning
    },
    ".success": {
      backgroundColor: variables.brandSuccess
    },
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    minHeight: 40,

    "NativeBase.Text": {
      color: "#fff",
      flex: 1,
      fontFamily: 'Montserrat-Regular',
      fontSize: DeviceInfo.isTablet() ? 20 : 13,
      textAlign: 'center',
    },
    "NativeBase.Button": {
      backgroundColor: "transparent",
      // height: 30,
      elevation: 0,
      "NativeBase.Text": {
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
      }
    }
  };

  return toastTheme;
};
