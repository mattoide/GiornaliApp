import React, { Component } from 'react';
import { StyleSheet, WebView } from 'react-native';



export default class Journal extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {

        journal = this.props.navigation.getParam('journal', '')

        return (
            <WebView
                source={{ uri: journal }}
                style={{ marginTop: 20 }}
            />
        );
    }
}

