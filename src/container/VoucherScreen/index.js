
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList, TouchableOpacity
} from "react-native";
import images from "../../assets/images";
import { View, Text } from 'native-base';
const { width, height } = Dimensions.get("window");
import { connect } from 'react-redux';
import { getListPromotion } from '@store/actions';
import { getToken, isRequestPending } from "@store/selectors";
import AppStyles from "@styles";
import Voucher from './Voucher';
import VoucherDetail from "./VoucherDetail";
import { scale, verticalScale } from '@utils/scale';
class VoucherScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      showDetail: false,
      indexSelected: -1
    }
  }

  componentDidMount() {
    this.props.getListPromotion(this.props.token, 1, (err, data) => {
      console.log('data voucher', data);
      if (err) return;
      this.setState({ data: data.data })
    })
  }
  renderDefault() {
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
          Cùng chờ đón những cập nhật mới trong thời gian tới nhé!!!!!
      </Text>
      </View>)
  }

  renderContent() {
    const { data } = this.state;
    //check render theo so luong 1-7 item.
    return (
      <View style={{ paddingHorizontal: 31, paddingVertical: 105 }}>
        <View row>
          <TouchableOpacity onPress={() => this.setState({ showDetail: true })}>
            <Image source={{ uri: data[0].thumbnail }} style={{ width: scale(866), height: verticalScale(421) }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <Image source={{ uri: data[1].thumbnail }} style={{ width: scale(423), height: verticalScale(421) }} />
          </TouchableOpacity>
        </View>
        <View row style={{ marginTop: 20 }}>
          <Image source={{ uri: data[2].thumbnail }} style={{ width: scale(423), height: verticalScale(421) }} />
          <View style={{ marginLeft: 20 }}>
            <Image source={{ uri: data[3].thumbnail }} style={{ width: scale(423), height: verticalScale(202) }} />
            <Image source={{ uri: data[4].thumbnail }} style={{ width: scale(423), height: verticalScale(202), marginTop: 20 }} />
          </View>

          <View style={{ marginLeft: 20 }}>
            <Image source={{ uri: data[5].thumbnail }} style={{ width: scale(423), height: verticalScale(202) }} />
            <Image source={{ uri: data[6].thumbnail }} style={{ width: scale(423), height: verticalScale(202), marginTop: 20 }} />
          </View>
        </View>
      </View>
    )
  }

  renderDetail() {
    return (
      <VoucherDetail voucher={this.state.data[0]} />
    )
  }

  renderList() {
    //xu ly touch vao tung item 
    const { data } = this.state;
    return (<View>
      <View style={{ paddingTop: 28, paddingLeft: 22, paddingBottom: 8 }}>
        <Text size14 style={{ color: ' #1C1C1C', fontWeight: 600 }}>Ưu đãi dành cho bạn</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={index => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <Voucher
              onPress={() => this.setState({ indexSelected: index })}
              hightlight={this.state.indexSelected === index} content={item.title} />
          );
        }}
      />
    </View>)
  }
  renderView() {
    const { data } = this.state;
    return (
      <View row style={styles.container}>
        <View style={AppStyles.content}>{this.state.showDetail ? this.renderDetail() : this.renderContent()}</View>
        <View
          style={[AppStyles.sidebar, { paddingTop: 108, paddingRight: 42 }]}
        >
          {this.renderList()}

        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.loading ? <ActivityIndicator size="large" /> : this.state.data.length > 0 ? this.renderView() : this.renderDefault()}
      </View>
    )
  }
}
export default connect(
  state => ({
    token: getToken(state),
    loading: isRequestPending(state, "getListPromotion")
  }),
  {
    getListPromotion
  }
)(VoucherScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
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
