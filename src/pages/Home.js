import React, {Component} from 'react';
import {
    NetInfo,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    Image,
    RefreshControl,
    WebView,
    TouchableOpacity,
    Keyboard,
    Dimensions
} from 'react-native';
import SearchBar from 'react-native-searchbar';
import CardView from 'react-native-cardview';
import GridView from 'react-native-super-grid';
import DeviceInfo from 'react-native-device-info';
import fetchTimeout from 'fetch-timeout';
import * as Progress from 'react-native-progress';


import {
    baseUrl,
    loginurl,
    readwebjournalurl,
    readpdfjournalurl,
    homeurlweb,
    homeurlpdf,
    readpersonalurl,
    iddispositivo
} from '../../App';


export default class Home extends Component {


    constructor(props) {
        super(props);

        this._handleResults = this._handleResults.bind(this);
        this._handleChangeText = this._handleChangeText.bind(this);

        this.state = {
            journals: [],
            filteredJournals: [],
            cachedWebJournal: [],
            cachedPdfJournal: [],
            cachedPersJournal: [],


            cacheWebValidity:0,
            cachePdfValidity:0,
            cachePersValidity:0,
now:0,

            // email: '',
            // password: '',
            nickname:'',
            fetchTimeoutTime: 60000,
            journaltype: 0,
            banner: '',
            loading: true, 


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
                iddispositivo,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    showTimeoutError(err) {
        ToastAndroid.showWithGravity(
            err,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

    }

    _handleResults(results) {

        if (results.length > 0)
            this.setState({filteredJournals: results});
        else
            this.setState({filteredJournals: this.state.journals});
    }

    _handleChangeText(input) {

        /*   if (input.length <= 0) {
               this.setState({ filteredJournals: this.state.journals });
           }
           this.setState({ filteredJournals: this.state.journals });*/
    }


    readJournal(journal) {
        this.props.navigation.navigate('Journal', {journal: journal});
    }

    readPDFJournal(journal) {
        this.props.navigation.navigate('PDFJournal', {journal: journal});
    }

    readPersonal(file, url) {

        if (file != null && file != '')
            this.props.navigation.navigate('PDFJournal', {journal: file});
        else if (url != null && url != '')
            this.props.navigation.navigate('Journal', {journal: url});
    }

    showNoInternetError() {

        ToastAndroid.showWithGravity(
            "Nessuna connessoine ad internet",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

    }

    componentDidMount() {

        this.state.email = this.props.navigation.getParam('email', '')

        this.refreshami();

    }

    getweb() {

        this.setState({journaltype: 0});
        this.refreshami()
    }

    getpdf() {
        this.setState({journaltype: 1});
        this.refreshami()
    }

    getpersonal() {
        this.setState({journaltype: 2});
        this.refreshami()
    }

    forceRefresh(){
        var ora = new Date().getHours();

        this.setState({cacheWebValidity:ora});
        this.setState({cachePdfValidity:ora});
        this.setState({cachePersValidity:ora});
this.refreshami();


    }

    refreshami() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                if (this.state.journaltype == 0) {
                    this.refreshamiweb();
                } else if (this.state.journaltype == 1) {
                    this.refreshamipdf();
                } else if (this.state.journaltype == 2) {
                    this.refreshamipersonal();

                }
            } else {
                this.showNoInternetError();
            }
        });


    }

    refreshamiweb() {

        try {


        if(this.state.cachedWebJournal<=0){
            this.setState({filteredJournals: this.state.cachedWebJournal})

            this.setState({loading:true});
            this.refreshweb();

        } else {
            this.setState({filteredJournals: this.state.cachedWebJournal})
            this.refreshweb();
        } 
    
            /*
            //this.setState({filteredJournals:[]});

            this.setState({loading:true});
            // if (this.state.email != "") {
               // this.login();

var ora = new Date().getHours();
               this.setState({now: ora}) 

               if(this.state.now - this.state.cacheWebValidity>3){
                this.refreshweb();
                console.log("chiamata")

               } else {
                console.log("cache")
                this.setState({loading:false});

                   this.setState({filteredJournals: this.state.cachedWebJournal})

               }
            // } else {
            //     this.refreshbyidweb();

            // }
*/
        } catch (e) {
            console.log(e)
            this.setState({loading:false});

        }
    }

