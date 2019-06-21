import React, { Component } from 'react'
import {
    Image,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    Platform,
    Alert,
    FlatList,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Text, View, Toast, Icon, Item } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEvents } from 'react-navigation';
// import Orientation from 'react-native-orientation';
import DeviceInfo from 'react-native-device-info';
// import Modal from 'react-native-modal';

import styles from './styles';
import { handle } from '../../../storage';
import images from '../../../assets/images';
import variables from '../../../../theme/variables';
// import BackButton from '../../../components/BackButton';
import ZoomLayout from '../../../components/ZoomLayout';
// import CustomTabbar from '../../../components/CustomTabbar';
import { getBuilding, updateStatusTourGuideProject, getSingleBuildingType } from '../../../store/actions';
import { getToken } from '../../../store/selectors';

import { groundAparment } from './ground';
import Accordion from 'react-native-collapsible/Accordion';

const width = variables.deviceWidth;
const height = variables.deviceHeight;
const heightGround = 441.04;
const widthGround = 564;
const ratio = 1;
const minZoom = 1;
const maxZoom = 5;

const rootHeight = 1080;
const rootWidth = 1371;

const ratioWregion = rootWidth / 564; // lay ben design cu
const ratioH = rootHeight / 441.04;

@connect(state => ({
    token: getToken(state),
    aparmentType: state.apartment.types,
    buildingType: state.apartment.buildingType,
    isTourGuideProject: state.auth.isTourGuideProject,
}), {
        getBuilding,
        updateStatusTourGuideProject,
        getSingleBuildingType
    })
