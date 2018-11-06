import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet, Text, ToastAndroid, AsyncStorage, Dimensions } from 'react-native';

import DeviceInfo from 'react-native-device-info';

import { baseUrl, loginurl, readjournalurl, homeurl } from '../../App';


export default class Login extends Component {


  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: ''
    };
  }
  showSerial(){

    ToastAndroid.showWithGravity(
        DeviceInfo.getSerialNumber(),
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    );
    
}



  render() {

    // this.state.message = this.props.navigation.getParam('message', '')

    return (


      <View style={styles.view}>

        <TextInput
          placeholder="Username"
          onChangeText={(input) => this.state.email = input}
        />

        <TextInput
          placeholder="Password"
          onChangeText={(input) => this.state.password = input}
          secureTextEntry={true}
        />

        <View style={styles.login}>
          <Button
            onPress={() => this.login()}
            title="Login"
            color="#252523"
          />

          <Button
            onPress={() =>                 this.props.navigation.navigate('Home')}
            title="Leggi giornali"
            color="#252523"   
          />
           <Button
            onPress={() =>                 this.showSerial()}
            title="MOSTRA NUMERO SERIALE"
            color="red"   
          />
        </View>





        <View >
          <Text style={styles.res}>
            {this.state.message}
          </Text>
        </View>

      </View>
    );
  }
  

  readJournals() {

    return fetch(baseUrl + homeurl, { 

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      /*  body: JSON.stringify({
  
          username: this.state.nickname,
          password: this.state.password
  
        }),*/
      // body: "email=" + this.state.email + "&" + "password=" + this.state.password // <-- Post parameters

      body: "deviceid=" + DeviceInfo.getSerialNumber() // <-- Post parameters

    })

      .then((response) => {


      /*  response.text().then(

          (obj) => {
     
            console.log(obj)



          });*/

        if (response.status != 200) {

          response.text().then(

            (obj) => {
              this.setState({ resp: obj });
              this.setState({ user: "" });

              ToastAndroid.showWithGravity(
                this.state.resp,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );




            });

        } else {


          response.json()
            .then((responseJson) => {

              //console.log(responseJson[0].email)
              //  this.setState({ user: responseJson });
              // this.setState({ resp: "" });

              //console.log(this.state.user)

              try {

                console.log(responseJson)
                /* AsyncStorage.setItem('password', this.state.password);
                 AsyncStorage.setItem('email', this.state.user.email); */

               /* console.log(responseJson[0].sport)
                console.log(responseJson[0].politica)

                console.log(responseJson[0].cronaca)
                console.log(responseJson[0].spettacolo)
                console.log(responseJson[0].curiosita)*/


                this.props.navigation.navigate('Home', {
                 // password: responseJson[0].password,
                  email: responseJson[0].email,
                  sport: responseJson[0].sport,
                  politica: responseJson[0].politica,
                  cronaca: responseJson[0].cronaca,
                  spettacolo: responseJson[0].spettacolo,
                  curiosita:responseJson[0]. curiosita
                }
                );

              } catch (error) {
              }



            })
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  login() {

    return fetch(baseUrl + loginurl, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      /*  body: JSON.stringify({
  
          username: this.state.nickname,
          password: this.state.password
  
        }),*/
       body: "email=" + this.state.email + "&" + "password=" + this.state.password // <-- Post parameters

      //body: "email=" + "dio@cane.it" + "&" + "password=" + "asd" // <-- Post parameters

    })

      .then((response) => {


      /*  response.text().then(

          (obj) => {
     
            console.log(obj)



          });*/

        if (response.status != 200) {

          response.text().then(

            (obj) => {
              this.setState({ resp: obj });
              this.setState({ user: "" });

              ToastAndroid.showWithGravity(
                this.state.resp,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );




            });

        } else {

          response.json()
            .then((responseJson) => {

              //console.log(responseJson[0].email)
              //  this.setState({ user: responseJson });
              // this.setState({ resp: "" });

              //console.log(this.state.user)

              try {
                /* AsyncStorage.setItem('password', this.state.password);
                 AsyncStorage.setItem('email', this.state.user.email); */

               /* console.log(responseJson[0].sport)
                console.log(responseJson[0].politica)

                console.log(responseJson[0].cronaca)
                console.log(responseJson[0].spettacolo)
                console.log(responseJson[0].curiosita)*/


                this.props.navigation.navigate('Home', {
                 // password: responseJson[0].password,
                  email: responseJson[0].email,
                  sport: responseJson[0].sport,
                  politica: responseJson[0].politica,
                  cronaca: responseJson[0].cronaca,
                  spettacolo: responseJson[0].spettacolo,
                  curiosita:responseJson[0]. curiosita
                }
                );



              } catch (error) {
              }



            })
        }
      }).catch((error) => {
        console.error(error);
      });
  }

}



const styles = StyleSheet.create({

  view: {

    marginTop: '20%',
    width: '50%',
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
  },
  login: {
    // marginBottom: Dimensions.get('window').width / 2,
  },
  res: {
    color: "green",
    textAlign: "center",
    marginTop: '2%',
    fontSize: 30

  }
});