    refreshamipdf() {

        try {



                if(this.state.cachedPdfJournal<=0){
                    this.setState({filteredJournals: this.state.cachedPdfJournal})

                    this.setState({loading:true});
                    this.refreshpdf();
        
                } else {
                    this.setState({filteredJournals: this.state.cachedPdfJournal})
                    this.refreshpdf();
                }
            /*
            this.setState({filteredJournals:[]});

            this.setState({loading:true});

            

            var ora = new Date().getHours();
            this.setState({now: ora}) 

            if(this.state.now - this.state.cachePdfValidity>3){
                this.refreshpdf();
             console.log("chiamata")

            } else {
             console.log("cache")
             this.setState({loading:false});

                this.setState({filteredJournals: this.state.cachedPdfJournal})

            }
*/

            /* this.login();
             this.refresh();*/
            // if (this.state.email != "") {
            //     this.login();
            //     this.refreshpdf();
            // } else {
            //     this.refreshbyidpdf();

            // }


        } catch (e) {
            console.log(e)
            this.setState({loading:false});

        }

    }

    refreshamipersonal() {

        try {

            if(this.state.cachedPersJournal<=0){
                this.setState({filteredJournals: this.state.cachedPersJournal})

                this.setState({loading:true});
                this.refreshbyidpersonal();
    
            } else {
                this.setState({filteredJournals: this.state.cachedPersJournal})
                this.refreshbyidpersonal();
            }

            /*
             if (this.state.email != "") {
                 this.login();
                 this.refreshpdf();
             } else {
                 this.refreshbyidpdf();

             }*/
            /* this.setState({filteredJournals:[]});

             this.setState({loading:true});

var ora = new Date().getHours();
               this.setState({now: ora}) 

             if(this.state.now - this.state.cachePersValidity>3){
                this.refreshbyidpersonal();
                console.log("chiamata")
  
             } else {
              console.log("cache")
              this.setState({loading:false});
 
                 this.setState({filteredJournals: this.state.cachedPersJournal})
 
             }
*/
        } catch (e) {
            console.log(e)
            this.setState({loading:false});

        }

    }


    renderItem = (item) => {

        let journ;

        if (this.state.journaltype == 0) {
            journ = <TouchableOpacity
                onPress={() => this.readJournal(item.url)}
            >
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    height={110}
                    width={300} 
                    marginBottom={20}
                    marginLeft={10}
                    cornerOverlap={true}
                >

                    {/* <Image
                        style={styles.image}
                        source={{uri: baseUrl + "files/" + item.image}}
                    /> */}

                    <Image 
                        style={styles.image}
                        source={{uri: `data:image/png;base64,${item.immagine}`}} 
                        />


                </CardView>
            </TouchableOpacity>

        } else if (this.state.journaltype == 1) {

            journ = <TouchableOpacity
                onPress={() => this.readPDFJournal(item.file)}
            >

<CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    height={110}
                    width={300} 
                    marginBottom={20}
                    marginLeft={10}
                    cornerOverlap={true}
                >

                    {/* <Image
                        style={styles.image}
                        source={{uri: baseUrl + "files/" + item.image}}
                    /> */}

                        <Image 
                        style={styles.image}
                        source={{uri: `data:image/png;base64,${item.immagine}`}} 
                        />

                </CardView>
            </TouchableOpacity>
        } else {


            journ = <TouchableOpacity
                onPress={() => this.readPersonal(item.file, item.url)}
            >

<CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    height={110}
                    width={300} 
                    marginBottom={20}
                    marginLeft={10}
                    cornerOverlap={true}
                >

                    {/* <Image
                        style={styles.image}
                        source={{uri: baseUrl + "files/" + item.image}}
                    /> */}

                    <Image 
                        style={styles.image}
                        source={{uri: `data:image/png;base64,${item.immagine}`}} 
                        />
                </CardView>
            </TouchableOpacity>

        }

        return ( 

            <View>
                {journ}
            </View>

        );
    }

