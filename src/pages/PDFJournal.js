import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import Pdf from 'react-native-pdf';

import {baseUrl} from '../../App';
import PDFView from 'react-native-view-pdf';




export default class PDFJournal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: ""
        };
    }

   
    render() {
     var base64 = this.props.navigation.getParam('journal', '');

    
        return (
          <View style={{ flex: 1 }}>
            {/* Some Controls to change PDF resource */}
            <PDFView
              fadeInDuration={250.0}
              style={{ flex: 1 }}
              resource={base64}
              resourceType={'base64'}
              onError={() => console.log('Impossibile leggere il PDF', error)}
            />
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});
 