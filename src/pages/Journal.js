import React, { Component } from 'react';
import { View, Button, WebView, BackHandler, Platform } from 'react-native';



export default class Journal extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    webView = {
        canGoBack: false,
        ref: null,
    }

    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
            return true;
        }
        return false;
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }



    render() {

        journal = this.props.navigation.getParam('journal', '')

        return (


            <WebView


            source={{ uri: journal }}
            ref={(webView) => { this.webView.ref = webView; }}
            onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
            style={{ marginTop: 20, flex: 1 }}

        />
        /*   <View style={{ flex: 1 }}>

             <Button
                            onPress={() => {}}
                            title=" GIORNALI WEB "
                            color="#252523"
                        />
                <WebView


                    source={{ uri: journal }}
                    ref={(webView) => { this.webView.ref = webView; }}
                    onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
                    style={{ marginTop: 20, flex: 1 }}

                />
            </View> */
        );
    }
}