    render() {
        let banner;

        if (this.state.banner != '') {
            banner = <Image
                style={styles.imagebanner}
                source={{uri: `data:image/png;base64,${this.state.banner}`}}
            />
        }

        let nickname = <Button
        onPress={() => this.getpersonal()}
        title={this.state.nickname}
        color="#252523"
    />
    // let nickname ;
    //     if((this.state.nickname != "") && (this.state.nickname != null)){
    //         nickname = <Button
    //             onPress={() => this.getpersonal()}
    //             title={this.state.nickname}
    //             color="#252523"
    //         />
    //     }


    
let caricamento; 
   
 if(this.state.loading==true){
    //  caricamento =  <Text style={{flex:1,alignSelf:'center', textAlignVertical:'center'}}>Attendi il caricamento del pdf...</Text>
     caricamento =  <View style={{flex:1,alignSelf:'center', alignItems:'center', top:100}}><Progress.Circle color={'white'} size={100} borderWidth={5} thickness={10} indeterminate={true} /><Text style={{alignSelf:'center', color:'white'}}>Caricamento/Loading...</Text></View>
// caricamento =  <Progress.Circle style={{flex:1,alignSelf:'center', top:100}} showsText={true} progress={this.state.progress} size={250} indeterminate={false} />
//caricamento =  <Progress.Bar progress={this.state.progress} width={200} />

 }




        return (

            <View style={styles.generalbar}>

                <View style={styles.topbar}>

                    <View style={styles.searchbar}>
                        <SearchBar
                            ref={(ref) => this.searchBar = ref}
                            data={this.state.filteredJournals}
                            hideBack
                            placeholder={'cerca...'}
                            heightAdjust={-35}
                            handleResults={this._handleResults}
                            //showOnLoad
                        />
                    </View>


                    <View style={styles.menubar}>


                        <Button
                            onPress={() => this.getweb()}
                            title=" GIORNALI WEB "
                            color="#252523"
                        />

                        <Button
                            onPress={() => this.getpdf()}
                            title=" GIORNALI SFOGLIABILI "
                            color="#252523"
                        />




                        {/*<Button*/}
                            {/*onPress={() => this.getpersonal()}*/}
                            {/*title=" PERSONALE "*/}
                            {/*color="#252523"*/}
                        {/*/>*/}


                        {/*<Button*/}
                            {/*onPress={() => console.log("pressed")}*/}
                            {/*title=" GIOCHI "*/}
                            {/*color="#252523"*/}
                        {/*/>*/}


                        {nickname}

                    </View>

                </View>


                <View style={styles.bannerbar}>

                    {/* <Text> BANNER</Text>*/}
                    {banner}

                </View>


                <View style={styles.cardbar}>

{caricamento}
                    <GridView
                        itemDimension={335}
                        spacing={1}  
                        horizontal={false}
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

            </View>

        );
    }


    refreshbyidweb() {

        this.setState({loading:true});

        // return fetch(baseUrl + readjournalurl, {
        return fetchTimeout(baseUrl + readwebjournalurl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "deviceid=" + iddispositivo // <-- Post parameters
            // body: "deviceid=" + "aaa",


        }, this.state.fetchTimeoutTime, "Il server non risponde")

