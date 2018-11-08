import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ToastAndroid, Image, RefreshControl, WebView, TouchableOpacity } from 'react-native';
import SearchBar from 'react-native-searchbar';
import CardView from 'react-native-cardview';
import GridView from 'react-native-super-grid';
import DeviceInfo from 'react-native-device-info';
import fetchTimeout from 'fetch-timeout';


import { baseUrl, loginurl, readjournalurl } from '../../App';






export default class Home extends Component {


    constructor(props) {
        super(props);

        this._handleResults = this._handleResults.bind(this);
        this._handleChangeText = this._handleChangeText.bind(this);

        this.state = {
            journals: [],
            filteredJournals: [],

            email: '',
            password: '',
            fetchTimeoutTime: 10000,

            channels: {

                sport: '',
                politica: '',
                cronaca: '',
                spettacolo: '',
                curiosita: ''
            }
        };
    }


    showSerial() {

        if (this.state.email != '') {
            ToastAndroid.showWithGravity(
                // DeviceInfo.getSerialNumber(),
                DeviceInfo.getUniqueID(),
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }
    }

    showTimeoutError(err) {
        ToastAndroid.showWithGravity(
            err,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );

    }

    _handleResults(results) {


        if (results.length > 0) {

            this.setState({ filteredJournals: results });


        } else {

            this.setState({ filteredJournals: this.state.journals });

        }




    }

    _handleChangeText(input) {

        /*   if (input.length <= 0) {
               this.setState({ filteredJournals: this.state.journals });
           }
           this.setState({ filteredJournals: this.state.journals });*/
    }


    readJournal(journal) {
        this.props.navigation.navigate('Journal', { journal: journal });
    }

    componentDidMount() {


        /* this.setState({
             channels:{
                 sport: this.props.navigation.getParam('sport', ''),
                 politica: this.props.navigation.getParam('politica', ''),
                 cronaca: this.props.navigation.getParam('cronaca', ''),
                 spettacolo: this.props.navigation.getParam('spettacolo', ''),
                 curiosita: this.props.navigation.getParam('curiosita', '')
 
             }
         });  */

        this.state.channels.sport = this.props.navigation.getParam('sport', ''),
            this.state.channels.politica = this.props.navigation.getParam('politica', ''),
            this.state.channels.cronaca = this.props.navigation.getParam('cronaca', ''),
            this.state.channels.spettacolo = this.props.navigation.getParam('spettacolo', ''),
            this.state.channels.curiosita = this.props.navigation.getParam('curiosita', '')

        this.state.email = this.props.navigation.getParam('email', '')
        // this.state.password = this.props.navigation.getParam('password', '')



        this.refreshami();


    }

    refreshami() {

        try {

            /* this.login();
             this.refresh();*/
            if (this.state.email != "") {
                this.login();
                this.refresh();
            } else {
                this.refreshbyid();

            }


        } catch (e) {
            console.log(e)
        }

    }



    //  renderItem = ({ item, index }) => {
    renderItem = (item) => {

        return (


            <View >




                <TouchableOpacity
                    onPress={() => this.readJournal(item.url)}
                >

                    <CardView
                        cardElevation={2}
                        cardMaxElevation={2}
                        cornerRadius={5}
                        height={130}
                        marginTop={2}
                        cornerOverlap={true}
                    >


                        <Image
                            style={styles.image}
                            source={{ uri: baseUrl + "images/" + item.image }}
                        />


                        {/* 
                    <Text>
                        Nome:
                                <Text style={{ fontWeight: 'bold' }}>
                            {" " + item.name}
                        </Text>
                    </Text>




                    <Text>
                        Descrizione:
                <Text style={{ fontWeight: 'bold' }}>
                            {" " + item.description}
                        </Text>
                    </Text>




            

                    <Text>
                        Link:
                <Text style={{ fontWeight: 'bold' }}>
                            {" " + item.url}
                        </Text>
                    </Text>

*/}

                    </CardView>
                </TouchableOpacity>


            </View>






        );
    }

    render() {

        const items = [
            1337,
            'janeway',
            {
                lots: 'of',
                different: {
                    types: 0,
                    data: false,
                    that: {
                        can: {
                            be: {
                                quite: {
                                    complex: {
                                        hidden: ['gold!'],
                                    },
                                },
                            },
                        },
                    },
                },
            },
            [4, 2, 'tree'],
        ];

        return (


            <View style={styles.generalbar}>
                <View style={styles.topbar}>

                    <View style={styles.searchbar}>
                        <SearchBar
                            ref={(ref) => this.searchBar = ref}
                            data={this.state.filteredJournals}
                            //data={words}
                            hideBack
                            placeholder={'cerca...'}
                            heightAdjust={-35}
                            handleResults={this._handleResults}
                            // handleChangeText={(input) => this._handleChangeText(input)}
                            showOnLoad
                        />
                    </View>




                    <View style={styles.menubar}>



                        <Button
                            onPress={() => console.log("pressed")}
                            title=" GIORNALI WEB "
                            color="#252523"
                        />

                        <Button
                            onPress={() => console.log("pressed")}
                            title=" GIORNALI SFOGLIABILI "
                            color="#252523"
                        />


                        <Button
                            onPress={() => this.showSerial()}
                            title={this.state.email}
                            color="#252523"
                        />



                        <Button
                            onPress={() => console.log("pressed")}
                            title=" GIOCHI "
                            color="#252523"
                        />

                    </View>


                </View>


                <View style={styles.bannerbar}>

                    <Text> BANNER</Text>


                </View>



                <View style={styles.cardbar}>


                    <GridView
                        itemDimension={200}
                        items={this.state.filteredJournals}
                        renderItem={item => (this.renderItem(item))}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onEndReachedThreshold={0.5}
                                onRefresh={() => this.refreshami()}
                            />
                        }
                    />

                </View>

            </View >


        );
    }


