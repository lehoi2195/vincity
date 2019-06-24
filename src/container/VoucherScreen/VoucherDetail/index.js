import React, { Component } from "react";
import {
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    WebView
} from "react-native";
import { Text, View, Container } from "native-base";
import { NavigationEvents } from "react-navigation";
import Header from "@components/Header";
import variables from "@theme/variables";
import images from "@src/assets/images";
import AppStyles from "@styles";
import { getIdYoutube } from "@src/utils";
import Voucher from "../Voucher";
export default class VoucherDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onBack = () => {
        this.props.onBack();
    };
    render() {
        const { voucher, index } = this.props;

        if (!voucher.content) {
            return (
                <View style={[styles.wrapper, AppStyles.paddingContent]}>
                    <Header theme="dark" title={""} showBack onBack={this.onBack} />
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
        //xu ly render html
        return (
            <View style={styles.wrapper}>
                <View style={AppStyles.paddingContent}>
                    <Header
                        title={voucher.title}
                        showBack
                        onBack={this.onBack}
                    />
                </View>

                <WebView
                    mixedContentMode='always'
                    scalesPageToFit
                    mediaPlaybackRequiresUserAction
                    allowUniversalAccessFromFileURLs
                    style={{ flex: 1, marginBottom: 150 }}
                    javaScriptEnabled={true}
                    html={voucher.content}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});
