import React, { Component } from "react";
import {StyleSheet,Image,Dimensions} from "react-native";
import {View, Text} from 'native-base';
import { connect } from "react-redux";

import images from "../../assets/images";
import AgencyLibary from "./AgencyLibary";
import PolicyLibary from "./PolicyLibary";
import ProcedureLibary from "./ProcedureLibary";
import SampleDocumentLibary from "./SampleDocumentLibary";
import SideBarItem from "../../components/SideBarItem";
import AppStyles from "../../styles";
import { getDocumentLibrary ,getPolicy} from '../../store/actions';
import { getToken, isRequestPending } from "../../store/selectors";
// import console = require("console");
// import console = require("console");

// import console = require("console");

const GALLERY_TAB = [
  { id: 0, text: "Đại lý bán hàng" },
  { id: 1, text: "Chính sách hỗ trợ" },
  { id: 2, text: "Thủ tục" },
  { id: 3, text: "Mẫu văn bản" },
];

const { width, height } = Dimensions.get("window");

@connect(
  state => ({
    token: getToken(state),
    loading: isRequestPending(state, "getDocumentLibrary"),
    project: state.user.allProjects
  }),
  {
    getDocumentLibrary,
    getPolicy
  }
)
export default class SupportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      index: 0,
      dataAgency: [],
      projectId: props.project[0]._id || null,
    };
    this.watcher = null;
  }
  getAllPolicy = (projectId) => {
    const { token, getPolicy } = this.props;
    getPolicy(token, projectId, (error, data) => {
        if (error) return;
        if (data && data.data) {
            this.setState({ dataAgency: data.data } , )
        }
    })
  }
  getDocument = (query) => {
    const { token, getDocumentLibrary } = this.props;
    getDocumentLibrary(token, query, (error, data) => {
      if (error) return;
      if (data && data.data) {
          this.setState({ data: data.data } , ()=>{console.log("__________ " , this.state.data)})
      }
  })
  }
  componentDidMount() {
    const { projectId } = this.state;
    if (projectId === null) return;
    this.getDocument(`?project=${projectId}`);
    this.getAllPolicy(projectId);
   
  }
  onPressItem = index => {
    this.setState({ index });
  };
  renderHeaderTitle = () => {
    switch (this.state.index) {
      case 0:
        return "Đại lý danh sách";
      case 1:
        return "Chính sách hỗ trợ";
      case 2:
        return "Thủ tục";
      case 3:
          return "Mẫu văn bản"; 
    }
  };
  renderContent = () => {
    const { data , dataAgency } = this.state;

    console.log("Mau van ban" , data)
  
    switch (this.state.index) {
      case 0:
        return (
          <AgencyLibary
            tabLabel="Danh sách đại lý"
            // loading={this.props.loading}
            data={dataAgency}
            // allImages={data.listImages || []}
            // arrFolderImages={data.arrFolderImages || []}
            // navigation={this.props.navigation}
          />
        );
      case 1:
        return (
          <PolicyLibary
            tabLabel="Chính sách hỗ trợ"
            // loading={this.props.loading}
          

            data={data.supportPolicy || []}
            // navigation={this.props.navigation}
          />
        );

      case 2:
        return (
          <ProcedureLibary
            tabLabel="Thủ tục"
            // type={2}
            // projectId={configs.projectId}
            // loading={this.props.loading}
            // data={data.documents || []}
            // navigation={this.props.navigation}
          />
        );
        case 3:
        return (
          <SampleDocumentLibary
            // type={2}
            // projectId={configs.projectId}
            tabLabel="Mẫu văn bản"
            data={data.templateDocuments || []}
            // loading={this.props.loading}
            // data={data.supportPolicy || []}
            // navigation={this.props.navigation}
          />
        );
    }
  };
  render() {
    return (
      <View row style={styles.container}>
        <View style={AppStyles.content}>{this.renderContent()}</View>
        <View style={[AppStyles.sidebar, { paddingTop: 108, paddingRight: 42 }]} >
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

