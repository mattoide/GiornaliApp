import React, { Component } from 'react';
import { NetInfo, TextInput, View, Button, StyleSheet, Text, ToastAndroid, Image, TouchableOpacity, Modal } from 'react-native';

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

  readJournals() {


    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.props.navigation.navigate('Home')
      } else {
        this.showNoInternetError();
      }
    });
  }

  login() {

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.loginapi()
      } else {
        this.showNoInternetError();
      }
    });

  }

  showNoInternetError() {

    ToastAndroid.showWithGravity(
      "Nessuna connessoine ad internet",
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
            onPress={() => this.readJournals()}
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
              style={{ alignSelf: "center", marginTop: 50 }}
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
          onRequestClose={() => { }}
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

  
  readJournalsapi() {



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
                  curiosita: responseJson[0].curiosita,
                  economia: responseJson[0].economia,
                  cultura: responseJson[0].cultura,
                  tecnologia: responseJson[0].tecnologia,
                  scienze: responseJson[0].scienze,
                  gossip: responseJson[0].gossip,
                  finanza: responseJson[0].finanza,
                  ambiente: responseJson[0].ambiente,
                  varie: responseJson[0].varie,
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





  loginapi() {

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
                  curiosita: responseJson[0].curiosita,
                  economia: responseJson[0].economia,
                  cultura: responseJson[0].cultura,
                  tecnologia: responseJson[0].tecnologia,
                  scienze: responseJson[0].scienze,
                  gossip: responseJson[0].gossip,
                  finanza: responseJson[0].finanza,
                  ambiente: responseJson[0].ambiente,
                  varie: responseJson[0].varie,
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
    marginTop: "5%",

    //TODO: togliere
    flexDirection: 'row'

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
    bottom: 250,
    right: 580,

    //TODO: togliere
    flexDirection: 'row',

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
    bottom: 250,
    right: 15,
  },

});