import React, {Component} from 'react';
import {
    NetInfo,
    TextInput,
    View,
    Button,
    StyleSheet,
    Text,
    ToastAndroid,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';

import fetchTimeout from 'fetch-timeout'


import {baseUrl, loginurl, homeurl, readwebjournalurl, getlogo, iddispositivo} from '../../App';
import RNLockTask from "react-native-lock-task";


export default class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            logo: '',
            modalVisible: false,
            fetchTimeoutTime: 10000,

        };
    }

    componentDidMount() {

        try {
            this.getLogoUtente();
            //     console.log("asasa")
        } catch (e) {
            console.log(e)
        }

    }

    showSerial() {
        //console.log(DeviceInfo.getUniqueID())
        ToastAndroid.showWithGravity(
            // DeviceInfo.getSerialNumber(),
            iddispositivo,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );

    }

    unlock(){
         if(this.state.password == "x1H599009867kk"){
       // if(this.state.password == "a"){

            RNLockTask.stopLockTask();

            RNLockTask.clearDeviceOwnerApp();
        }
        // if(this.state.password == "a"){
        //
        //     RNLockTask.stopLockTask();
        //
        //     RNLockTask.clearDeviceOwnerApp();
        // }

    }

    readJournals() {


        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {

                this.checkDevice();

            } else {
                this.showNoInternetError();
            }
        });
    }


    getLogoUtente() {

        // return fetch(baseUrl + readjournalurl, {
        return fetchTimeout(baseUrl + getlogo, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                // body: "deviceid=" +iddispositivo // <-- Post parameters
                body: "iddispositivo=" + "aaa",


            }, this.state.fetchTimeoutTime, "Il server non risponde")

            .then((response) => {
                switch (response.status) {
                    case 200:
                        response.json()
                            .then((responseJson) => {
                                this.setState({
                                    logo: responseJson.logo
                                });


                            });
                        break;

                    default:
                        break;
                }


            }).catch((error) => {
                //console.log(error);
                this.showTimeoutError(error)
                this.getLogoUtente()
            });
    }


    checkDevice() {
        return fetchTimeout(baseUrl + readwebjournalurl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                //body: "iddispositivo=" + DeviceInfo.getUniqueID() // <-- Post parameters
                body: "iddispositivo=" + "aaa",

            }, this.state.fetchTimeoutTime, "Il server non risponde")

            .then((response) => {


                switch (response.status) {
                    case 200:
                        this.props.navigation.navigate('Home')
                        break;

                    default:
                        response.json().then(
                            (responseJson) => {
                                ToastAndroid.showWithGravity(responseJson.messaggio, ToastAndroid.LONG, ToastAndroid.CENTER);
                            });
                        break;
                }

            }).catch((error) => {
                this.showTimeoutError(error)
                this.setState({
                    filteredJournals: []
                });
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

        let logo;
        let info;

        if (this.state.logo) {
            logo = <Image
                style={styles.logo}
                source={{uri: `data:image/png;base64,${this.state.logo}`}} 
                />
            info =
                <View style={styles.infowithlogo}>

                    <TouchableOpacity
                        //onPress={() => this.showSerial()}
                        onPress={() => this.setState({modalVisible: true})}

                    >
                        <Image
                            source={require('../img/info.png')}
                        />

                    </TouchableOpacity>
                </View>
        } else {
            info = 
                <View style={styles.info}>

                    <TouchableOpacity
                        //onPress={() => this.showSerial()}
                        onPress={() => this.setState({modalVisible: true})}

                    >
                        <Image
                            source={require('../img/info.png')}
                        />

                    </TouchableOpacity>
                </View>
        }
        return (
            <View style={{backgroundColor: "white", flex: 1}}>

            <View>

                <View style={styles.read}>
                    {logo}

                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => this.readJournals()}
                    >
                        <Image
                            source={require('../img/newspaper.png')}
                        />
   <TouchableOpacity
                        style={{backgroundColor: 'red', borderRadius: 10}}
                        onPress={() => this.readJournals()}
                    >
                    <Text style={{alignSelf: "center"}}>
                        Clicca qui per leggere i giornali!
                        </Text>
                        <Text style={{alignSelf: "center"}}>
                        Click here to read the newspapers!
                        </Text>
                    </TouchableOpacity>

 
                    </TouchableOpacity>


                </View>

                {info}

                <Modal visible={this.state.modalVisible}
                       onRequestClose={() => {
                       }}
                       animationType={"fade"}
                       transparent={false}
                >
                    <View style={styles.read}>
                    <TextInput
                        placeholder="Password"
                        onChangeText={(input) => this.state.password = input}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.space}
                        onPress={() => this.unlock()}

                    >
                        <Image
                            source={require('../img/conferma.png')}
                        />
                        <Text>Sblocca</Text>

                    </TouchableOpacity>



                        <Text style={{marginBottom: 10, fontSize: 40}}>Codice univoco dispositivo:</Text>
                        <Text style={{marginBottom: 30, fontSize: 70, color: 'red'}}>{iddispositivo}</Text>

                        <TouchableOpacity
                            //onPress={() => this.showSerial()}
                            onPress={() => this.setState({modalVisible: false})}

                        >
                            <Image
                                source={require('../img/annulla.png')}
                            />

                        </TouchableOpacity>


                    </View>

                </Modal>

                {/*<Modal visible={this.state.modalVisible}*/}
                {/*onRequestClose={() => { }}*/}
                {/*animationType={"fade"}*/}
                {/*transparent={false}*/}
                {/*>*/}


                {/*<View style={styles.read}>*/}

                {/*<Image*/}
                {/*source={require('../img/newspaper.png')}*/}
                {/*/>*/}

                {/*<TextInput*/}
                {/*placeholder="Username"*/}
                {/*onChangeText={(input) => this.state.email = input}*/}
                {/*/>*/}

                {/*<TextInput*/}
                {/*placeholder="Password"*/}
                {/*onChangeText={(input) => this.state.password = input}*/}
                {/*secureTextEntry={true}*/}
                {/*/>*/}
                {/*</View>*/}

                {/*<View style={styles.loginButtons}>*/}

                {/*<TouchableOpacity*/}
                {/*style={styles.space}*/}
                {/*onPress={() => this.setState({ modalVisible: false })}*/}

                {/*>*/}
                {/*<Image*/}
                {/*source={require('../img/annulla.png')}*/}
                {/*/>*/}

                {/*</TouchableOpacity>*/}


                {/*<TouchableOpacity*/}
                {/*style={styles.space}*/}
                {/*onPress={() => this.login()}*/}

                {/*>*/}
                {/*<Image*/}
                {/*source={require('../img/conferma.png')}*/}
                {/*/>*/}

                {/*</TouchableOpacity>*/}


                {/*</View>*/}
                {/*/!*   <View style={styles.login}>*/}
                {/*<Button*/}
                {/*onPress={() => this.login()}*/}
                {/*title="Login"*/}
                {/*color="#252523"*/}
                {/*/>  */}

                {/*</View>*/}

                {/**!/*/}


                {/*</Modal>*/}

            </View>
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
                            this.setState({resp: obj});
                            this.setState({user: ""});

                            ToastAndroid.showWithGravity(
                                this.state.resp,
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER
                            );


                        });

                } else {

                    this.setState({modalVisible: false})

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
                            this.setState({resp: obj});
                            this.setState({user: ""});

                            ToastAndroid.showWithGravity(
                                this.state.resp,
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER
                            );


                        });

                } else {
                    this.setState({modalVisible: false})

                    response.json()
                        .then((responseJson) => {
                            this.setState({modalVisible: false})

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
        marginTop: "3%", 
        alignItems: 'center',

        //TODO: togliere
        flexDirection: 'column'

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
        bottom: 400,
        right: 970,

    },
    res: {
        color: "green",
        textAlign: "center",
        marginTop: '2%',
        fontSize: 30

    }, image: {
        width: 150,
        height: 150
    },
    logo:{
        width: 1024,
        height: 200
    },
    info: {
        position: 'absolute',
        bottom: 250,
        right: 15,
    }, infowithlogo: {
        position: 'absolute',
        bottom: 468,
        right: 15,
    },

});