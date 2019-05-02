import React, { Component } from 'react';
import {
  Image,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { View, Text } from 'native-base';
import { connect } from 'react-redux';
import images from '../../assets/images'
@connect(state => ({
  orientation: state.app.orientation,
  countUnRead: state.user.countUnRead,
}), {})
export default class TabbarNofication extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, focused, srcActive, srcDeactive, rotate, countUnRead, isBadge } = this.props
    const iconDeactive = (!!countUnRead && countUnRead > 0 && !!isBadge) ? images.notificationBadge : srcDeactive;
    return (
      <View center style={{ transform: [{ rotate: rotate ? '90deg' : '0deg' }] }}>

        <Image style={{
          width: DeviceInfo.isTablet() ? 40 : 28,
          height: DeviceInfo.isTablet() ? 40 : 28,
          marginBottom: 5,
          marginTop: 2
        }}
          source={focused ? srcActive : iconDeactive} />
        <Text size10 style={{ color: focused ? '#0B3547' : '#57585B', textAlign: 'center' }}>{label}</Text>
      </View>
    );
  }
}