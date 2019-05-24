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
import DoucmentViewer from "../DocumentViewer";
const width = variables.deviceWidth;

class DocumentLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDocumentDetail: false,
      documentSelected: {},
      documentIndex: 0
    };
  }

  onPress = (item, index) => {
    this.setState({
      showDocumentDetail: true,
      documentSelected: item,
      documentIndex: index
    });
  };
  onBack = () => {
    this.setState({
      showDocumentDetail: false,
      documentSelected: {},
      documentIndex: 0
    });
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.onPress(item, index)}
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
          source={images.iconFile}
          style={styles.img}
          resizeMode="contain"
        />

        <Text size14 normal gray1 numberOfLines={2} style={{ marginTop: 8 }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  renderDocumentViewer() {
    return (
      <DoucmentViewer
        document={this.state.documentSelected}
        index={this.state.documentIndex}
        onBack={this.onBack}
      />
    );
  }
  renderList() {
    const { folder, index } = this.props;
    if (!folder) {
      return (
        <View style={[styles.wrapper, AppStyles.paddingContent]}>
          <Header
            theme="dark"
            title={folder.name}
            showBack
            onBack={() => this.props.onBack()}
          />
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
        </View>
      );
    }

    return (
      <View style={[styles.wrapper, AppStyles.paddingContent]}>
        <Header
          theme="dark"
          title={folder.name}
          showBack
          onBack={() => this.props.onBack()}
        />
        <FlatList
          contentContainerStyle={{ paddingVertical: 40 }}
          numColumns={4}
          data={folder.links}
          extraData={this.props}
          keyExtractor={index => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
  render() {
    return this.state.showDocumentDetail
      ? this.renderDocumentViewer()
      : this.renderList();
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