    refreshbyid() {

        // return fetch(baseUrl + readjournalurl, {
        return fetchTimeout(baseUrl + readjournalurl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
             body: "deviceid=" + DeviceInfo.getUniqueID() // <-- Post parameters
           // body: "deviceid=" + "aaa",


        }, this.state.fetchTimeoutTime, "Il server non risponde")

            .then((response) => {

                console.log(response.status)
                if (response.status != 200) {

                    response.json().then(

                        (responseJson) => {

                            ToastAndroid.showWithGravity(responseJson.resp, ToastAndroid.LONG, ToastAndroid.CENTER);
                        });

                    this.setState({ filteredJournals: [] });


                } else {

                    response.json()
                        .then((responseJson) => {

                            if (responseJson.journals.length <= 0) {
                                ToastAndroid.showWithGravity("Nessun giornale disponibile", ToastAndroid.LONG, ToastAndroid.CENTER
                                );

                                this.setState({ filteredJournals: [] });

                            } else {

                                var list = responseJson.journals;

                                /*for(let i = 0; i < list.length; i++){
                  
                                  if(list[i].image == "null"){
                                    list[i].image = "noimg.jpg";
                                  }
                  
                                }*/

                                this.setState({ journals: list });


                                var filtJourn = [];

                                for (var i = 0; i < this.state.journals.length; i++) {

                                    filtJourn.push({
                                        name: this.state.journals[i].name,
                                        image: this.state.journals[i].image,
                                        cronaca: this.state.journals[i].cronaca,
                                        curiosita: this.state.journals[i].curiosita,
                                        description: this.state.journals[i].description,
                                        politica: this.state.journals[i].politica,
                                        spettacolo: this.state.journals[i].spettacolo,
                                        sport: this.state.journals[i].sport,
                                        url: this.state.journals[i].url
                                    });

                                }
                                this.setState({ filteredJournals: filtJourn });

                            }
                        })
                }
            }).catch((error) => {
                //console.log(error);
                this.showTimeoutError(error)
            });
    }

    refresh() {

        return fetchTimeout(baseUrl + "api/home", {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "sport=" + this.state.channels.sport + "&" + "politica=" + this.state.channels.politica + "&" +
                "curiosita=" + this.state.channels.curiosita + "&" + "spettacolo=" + this.state.channels.spettacolo + "&" +
                "cronaca=" + this.state.channels.cronaca + "&" + "email=" + this.state.email // <-- Post parameters

        }, this.state.fetchTimeoutTime, "Il server non risponde")

            .then((response) => {

                if (response.status != 200) {

                    response.json().then(

                        (obj) => {

                            ToastAndroid.showWithGravity(
                                obj.resp,
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER
                            );

                        });

                    this.setState({ filteredJournals: [] });


                } else {

                    response.json()
                        .then((responseJson) => {
                            if (responseJson.journals.length <= 0) {

                                ToastAndroid.showWithGravity("Nessun giornale disponibile", ToastAndroid.LONG, ToastAndroid.CENTER);

                                this.setState({ filteredJournals: [] });

                            } else {

                                var list = responseJson.journals;

                                /*for(let i = 0; i < list.length; i++){
                  
                                  if(list[i].image == "null"){
                                    list[i].image = "noimg.jpg";
                                  }
                  
                                }*/

                                this.setState({ journals: list });

                                var filtJourn = [];
                                for (var i = 0; i < this.state.journals.length; i++) {
                                    filtJourn.push({
                                        name: this.state.journals[i].name,
                                        image: this.state.journals[i].image,
                                        cronaca: this.state.journals[i].cronaca,
                                        curiosita: this.state.journals[i].curiosita,
                                        description: this.state.journals[i].description,
                                        politica: this.state.journals[i].politica,
                                        spettacolo: this.state.journals[i].spettacolo,
                                        sport: this.state.journals[i].sport,
                                        url: this.state.journals[i].url
                                    });

                                }
                                this.setState({ filteredJournals: filtJourn });

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


            body: "email=" + this.state.email + "&" + "alreadylogged=ok"  // <-- Post parameters

        }, this.state.fetchTimeoutTime, "Il server non risponde")

            .then((response) => {



                /* response.text().then(
 
                     (obj) => {
                        
           
                         ToastAndroid.showWithGravity(
                             obj,
                             ToastAndroid.LONG,
                             ToastAndroid.CENTER
                         );
           
           console.log(obj)
           
                     });*/

                if (response.status != 200) {

                    response.text().then(

                        (obj) => {


                            ToastAndroid.showWithGravity(
                                obj,
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER
                            );



                        });
                    this.setState({ filteredJournals: [] });

                } else {

                    response.json()
                        .then((responseJson) => {

                            //  try {


                            this.setState({
                                channels: {
                                    sport: responseJson[0].sport,
                                    politica: responseJson[0].politica,
                                    cronaca: responseJson[0].cronaca,
                                    spettacolo: responseJson[0].spettacolo,
                                    curiosita: responseJson[0].curiosita

                                }
                            });
                            /*
                              this.state.sport= responseJson[0].sport,
                              this.state.politica= responseJson[0].politica,
                              this.state.cronaca= responseJson[0].cronaca,
                              this.state.spettacolo= responseJson[0].spettacolo,
                              this.state.curiosita=responseJson[0]. curiosita
*/
                            //   } catch (error) { }



                        })
                }
            }).catch((error) => {
                //console.log(error);
                this.showTimeoutError(error)
            });
    }




}




const styles = StyleSheet.create({


    generalbar: {

        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#11110f',
        justifyContent: 'space-between',

        // alignItems: 'center',


    },

    topbar: {
        flex: 0.2,
        flexDirection: 'row',
        // backgroundColor: 'green',
        backgroundColor: '#252523',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    menubar: {
        //flex: 0.2,

        flexDirection: 'row',
        backgroundColor: '#252523',
        //backgroundColor: '#f0f0f0',
        //  justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    searchbar: {
        // flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',

    }, bannerbar: {
        //flex: 0.1,
        flexDirection: 'row',
        backgroundColor: 'blue',
        justifyContent: 'flex-start',
        marginBottom: 10,

    }, cardbar: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#11110f',
        justifyContent: 'flex-start',

    }, card: {

        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        margin: 10
    },
    image: {
        width: 250,
        height: 130
    },
    text: {
        color: 'red'
    }

});