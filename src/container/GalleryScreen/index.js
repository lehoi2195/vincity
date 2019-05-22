/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Image, Dimensions } from "react-native";
import { View, Text } from "native-base";
import AppStyles from "@styles";
import Header from "@components/Header";
import SideBarItem from "@components/SideBarItem";
const { width, height } = Dimensions.get("window");
const GALLERY_TAB = [
  { id: 0, text: "Hình ảnh" },
  { id: 1, text: "Video" },
  { id: 2, text: "Tài liệu" }
];

import images from "@assets/images";
import variables from "@theme/variables";
import {
  actionLibrary,
  getDocumentLibrary,
  getProjectByCity,
  openGallery
} from "@store/actions";
import { getToken, isRequestPending } from "@store/selectors";
import configs from "@src/constants/configs";
import PhotoLibrary from "./PhotoLibary";
import VideoLibrary from "./VideoLibrary";
import { connect } from "react-redux";
import DocumentLibary from "./DocumentLibary";
import PhotoViewer from "./PhotoViewer";
class GalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      index: 0
    };
    this.watcher = null;
  }
  onPressItem = index => {
    this.setState({ index });
  };
  getDocument = query => {
    const { token, getDocumentLibrary } = this.props;
    this.setState({ data: [] });
    getDocumentLibrary(token, query, (error, data) => {
      if (error) return;
      console.log(data);
      if (data && data.data) {
        this.setState({ data: data.data });
      }
    });
  };

  componentDidMount() {
    this.getDocument(`?project=${configs.projectId}`);
  }
  renderHeaderTitle = () => {
    switch (this.state.index) {
      case 0:
        return "Thư viện ảnh";
      case 1:
        return "Thư viện Video";
      case 2:
        return "Tài liệu";
    }
  };

  onPressAlbum = () => {
    this.setState({
      index: 3
    });
  };

  renderContent = () => {
    const { data } = this.state;
    switch (this.state.index) {
      case 0:
        return (
          <PhotoLibrary
            onPressAlbum={this.onPressAlbum}
            tabLabel="Hình ảnh"
            loading={this.props.loading}
            data={data.images || []}
            allImages={data.listImages || []}
            arrFolderImages={data.arrFolderImages || []}
            navigation={this.props.navigation}
          />
        );
      case 1:
        return (
          <VideoLibrary
            tabLabel="Video"
            loading={this.props.loading}
            data={data.video || {}}
            navigation={this.props.navigation}
          />
        );

      case 2:
        return (
          <DocumentLibary
            type={2}
            projectId={configs.projectId}
            tabLabel="Tài liệu"
            loading={this.props.loading}
            data={data.documents || []}
            navigation={this.props.navigation}
          />
        );
      case 3:
        return <PhotoViewer />;
    }
  };

  render() {
    return (
      <View row style={styles.container}>
        <View style={AppStyles.content}>
          {this.renderContent()}
        </View>
        <View
          style={[AppStyles.sidebar, { paddingTop: 108, paddingRight: 42 }]}
        >
          {GALLERY_TAB.map((tab, index) => (
            <SideBarItem
              onPress={() => this.onPressItem(index)}
              active={this.state.index === index}
              text={tab.text}
              key={tab.id.toString()}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    token: getToken(state),
    loading: isRequestPending(state, "getDocumentLibrary")
    // dropLibrary: state.app.dropLibrary,
  }),
  {
    actionLibrary,
    getDocumentLibrary,
    getProjectByCity,
    openGallery
  }
)(GalleryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
    // backgroundColor:'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
