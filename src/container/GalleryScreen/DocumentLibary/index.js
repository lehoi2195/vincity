import React, { Component } from "react";
import {
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Text, View } from "native-base";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import DeviceInfo from "react-native-device-info";
import Header from "@components/Header";

import images from "@assets/images";
import variables from "@theme/variables";
import { getToken } from "@store/selectors";
import { searchDocument } from "@store/actions";
import { convertToSearchName } from "@utils";
import AppStyles from "@styles";

const width = variables.deviceWidth;

class DocumentLibrary extends Component {
  static defaultProps = {
    isSearch: false
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      files: {},
      title: ""
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data, defaultData: this.props.data });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data, defaultData: nextProps.data });
    }
  }

  onPress = (title, data) => {};

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.onPress(item.name, item)}
        style={[
          styles.folder,
          {
            marginLeft: index % 4 === 0 ? 0 : 10,
            marginRight: 10,
            marginVertical: 10
          }
        ]}
      >
        <Image
          source={images.iconFolder}
          style={styles.img}
          resizeMode="contain"
        />

        <Text size14 normal gray1 numberOfLines={2} style={{ marginTop: 8 }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { data } = this.state;
    const { loading } = this.props;
    if (loading) {
      return (
        <View center style={{ flex: 1 }}>
          <Image source={images.logoTransparent} />
          <Text
            black
            size14
            style={{
              paddingVertical: 10,
              paddingHorizontal: 50,
              textAlign: "center"
            }}
          >
            Cùng chờ đón những cập nhật mới trong thời gian tới nhé!
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.wrapper, AppStyles.paddingContent]}>
        <Header title={"Tài liệu"} />
        <FlatList
          contentContainerStyle={{ paddingVertical: 40 }}
          numColumns={4}
          data={data}
          extraData={this.props}
          keyExtractor={index => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
export default connect(
  state => ({
    token: getToken(state)
  }),
  {
    searchDocument
  }
)(DocumentLibrary);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  folder: {
    alignItems: "center",
    justifyContent: "center",
    width: 275,
    height: 140,
    backgroundColor: "#F2F2F2",
    borderRadius: 2
  },
  img: {
    width: 34,
    height: 34
  },
  search: {
    paddingVertical: 3,
    paddingLeft: 12,
    paddingRight: 10,
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    borderColor: "#e0e0e0",
    borderWidth: variables.borderWidth,
    marginBottom: 10
  },
  input: {
    color: "#808284",
    fontSize: DeviceInfo.isTablet() ? 20 : 12,
    fontFamily: "Montserrat-Regular",
    width: "90%",
    height: 36,
    marginLeft: 5
  },
  itemOption: {
    width: "100%",
    height: variables.deviceHeight * 0.1,
    flexDirection: "row",
    alignItems: "center"
  },
  iconNote: {
    width: variables.deviceWidth * 0.106,
    height: variables.deviceWidth * 0.106,
    marginRight: variables.deviceWidth * 0.048
  }
});
