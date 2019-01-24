import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import Pdf from 'react-native-pdf';

import {baseUrl} from '../../App';




export default class PDFJournal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: ""
        };
    }

   


    render() {

        var a = this.props.navigation.getParam('journal', '');
        //const source = {uri:'http://192.168.137.1:8000/files/dio@mattino.pdf', cache:true};
       // const source = {uri: baseUrl + "files/" + this.props.navigation.getParam('journal', ''), cache:true};
    //    const source = {uri:baseUrl + "files/" + a, cache:false}; 
       
    const source= 'data:application/pdf;base64,'+a;

       //const source = {uri:baseUrl + "files/" + a, cache:false}; 
       console.log(source)
        

        return (
                <View style={styles.container}>
                    <Pdf
                        source={source}
                        onLoadComplete={(numberOfPages,filePath)=>{
                            //console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page,numberOfPages)=>{
                          //  console.log(`current page: ${page}`);
                        }}
                        onError={(error)=>{
                            console.log(error);
                        }}
                        style={styles.pdf}/>
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
 