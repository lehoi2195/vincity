import React, { Component } from 'react';
import {
    Image,
    Platform
} from 'react-native';
import { View, Text } from 'native-base';
import { connect } from 'react-redux';
export default class Tabbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, focused, tintColor, srcActive, srcDeactive, orientation, rotate, countUnRead = 0 , isBadge= false } = this.props
        return (
            <View center style={{ transform: [{ rotate: rotate ? '90deg' : '0deg' }],  paddingVertical: 20, }}>
                <Image 
                resizeMode="contain"
                style={{
                    width:  28 ,
                    height:  28 ,
                    marginBottom: 5,
                    marginTop: 2,
                }}
                    source={focused ? srcActive : srcDeactive} />
                <Text size10 style={{ color: focused ? 'white' : '#cacaca', textAlign: 'center' }}>{label}</Text>
                {!!countUnRead && countUnRead > 0 && !!isBadge ?
                    <View style={{
                        position: 'absolute',
                        top: 3 ,
                        right: 15 ,
                        zIndex: 9,
                        width: 12, height: 12, borderRadius: 6,
                        backgroundColor: countUnRead && countUnRead > 0 ? '#FF0000' : 'transparent',
                        justifyContent: 'center', alignItems: 'center'
                    }} />
                    : null
                }
            </View>
        );
    }
}