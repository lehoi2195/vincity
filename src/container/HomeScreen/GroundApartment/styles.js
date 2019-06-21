import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import variables from '../../../../theme/variables';
const width = variables.deviceWidth;
const height = variables.deviceHeight;
const ratio = 1;

const rootWidth = 1371;
const rootHeight = 1080;

export default {

    //container
    wrapper: {
        // flex: 1,
        backgroundColor: 'yellow'
    },

    // ground -- Mặt bằng
    ground: {
        width: 1371,
        height: 1080,
        backgroundColor :'red'
    },
    zoomLayout: {
        width: rootWidth,
        height: rootHeight,
    },

    imageMap: {
        // width: groundWidth,
        // height: groundHeight,
        width : 100,
        height : 100
    },

    //Header
    header: {
        justifyContent: 'space-between',
        width: height,
        height: width * 0.15,
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
    },

    btnBack: {
        marginTop: width * 0.06,
        marginLeft: width * 0.135,
    },

    backImg: {
        width: DeviceInfo.isTablet() ? 50 : 22,
        height: DeviceInfo.isTablet() ? 30 : 12
    },

    arrowDown: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: width * 0.12,
        paddingTop: 10
    },
    imgDropDown: {
        width: width * 0.13,
        height: width * 0.13,
        marginTop: 15,
    },

    txtTitle: {
        textAlign: "center",
        marginTop: width * 0.02,
    },

    right: {
        height: 1,
        width: width * 0.2
    },

    //Modal

    modal: {
        backgroundColor: "rgb(0,0,0)",
        width: height - variables.tabbarHeight,
        height: width - width * 0.15,
        alignItems: 'center',
        opacity: 0.75
    },

    txtFloor: {
        textAlign: 'center',
        marginTop: 15,
        marginLeft: 2 * (width * 0.07)
    },
    bottomModal: {
        margin: 0,
        alignItems: "center",
    },
    viewGuide: {
        margin: 0,
        width: variables.deviceWidth,
        height: variables.deviceHeight,
    },
    G11: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgG3: {
        width: DeviceInfo.isTablet() ? width * 0.1 : width * 0.133,
        height: DeviceInfo.isTablet() ? width * 0.1 / 0.4696 : width * 0.133 / 0.4696
    },
    btnOk: {
        marginLeft: 50,
        paddingHorizontal: DeviceInfo.isTablet() ? 20 : 15,
        paddingVertical: DeviceInfo.isTablet() ? 10 : 7,
        backgroundColor: '#fff',
        borderRadius: 20
    },
};
