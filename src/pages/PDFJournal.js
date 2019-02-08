import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

import {baseUrl} from '../../App';
import PDFView from 'react-native-view-pdf';

import Pdf from 'react-native-pdf';


import * as Progress from 'react-native-progress';





export default class PDFJournal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: "",
            loading: true, 
            progress:0
        }; 
    }  
 
   
    render() { 
     var url = this.props.navigation.getParam('journal', '');

     const source = {uri:baseUrl+"files/"+url ,cache:true};


let caricamento; 
   
    //  if(this.state.loading==true){
    //     //  caricamento =  <Text style={{flex:1,alignSelf:'center', textAlignVertical:'center'}}>Attendi il caricamento del pdf...</Text>
    //      caricamento =  <Progress.Circle style={{flex:1,alignSelf:'center', top:100}} showsText={true} size={250} indeterminate={true} />

  
    //  }

    // caricamento =  <Progress.Circle style={{flex:1,alignSelf:'center', top:100}} showsText={true} progress={this.state.progress} size={250} indeterminate={false} />
     caricamento =  <View style={{flex:1,alignSelf:'center', alignItems:'center', top:100}}><Progress.Bar progress={this.state.progress} width={200} /><Text style={{alignSelf:'center', color:'blue'}}>Caricamento/Loading...</Text></View>

        return (
          <View style={{ flex: 1, backgroundColor:'white' }}>
            {/* Some Controls to change PDF resource */}

            <Pdf
           style={styles.pdf}
            source={source}
            fitPolicy={2} 
            enablePaging={true}
            horizontal={true}
            activityIndicator={caricamento}
            onLoadComplete={(numberOfPages,filePath)=>{
                 this.setState({loading:false})
                }}
                 onPageChanged={(page,numberOfPages)=>{
                     //  console.log(`current page: ${page}`);
                     }}
                      onError={(error)=>{
                          console.log(error);
                        }} 
                        onLoadProgress={(percentuale) =>{ 
                            this.setState({progress:percentuale})
                        }}
                        
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
 