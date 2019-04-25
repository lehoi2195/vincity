import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import variable from "./../variables";

export default (variables = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize - 1,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    // color
    ".white": {
      color: '#ffffff',
    },
    ".black": {
      color: '#000000',
    },
    ".black1": {
      color: '#1C1C1C',
    },
    '.grey1': {
      color: '#434345',
    },
    '.grey2': {
      color: '#57585B',
    },
    '.grey3': {
      color: "#808284",
    },
    '.grey4': {
      color: '#A7A9AB',
    },
    '.primary': {
      color: '#0B3547'
    },
    '.blue1': {
      color: '#509ED6'
    },

    //Size
    ".size8": {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 18 : 12 : 8,
    },
    ".size10": {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 16 : 14 : 10,
    },
    ".size12": {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 22 : 18 : 12,
    },
    ".size14": {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 22 : 20 : 14,
    },
    ".size16": {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 24 : 22 : 16,
    },
    ".size18": {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 26 : 22 : 18,
    },
    '.size20': {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 28 : 26 : 20,
    },
    '.size22': {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 30 : 26 : 22,
    },
    '.size24': {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 32 : 28 : 24,
    },
    '.size30': {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 38 : 36 : 30,
    },
    '.size32': {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 40 : 36 : 30,
    },
    '.size35': {
      fontSize: DeviceInfo.isTablet() ? Platform.OS === 'ios' ? 40 : 38 : 35
    },

    //fontFamily
    '.normal': {
      fontFamily: 'Montserrat-Regular',
    },
    '.medium': {
      fontFamily: 'Montserrat-Medium'
    },
    '.bold': {
      fontFamily: 'Montserrat-SemiBold',
    },
  };

  return textTheme;
};
