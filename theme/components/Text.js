import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import variable from "./../variables";

export default (variables = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize - 1,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    // color
    ".white": {
      color: "#ffffff"
    },
    ".black": {
      color: "#000000"
    },
    ".black1": {
      color: "#1C1C1C"
    },
    ".grey1": {
      color: "#434345"
    },
    ".grey2": {
      color: "#57585B"
    },
    ".grey3": {
      color: "#808284"
    },
    ".grey4": {
      color: "#A7A9AB"
    },
    ".primary": {
      color: "#0B3547"
    },
    ".blue1": {
      color: "#509ED6"
    },

    //Size
    ".size8": {
      fontSize: 8
    },
    ".size10": {
      fontSize: 10
    },
    ".size12": {
      fontSize: 12
    },
    ".size14": {
      fontSize: 14
    },
    ".size16": {
      fontSize: 16
    },
    ".size18": {
      fontSize: 18
    },
    ".size20": {
      fontSize: 20
    },
    ".size22": {
      fontSize: 22
    },
    ".size24": {
      fontSize: 24
    },
    ".size30": {
      fontSize: 30
    },
    ".size32": {
      fontSize: 30
    },
    ".size35": {
      fontSize: 35
    },

    //fontFamily
    ".normal": {
      fontFamily: "Assets/Montserrat-Regular.ttf#Montserrat Regular"
    },
    ".medium": {
      fontFamily: "Assets/Montserrat-Medium.ttf#Montserrat Medium"
    },
    ".mediumitalic": {
      fontFamily: "Assets/Montserrat-MediumItalic.ttf#Montserrat Medium"
    },
    ".semibold": {
      fontFamily: "Assets/Montserrat-SemiBold.ttf#Montserrat SemiBold"
    },
    ".bold": {
      fontFamily: "Assets/Montserrat-Bold.ttf#Montserrat Bold"
    },
    ".extrabold": {
      fontFamily: "Assets/Montserrat-ExtraBold.ttf#Montserrat ExtraBold"
    }
  };

  return textTheme;
};
