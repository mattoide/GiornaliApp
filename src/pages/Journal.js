import React, {Component} from 'react';
import {View, Button, WebView, BackHandler, Platform} from 'react-native';


export default class Journal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            journal: ''
        };
    }

    webView = {
        canGoBack: false,
        ref: null,
    }

    componentDidMount() {
        let j = this.props.navigation.getParam('journal', '');
        let jreplaced;

        if (j.includes("watch?v=")) {
            jreplaced = j.replace("watch?v=", "embed/");
            this.setState({journal: jreplaced})

        } else {
            this.setState({journal: j})

        }
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


    _onNavigationStateChange(navState) {  
        console.log("NAVSTATEURLL: "+ navState.url)

        console.log("URL: "+ this.state.journal)
        if (!navState.url.includes( 'about:blank')) {
            if (!navState.url.includes(this.state.journal)) {
                console.log("URL: " + navState.url + " Quindi NON vai");
                this.webView.ref.stopLoading(); 
 
            } else {
                console.log("URL: " + navState.url + " Quindi vaiiiiiiii");

            }
        }

        /* if(!navState.url.includes(this.state.journal)){
             console.log("non vai");
             this.webView.ref.stopLoading();
         } else {
             console.log(" vaiiiiii");
         }*/
        this.webView.canGoBack = navState.canGoBack;
    }


    render() {

        return (


            <WebView

                source={{uri: this.state.journal}}
                javaScriptEnabled={true}
                ref={(webView) => {
                    this.webView.ref = webView;
                }}
                //onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack;  }}
                //  onNavigationStateChange={this.navigationStateChangedHandler}

                onNavigationStateChange={this._onNavigationStateChange.bind(this)}


                style={{marginTop: 20, flex: 1}}

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

