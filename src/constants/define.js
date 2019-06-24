import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import images from "../assets/images/index";
import variables from "../../theme/variables";
const width = variables.deviceWidth;
const ratio = 1;
const ratioW = (width - 84) / 1167.62;
const ratioH = variables.deviceHeight / 838;
export const defineProject = [
  {
    name: "Vinhomes Ocean Park",
    key: "OCEAN_PARK",
    regionMap: Platform.OS === "ios" ? images.region : images.regionOceanPark1,
    btnHighlight: {
      width: 238,
      height: 50,
      top: 370 * ratioH,
      left: 680 * ratioW
    },
    highlightRegion: [
      {
        width: DeviceInfo.isTablet() ? 238 * ratio : 238,
        height: DeviceInfo.isTablet() ? 238 * ratio : 238,
        top: DeviceInfo.isTablet() ? 302 * ratio : 302,
        left: DeviceInfo.isTablet() ? 546 * ratio - 27 : 546,
        borderRadius: DeviceInfo.isTablet() ? 119 * ratio : 119,
        zIndex: 999,
        source: images.opacityOPSmall,
        background: "rgba(0, 0, 0, 0.3)"
      },
      {
        width: DeviceInfo.isTablet() ? ratio * 398 : 398,
        height: DeviceInfo.isTablet() ? 398 * ratio : 398,
        top: DeviceInfo.isTablet() ? 223 * ratio : 223,
        left: DeviceInfo.isTablet() ? 467 * ratio - 27 : 467,
        borderRadius: 199,
        zIndex: 450,
        source: images.opacityOPMedium,
        background: "rgba(0, 0, 0, 0.3)"
      },
      {
        width: DeviceInfo.isTablet() ? ratio * 700 : 700,
        height: DeviceInfo.isTablet() ? ratio * 680 : 680,
        top: DeviceInfo.isTablet() ? ratio * 85 : 85,
        left: DeviceInfo.isTablet() ? ratio * 320 - 27 : 320,
        borderRadius: DeviceInfo.isTablet() ? ratio * 387 : 387,
        zIndex: 100,
        source: images.opacityOPLarge,
        background: "rgba(0, 0, 0, 0.3)"
      },
      {
        width: DeviceInfo.isTablet() ? ratio * 3000 : 3000,
        height: DeviceInfo.isTablet() ? ratio * 838 : 838,
        top: DeviceInfo.isTablet() ? ratio * 0 : 0,
        left: DeviceInfo.isTablet() ? ratio * -300 - 27 : -300,
        borderRadius: DeviceInfo.isTablet() ? ratio * 0 : 0,
        zIndex: 50,
        source: images.opacityTransparent,
        background: "transparent"
      }
    ],
    zoneMap: images.oceanParkMaps,
    zones: [
      {
        name: "The Park",
        key: "THE_PARK",
        highlight: images.highLightThePark,
        top: 804.5,
        left: 632,
        wRegion: 329.5,
        hRegion: 373.5,
        scale: DeviceInfo.isTablet() ? 2.5 : Platform.OS === "ios" ? 1 : 1.7,
        scaleApart: DeviceInfo.isTablet()
          ? 2.5
          : Platform.OS === "ios"
            ? 1.7
            : 2.5,
        buildings: [
          // L
          {
            key: "OCEAN_P02",
            name: "P2",
            src: images.P02,
            w: 37,
            h: 47.5,
            left: 714.5,
            top: 975.86,
            imageGround: [images.P02_2_10, images.P02_11_27]
          },
          {
            key: "OCEAN_P05",
            name: "P5",
            src: images.P05,
            w: 49.5,
            h: 37,
            left: 655.15,
            top: 922.48,
            imageGround: [images.P05_2_10, images.P05_11_26]
          },
          {
            key: "OCEAN_P11",
            name: "P11",
            src: images.P11,
            w: 45,
            h: 36.5,
            left: 883,
            top: 912.55,
            imageGround: [images.P11_3_10, images.P11_11_26]
          },
          {
            key: "OCEAN_P12",
            name: "P12",
            src: images.P12,
            w: 44.5,
            h: 35.5,
            left: 903,
            top: 938.36,
            imageGround: [images.P12_3_10, images.P12_11_26]
          },
          {
            key: "OCEAN_P18",
            name: "P18",
            src: images.P18,
            w: 44.5,
            h: 33,
            left: 819,
            top: 1069.36,
            imageGround: [images.P18_3_10, images.P18_3_10]
          },
          {
            key: "OCEAN_P19",
            name: "P19",
            src: images.P19,
            w: 45,
            h: 34.5,
            left: 803,
            top: 1045,
            imageGround: [images.P19_2_10, images.P19_11_26]
          },

          // U
          {
            key: "OCEAN_P03",
            name: "P3",
            src: images.P03,
            w: 50,
            h: 56.5,
            top: 960.86,
            left: 658.5,
            imageGround: [images.P03_2_26]
          },
          {
            key: "OCEAN_P06",
            name: "P6",
            src: images.P06,
            w: 58.5,
            h: 43.5,
            top: 879.86,
            left: 743.2,
            imageGround: [images.P06_2_26]
          },
          {
            key: "OCEAN_P07",
            name: "P7",
            src: images.P07,
            w: 44,
            h: 59.5,
            top: 831.86,
            left: 723,
            imageGround: [images.P07_3_25]
          },
          {
            key: "OCEAN_P08",
            name: "P8",
            src: images.P08,
            w: 59,
            h: 46.5,
            top: 842.36,
            left: 768.5,
            imageGround: [images.P08_3_26]
          },
          {
            key: "OCEAN_P09",
            name: "P9",
            src: images.P09,
            w: 43.5,
            h: 62,
            top: 873,
            left: 804.5,
            imageGround: [images.P09_3_26]
          },
          {
            key: "OCEAN_P16",
            name: "P16",
            src: images.P16,
            w: 43.5,
            h: 60,
            top: 967.5,
            left: 844.5,
            imageGround: [images.P16_2_26]
          },

          // Z
          {
            key: "OCEAN_P01",
            name: "P1",
            src: images.P01,
            w: 38,
            h: 43,
            top: 1009.86,
            left: 730,
            imageGround: [images.P01_2_27]
          },

          // T
          {
            key: "OCEAN_P10",
            name: "P10",
            src: images.P10,
            w: 37.5,
            h: 38,
            top: 893.86,
            left: 848,
            imageGround: [images.P10_3_26]
          },
          {
            key: "OCEAN_P15",
            name: "P15",
            src: images.P15,
            w: 36.5,
            h: 37.5,
            top: 973.5,
            left: 890,
            imageGround: [images.P15_3_26]
          },
          {
            key: "OCEAN_P17",
            name: "P17",
            src: images.P17,
            w: 35,
            h: 42,
            top: 1018.5,
            left: 856,
            imageGround: [images.P17_3_25]
          }
        ]
      }
    ]
  }
];
