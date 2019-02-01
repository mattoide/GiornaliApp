import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import Pdf from 'react-native-pdf';

import {baseUrl} from '../../App';
import PDFView from 'react-native-view-pdf';




export default class PDFJournal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: "",
            loading: true
        };
    }

   
    render() {
     var url = this.props.navigation.getParam('journal', '');

let caricamento;

     if(loading==true){
         caricamento = <Text>Attendi il caricamento del pdf...</Text>
     }
    
        return (
          <View style={{ flex: 1 }}>
            {/* Some Controls to change PDF resource */}
            {caricamento}

            <PDFView
              fadeInDuration={250.0}
              style={{ flex: 1 }}
              resource={baseUrl+"files/"+url}
              resourceType={'url'}
              onError={(error) => console.log('Impossibile leggere il PDF', error)}
              onLoad={() => this.setState({loading:false})}
              
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
 