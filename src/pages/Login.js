import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet, Text, ToastAndroid, Image, TouchableOpacity, Modal } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import fetchTimeout from 'fetch-timeout'

import { baseUrl, loginurl, homeurl } from '../../App';


export default class Login extends Component {


  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      modalVisible: false,
      fetchTimeoutTime: 10000,

    };
  }
  showSerial() {
console.log(DeviceInfo.getUniqueID())
    ToastAndroid.showWithGravity(
     // DeviceInfo.getSerialNumber(),
     DeviceInfo.getUniqueID(),
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );

  }

  showTimeoutError(err) {
    ToastAndroid.showWithGravity(
      err,
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );

  }



  render() {  


    return (
      <View>
        
        <View style={styles.read}>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Image
              source={require('../img/newspaper.png')}
            />

            <Text style={{ alignSelf: "center" }}>
              Leggi giornali!
        </Text>

          </TouchableOpacity>

<View style={styles.login}>
            <TouchableOpacity 
            style={{ alignSelf: "center", marginTop:50 }}
            // onPress={() => this.showSerial()}
            onPress={() => this.setState({ modalVisible: true })}

          >
            <Image
              source={require('../img/login.png')}
            />

           
                      </TouchableOpacity>
                      </View>
        </View>

        <View style={styles.info}>

          <TouchableOpacity
             onPress={() => this.showSerial()}
            //onPress={() => this.setState({ modalVisible: true })}

          >
            <Image
              source={require('../img/info.png')}
            />

          </TouchableOpacity>
        </View>

        <Modal visible={this.state.modalVisible}
          onRequestClose={() => {}}
          animationType={"fade"}
          transparent={false}
        >


          <View style={styles.read}>

            <Image
              source={require('../img/newspaper.png')}
            />

            <TextInput
              placeholder="Username"
              onChangeText={(input) => this.state.email = input}
            />

            <TextInput
              placeholder="Password"
              onChangeText={(input) => this.state.password = input}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.loginButtons}>

            <TouchableOpacity
              style={styles.space}
              onPress={() => this.setState({ modalVisible: false })}

            >
              <Image
                source={require('../img/annulla.png')}
              />

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.space}
              onPress={() => this.login()}

            >
              <Image
                source={require('../img/conferma.png')}
              />

            </TouchableOpacity>



          </View>
          {/*   <View style={styles.login}>
          <Button
            onPress={() => this.login()}
            title="Login"
            color="#252523"
          />  

                    </View>

          */}



        </Modal>


      </View>
    );
  }


  readJournals() {

    return fetchTimeout(baseUrl + homeurl, {

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

    }, this.state.fetchTimeoutTime, "Il server non risponde")

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

          this.setState({ modalVisible: false })

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
                  curiosita: responseJson[0].curiosita
                }
                );

              } catch (error) {
              }



            })
        }
      }).catch((error) => {
        //console.log(error);
        this.showTimeoutError(error)
      });
  }

  login() {

    return fetchTimeout(baseUrl + loginurl, {

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

    }, this.state.fetchTimeoutTime, "Il server non risponde")

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
          this.setState({ modalVisible: false })

          response.json()
            .then((responseJson) => {
                 this.setState({ modalVisible: false })

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
                  curiosita: responseJson[0].curiosita
                }
                );



              } catch (error) {
              }



            })
        }
      }).catch((error) => {
        //console.log(error);
        this.showTimeoutError(error)
      });
  }

}



const styles = StyleSheet.create({

  view: {

    marginTop: '10%',
    // width: '50%',
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
  },

  read: {
    alignSelf: 'center',
    marginTop: "10%",

  },
  loginButtons: {
    alignSelf: 'center',
    flexDirection: 'row',

  },
  space: {
    marginHorizontal: 30
  },
  touchable: {
    /*
    borderRadius:40,
//    backgroundColor: '#ee6e73',                                    
borderWidth:1,*/
  },
  login: {
    // marginBottom: Dimensions.get('window').width / 2,
    position: 'absolute',
    bottom: 190,
    right: 600,
  },
  res: {
    color: "green",
    textAlign: "center",
    marginTop: '2%',
    fontSize: 30

  }, image: {
    width: 10,
    height: 10
  }, 
  info: {
    position: 'absolute',
    bottom: 190, 
    right: 15,
  },
  
});