            .then((response) => { 

                if (response.status != 200) {

                    response.json().then(
                        (responseJson) => {

                            ToastAndroid.showWithGravity(responseJson.resp, ToastAndroid.SHORT, ToastAndroid.CENTER);
                        });

                    this.setState({banner: ''});

                    this.setState({filteredJournals: []});


                } else {

                    response.json()
                        .then((responseJson) => {
                            this.setState({banner: responseJson[0].banner});
                            this.setState({nickname: responseJson[0].nickname});


                            if (responseJson.journals.length <= 0) {
                                ToastAndroid.showWithGravity("Nessun giornale disponibile", ToastAndroid.SHORT, ToastAndroid.CENTER
                                );

                                this.setState({filteredJournals: []});

                            } else {

                                var list = responseJson.journals;

                                /*for(let i = 0; i < list.length; i++){

                                  if(list[i].image == "null"){
                                    list[i].image = "noimg.jpg";
                                  }

                                }*/

                                this.setState({journals: list});


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
                                this.setState({filteredJournals: filtJourn});

                            }
                        })
                }
            }).catch((error) => {
                //console.log(error);
                this.showTimeoutError(error)
                this.setState({filteredJournals: []});

            });
    }

    refreshbyidpdf() {

        // return fetch(baseUrl + readjournalurl, {
        return fetchTimeout(baseUrl + readpdfjournalurl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "deviceid=" + iddispositivo // <-- Post parameters
            // body: "deviceid=" + "aaa",


        }, this.state.fetchTimeoutTime, "Il server non risponde")

            .then((response) => {

                if (response.status != 200) {

                    response.json().then(
                        (responseJson) => {

                            ToastAndroid.showWithGravity(responseJson.resp, ToastAndroid.SHORT, ToastAndroid.CENTER);
                        });
                    this.setState({banner: ''});

                    this.setState({filteredJournals: []});


                } else {

                    response.json()
                        .then((responseJson) => {
                            this.setState({banner: responseJson[0].banner});
                            this.setState({nickname: responseJson[0].nickname});


                            if (responseJson.journals.length <= 0) {
                                ToastAndroid.showWithGravity("Nessun giornale disponibile", ToastAndroid.SHORT, ToastAndroid.CENTER
                                );

                                this.setState({filteredJournals: []});

                            } else {

                                var list = responseJson.journals;

                                /*for(let i = 0; i < list.length; i++){

                                  if(list[i].image == "null"){
                                    list[i].image = "noimg.jpg";
                                  }

                                }*/

                                this.setState({journals: list});


                                var filtJourn = [];

                                for (var i = 0; i < this.state.journals.length; i++) {

                                    filtJourn.push({
                                        name: this.state.journals[i].name,
                                        file: this.state.journals[i].file,
                                        image: this.state.journals[i].image,

                                        cronaca: this.state.journals[i].cronaca,
                                        curiosita: this.state.journals[i].curiosita,
                                        description: this.state.journals[i].description,
                                        politica: this.state.journals[i].politica,
                                        spettacolo: this.state.journals[i].spettacolo,
                                        sport: this.state.journals[i].sport,
                                        economia: this.state.journals[i].economia,
                                        cultura: this.state.journals[i].cultura,
                                        tecnologia: this.state.journals[i].tecnologia,
                                        scienze: this.state.journals[i].scienze,
                                        gossip: this.state.journals[i].gossip,
                                        finanza: this.state.journals[i].finanza,
                                        ambiente: this.state.journals[i].ambiente,
                                        varie: this.state.journals[i].varie,

                                        url: this.state.journals[i].url
                                    });

                                }
                                this.setState({filteredJournals: filtJourn});
                            }
                        })
                }
            }).catch((error) => {
                //console.log(error);
                this.showTimeoutError(error)
                this.setState({filteredJournals: []});

            });
    }

    refreshweb() {

        return fetchTimeout(baseUrl + readwebjournalurl, {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
                        body: "iddispositivo=" + iddispositivo // <-- Post parameters
                        // body: "iddispositivo=" + "aaa",

        }, this.state.fetchTimeoutTime, "Il server non risponde")
        .then((response) => {
            switch (response.status) {

                case 200:

                 response.json().then((responseJson) => {
                    this.setState({banner: responseJson.utente.banner});
                    this.setState({nickname: responseJson.utente.nickname});
                     
                     if (responseJson.giornali.length <= 0) {
                          ToastAndroid.showWithGravity("Nessun giornale disponibile", ToastAndroid.SHORT, ToastAndroid.CENTER);
                          this.setState({filteredJournals: []});
                          this.setState({cachedWebJournal: []});

                        } else {

                            if(responseJson.giornali.length != this.state.cachedWebJournal){
                                console.log(responseJson.giornali.length)

                            this.setState({loading:true});

                            var list = responseJson.giornali;
                            this.setState({journals: list});
                            var filtJourn = [];
                            
                            this.state.journals.forEach(giornale => {
                                filtJourn.push({
                                    nome: giornale.nome,
                                    immagine: giornale.immagine,
                                    url: giornale.url
                                });
                            });
                            this.setState({cachedWebJournal: filtJourn});
                        this.setState({filteredJournals: filtJourn});
 
                        this.setState({loading:false});

                        }


                            /*
                            this.setState({cacheWebValidity: new Date().getHours()});
                            this.setState({cachedWebJournal: filtJourn});
                            this.setState({filteredJournals: filtJourn});
                            */
        }
    });


    
    break;

    default:
    response.json().then(
        (responseJson) => {
            ToastAndroid.showWithGravity(
                responseJson.messaggio,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        });

    this.setState({banner: ''});
    this.setState({filteredJournals: []});
    
    this.setState({loading:false});
    break;
}
}).catch((error) => {
                this.showTimeoutError(error)
                this.setState({filteredJournals: []});
            });
        }

        refreshpdf() {
            
            return fetchTimeout(baseUrl + readpdfjournalurl, {
    
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                 },
                            body: "iddispositivo=" + iddispositivo // <-- Post parameters
                            // body: "iddispositivo=" + "aaa",
    
            }, this.state.fetchTimeoutTime, "Il server non risponde")
            .then((response) => {
                switch (response.status) {
    
                    case 200:
    
                     response.json().then((responseJson) => {
                    
                         if (responseJson.giornali.length <= 0) {
                              ToastAndroid.showWithGravity("Nessun giornale disponibile", ToastAndroid.SHORT, ToastAndroid.CENTER);
                              this.setState({filteredJournals: []});
                            } else {

                                if(responseJson.giornali.length != this.state.cachedPdfJournal){
                                    this.setState({loading:true});

                                var list = responseJson.giornali;
                                this.setState({journals: list});
                                var filtJourn = [];
                                
                                this.state.journals.forEach(giornale => {
                                    filtJourn.push({
                                        nome: giornale.nome,
                                        immagine: giornale.immagine,
                                        url: giornale.url,
                                        file: giornale.file
                                    });
                                });

                                this.setState({cachedPdfJournal: filtJourn});
                                   this.setState({filteredJournals: filtJourn});
                                   this.setState({loading:false});

                            }
            }
        });
        
        this.setState({loading:false});
        
        break;
    
        default:
        response.json().then(
            (responseJson) => {
                ToastAndroid.showWithGravity(
                    responseJson.messaggio,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            });
    
        this.setState({banner: ''});
        this.setState({filteredJournals: []});
        
        this.setState({loading:false});
        break;
    }
    }).catch((error) => {
                    this.showTimeoutError(error)
                    this.setState({filteredJournals: []});
                });
            }

    login() {

        this.setState({loading:true});
        return fetchTimeout(baseUrl + loginurl, {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },


           // body: "email=" + this.state.email + "&" + "alreadylogged=ok"  // <-- Post parameters
            body: "iddispositivo=" + iddispositivo // <-- Post parameters
            // body: "iddispositivo=" + "aaa",

        }, this.state.fetchTimeoutTime, "Il server non risponde")

            .then((response) => {


                switch (response.status) {
                    case 200:
                        
                        break;
                
                    default:
                        break;
                }
                if (response.status != 200) {

                    response.text().then(
                        (obj) => {


                            ToastAndroid.showWithGravity(
                                obj,
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );


                        });
                    this.setState({banner: ''});

                    this.setState({filteredJournals: []});

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
                this.setState({filteredJournals: []});

            });
    }


    refreshbyidpersonal() {
        
        return fetchTimeout(baseUrl + readpersonalurl, {
    
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
                        body: "iddispositivo=" + iddispositivo // <-- Post parameters
                        // body: "iddispositivo=" + "aaa",

        }, this.state.fetchTimeoutTime, "Il server non risponde")
        .then((response) => {
            switch (response.status) {

                case 200:

                 response.json().then((responseJson) => {
                
                     if (responseJson.modulipersonali.length <= 0) {
                          ToastAndroid.showWithGravity("Nessun giornale disponibile", ToastAndroid.SHORT, ToastAndroid.CENTER);
                          this.setState({filteredJournals: []});
                        } else {

                            if(responseJson.modulipersonali.length != this.state.cachedPersJournal){
                                this.setState({loading:true});

                            var list = responseJson.modulipersonali;
                            this.setState({journals: list});
                            var filtJourn = [];
                            
                            this.state.journals.forEach(giornale => {
                                filtJourn.push({
                                    nome: giornale.nome,
                                    immagine: giornale.immagine,
                                    url: giornale.url,
                                    file: giornale.file
                                });
                            });


                            this.setState({cachedPersJournal: filtJourn});
                            this.setState({filteredJournals: filtJourn});
                            this.setState({loading:false});

                        }
        }
    });
    
    this.setState({loading:false});
    
    break;

    default:
    response.json().then(
        (responseJson) => {
            ToastAndroid.showWithGravity(
                responseJson.messaggio,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        });

    this.setState({banner: ''});
    this.setState({filteredJournals: []});
    
    this.setState({loading:false});
    break;
}
}).catch((error) => {
                this.showTimeoutError(error)
                this.setState({filteredJournals: []});
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
            flex: 0.15,
            flexDirection: 'row',
            backgroundColor: '#252523',
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
        imagebanner: {
            width: Dimensions.get('window').width,
            height: 60
        },
        image: {
            height: 110,
            width: 300
        }, 
        text: {
            color: 'red'
        }

    });