export default class GroundApartment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formBuilding: {},
            building: {},
            data: this.props.navigation.state.params.data || {},
            buildOfZone: this.props.navigation.state.params.buildOfZone || {},
            buildingOfType: [],
            // showModal: false,
            highlight: false,
            isFocus: true,
            position: 0,
            groundFloors: [],
            srcFloor: "",
            nameFloor: '',
            hidden: true,
            typeBuilding: '',
            floorsKeyClient: '',
            rgba1: 'rgba(0, 0, 0, 0.6)',
            rgba2: 'rgba(0, 0, 0, 0.3)',
            rgba3: 'rgba(255, 255, 255, 0)',
            dataFloors: [],
            isVisible: false,

            activeSections: [],
            select: -1,
            chooseGround: false
        };
        this.scale = null;
    }


    async componentDidMount() {
        const { buildOfZone, } = this.state;
        console.log("buildOfZonerrrr", buildOfZone)

        const { token, getSingleBuildingType, getBuilding, isTourGuideProject } = this.props;

        console.log('buildOfZone: ', buildOfZone);
        this.setState({ srcFloor: buildOfZone.imageGround[0] })
        getBuilding(token, buildOfZone._id, (error, data) => {
            if (error) return;
            if (data && data.data) {
                this.setState({
                    building: { ...data.data, ...buildOfZone, ...{ nameProject: data.data.project.name } },
                    typeBuilding: data.data.keyBuildingType,
                    nameFloor: data.data.floors.length > 0 ? data.data.floors[0].name : "",
                }, () => console.log("dsadasasdddddddddd", data.data.floors[0].name))
            }
        })

        // Get dữ liệu chung của loại toà nhà , Z1, Z2, U1, U2
        getSingleBuildingType(token, buildOfZone.type._id, (error, data) => {
            if (error) return;
            if (data && data.data) {
                console.log('data.data: ', data.data);
                this.setState({ buildingOfType: data.data })
            }
        })

        if (isTourGuideProject) {
            this.timeout = setTimeout(() => {
                this.setState({ isVisible: isTourGuideProject })
            }, 1);
        }

        groundAparment.map(ground => {
            if (buildOfZone.type && ground.type === buildOfZone.type.key) {
                if (ground.nameType) {
                    this.setState({
                        formBuilding: ground,
                        floorsKeyClient: ground.floors[0].keyClient,
                        dataFloors: ground.floors
                    });
                    if (ground.nameType === buildOfZone.key) {
                        this.setState({ groundFloors: ground.floors[0].ground[1] });
                    } else {
                        this.setState({ groundFloors: ground.floors[0].ground[0] });
                    }
                } else {
                    this.setState({
                        formBuilding: ground,
                        groundFloors: ground.floors[0].ground,
                        floorsKeyClient: ground.floors[0].keyClient,
                        dataFloors: ground.floors
                    });
                }
                return;
            }
        })
        if (Platform.OS === 'ios') {
            this.scale = setTimeout(() => {
                this.zoomLayout.setZoomScale()
            }, 10);
        } else {
            this.zoomLayout.setZoomScale()
        }
    }
    componentWillUnmount() {
        if (this.scale) clearTimeout(this.scale)
        // Orientation.removeOrientationListener(this._getOrientation);
        if (this.timeout) clearTimeout(this.timeout)
    }
    chooseFloor = async floor => {
        const { building, dataFloors } = this.state;
        const indexFloor = await building.floors.findIndex(flo => flo.key === floor.key);
        const indexGround = await dataFloors.findIndex(flo => flo.keyClient === floor.key)
        this.setState({
            nameFloor: floor.name,
            floorsKeyClient: floor.key,
            groundFloors: dataFloors[indexGround].ground,
            srcFloor: building.imageGround[indexFloor],
            chooseGround: !this.state.chooseGround
        });
    }

    showFloor = () => {
        this.setState({
            // showModal: true,
            rgba1: 'rgba(0, 0, 0, 0.85)',
            rgba2: 'rgba(0, 0, 0, 0.8)',
            rgba3: 'rgba(0, 0, 0, 0.75)',
        })
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    onLongPress = (ground, index) => {
        this.setState({ highlight: true, position: index })
    }

    findBuildType = () => {
        const { buildingOfType } = this.state;
        const floor = buildingOfType.floors;
        for (let i = 0; i < floor.length; i++) {
            if (floor[i].key === this.state.floorsKeyClient)
                return floor[i];
        }
    }

    findAparmentType = (building, aparmentId) => {
        console.log('aparmentId: ', aparmentId);
        console.log('building: ', building);
        const apartments = building.apartments
        for (let i = 0; i < apartments.length; i++) {
            if (apartments[i].key === aparmentId) {
                return apartments[i];
            }
        }
    }

    navigateApartmentDetail = async (ground, index) => {
        const { buildOfZone } = this.props.navigation.state.params;
        console.log('buildOfZone: ', buildOfZone);
        const { building } = this.state;
        console.log('building: ', building);
        const nameBuilding = { nameBuilding: buildOfZone.name, buildingId: buildOfZone._id };
        const nameProject = { nameProject: building.nameProject, projectId: building.project };
        this.setState({ highlight: true, position: index });

        // type ở đây sẽ bằng type trong ground.js (L1, L2, U1, U2, ...)
        try {
            const buildingFind = await this.findBuildType();
            console.log('findAparmentType: ', buildingFind);
            let apartmentFinded = await this.findAparmentType(buildingFind, ground.keyClient);
            console.log('apartmentFinded: ', apartmentFinded);
            const apartment = {
                ...apartmentFinded.type,
                ...apartmentFinded,
                ...nameBuilding,
                ...nameProject
            }
            handle.setTabbarVisible(true);
            console.log('apartment: ', apartment);
            this.props.navigation.navigate("DetailGroundApartment", { isReality: true, apartment, hideTab: true });

        } catch (error) {
            Toast.show({ text: 'Dữ liệu căn hộ đang cập nhập. Cùng chờ đón những cập nhật mới nhé!', duration: 2500 });
            this.setState({ highlight: false, position: 0 })
        }
    }

    showInfo = () => {
        Alert.alert(
            "Thông tin mặt bằng tầng",
            `${this.state.building.desc}`,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
        return;
    }

    onPressOut = () => {
        this.setState({ highlight: false });
    }
    regionMarginTop = margin => margin * ratioH;
    regionMarginLeft = margin => margin * ratioWregion;

    regionSizeW = size => size * ratioWregion;
    regionSizeH = size => size * ratioH;

    renderHighLight = () => {
        const { highlight, position, groundFloors } = this.state;

        console.log("highlighttttttttttt", groundFloors)
        console.log("positionnnnnnnnnnnn", position)
        if (groundFloors && groundFloors.length > 0) {
            return (
                groundFloors.map((ground, index) => (
                    <TouchableOpacity
                        activeOpacity={1}
                        delayLongPress={200}
                        onPressOut={this.onPressOut}
                        onLongPress={() => this.onLongPress(ground, index)}
                        onPress={() => this.navigateApartmentDetail(ground, index)}

                        // onPress = {()=>{alert("dasdas")}}
                        key={index.toString()}
                        style={{
                            position: "absolute",
                            width: this.regionSizeW(ground.w),
                            height: this.regionSizeH(ground.h),
                            left: this.regionMarginLeft(ground.left),
                            top: this.regionMarginTop(ground.top),
                        }}
                    >
                        <Image source={ground.src} style={{ width: this.regionSizeW(ground.w), height: this.regionSizeH(ground.h) }} resizeMode="contain" />

                    </TouchableOpacity >
                ))
            )
        }
    }

    onPressOk = () => {
        const { updateStatusTourGuideProject } = this.props;
        this.setState({ isVisible: false });
        updateStatusTourGuideProject(false)
    }

    _renderHeader = (section, index) => {

        // const { activeSections } = this.state;
        // const isActived = activeSections.findIndex(val => val === index)
        // const nameBuildType = index === 0 ? `${section.name}${"\t"}` : `Toà dạng ${section.name}`;
        console.log("sssssss", section)

        return (
            <View row
                style={{
                    width: 405,
                    height: 55,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: isActived ? '#F2F2F2' : '#FFDB6B',
                    marginTop: 16,
                    flexDirection: 'row',

                }}>
                <Text size13 style={{ color: 'black', fontWeight: isActived ? 'normal' : 'bold' }}>ljlk{"\t"}</Text>
                <Text />
                <Image source={images.icDown} style={{ width: 25, height: 25 }} resizeMode={"contain"} />
            </View>


        );
    };
    chooseApartment = (item) => {
        const { dataDefineZone } = this.props.navigation.state.params;

        const buildDefine = dataDefineZone.dataDefineZone.buildings;
        const index = buildDefine.findIndex(build => build.key === item.key);
        const dataBuild = buildDefine[index];
        console.log("dataDefineZoneeeee", dataBuild)
        this.setState({ srcFloor: dataBuild.imageGround[0] })

    }
    // _renderContent = (section, index) => {

    //     return (

    //         <View style={{ marginTop: 10, alignItems: 'flex-end', }}>
    //             {section.buildings.map((item, index) => {
    //                 return (
    //                     <TouchableOpacity onPress={() => this.chooseApartment(item, index)} style={{ height: 55, width: 272, marginTop: 15, backgroundColor: "#F2F2F2", justifyContent: 'center' }}>
    //                         <Text style={{ marginLeft: 34 }}>Căn hộ {item.name} </Text>
    //                     </TouchableOpacity>
    //                 )
    //             })}
    //             {/* <Text size13 light style={{ lineHeight: 22, width: '87%', paddingBottom: 10, paddingHorizontal: 10 }}>{section.answer}</Text> */}
    //         </View>
    //     );
    // };
    // _updateSections = (activeSections) => {
    //     this.setState({ activeSections });

    // };

    render() {
        const { srcFloor, hidden, rgba1, rgba2, rgba3, nameFloor, building, isVisible, buildOfZone } = this.state;
        console.log("srcFloorrrrrrrrrrrr", srcFloor)
        const { buildingType, zones, nameBuilding } = this.props.navigation.state.params

        console.log("buildingTypeeeee", building.floors)
        return (
            <Container>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ height: 1080, width: 1371 }}>
                        <ZoomLayout
                            ref={ref => this.zoomLayout = ref}
                            style={styles.zoomLayout}
                            minZoom={minZoom}
                            maxZoom={maxZoom}
                            zoomScale={3}
                            imgRootHeight={width}
                            ratio={1}
                        >
                            {srcFloor ?

                                <ImageBackground style={{ width: "100%", height: "100%", }} source={srcFloor} >
                                    {this.renderHighLight()}
                                </ImageBackground>

                                : null
                            }
                        </ZoomLayout>

                        <ImageBackground
                            resizeMode={'contain'}
                            source={images.LinearGradient}
                            style={{
                                justifyContent :'center',
                                alignItems :'center',
                                width: 1371,
                                height: 196,
                                position: 'absolute',
                                top: 0,
                            }} >

                            <Text size30 white style = {{fontWeight :'bold'}}> Bản đồ phân khu </Text>
                        </ImageBackground>


                    </View>

                    <View style={{ width: 465, paddingHorizontal :17}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginRight: 42,
                                marginVertical: 58,
                               
                            }}>
                            <Image
                                source={images.btnBackBlack}
                                style={{ width: 20, height: 10, marginRight: 18 }} />
                            <Text style={{ color: "#434345" }}>Quay lại</Text>
                        </TouchableOpacity>

                        <View center
                            style={{
                                width: 405,
                                height: 55,
                                justifyContent: "space-evenly",
                                backgroundColor: '#F2F2F2',
                             
                            }}>
                            <Text size13 style={{ color: 'black', fontWeight: 'bold', }}>{zones.zones.name}</Text>
                        </View>
                        <View center
                            style={{
                                width: 405,
                                height: 55,
                                justifyContent: "space-evenly",
                                backgroundColor: '#F2F2F2',
                                marginTop: 16,
                             
                            }}>
                            <Text size13 style={{ color: 'black', fontWeight: 'bold', }}>{nameBuilding}</Text>

                        </View>
                        <View center
                            style={{
                                width: 405,
                                height: 55,
                                justifyContent: "space-evenly",
                                backgroundColor: '#F2F2F2',
                                marginTop: 16,
                         
                            }}>
                            <Text size13 style={{ color: 'black', fontWeight: 'bold' }}>Tòa {buildOfZone.name}</Text>
                        </View>

                        <TouchableOpacity row
                            disabled={building.floors && building.floors.length > 1 ? false : true}
                            onPress={() => { this.setState({ chooseGround: !this.state.chooseGround }) }}
                            style={{
                                width: 405,
                                height: 55,
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                backgroundColor: '#F2F2F2',
                                flexDirection: 'row',
                                marginTop: 16,
                           
                            }}>
                            <Text size13 style={{ color: 'black', fontWeight: 'bold' }}>{`${nameFloor}`}</Text>
                            <Text />
                            <Image source={images.icDown} style={{ width: 25, height: 25 }} resizeMode={"contain"} />
                        </TouchableOpacity>

                        {this.state.chooseGround ?
                            <View style={{}}>
                                {building.floors && building.floors.length > 0 && building.floors.map((floor, index) => (
                                    <TouchableOpacity key={index} style={{ backgroundColor: '#F2F2F2', justifyContent: 'center', marginLeft: 115, height: 55, width: 290, marginTop: 10 }} onPress={() => this.chooseFloor(floor)} >
                                        <Text normal size16 style={{ marginLeft: 34, color: 'black', fontWeight: 'bold' }}>{floor.name} </Text>
                                    </TouchableOpacity>)
                                )}
                            </View> : null}                
                    </View>
                </View>


            </Container >
        );
    }
}