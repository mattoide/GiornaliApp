import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Journal from './src/pages/Journal';
import PDFJournal from './src/pages/PDFJournal';

import RNLockTask from 'react-native-lock-task';

 RNLockTask.startLockTask();






/*import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Warning: Can\'t call', 'Possible Unh']);*/


import { createStackNavigator } from 'react-navigation';

// export const baseUrl = "http://192.168.137.1:8000/";
// export const baseUrl = "http://192.168.1.6:8000/";
//export const baseUrl = "http://drink-web.eu:8000/";
export const baseUrl = "http://tido.novus.cc/";

export const loginurl = "/api/login";
export const homeurlweb = "/api/homeweb";
export const homeurlpdf = "/api/homepdf";

export const checkdeviceurl = "/api/checkdevice";
export const getlogo = "/api/getlogo";


export const readwebjournalurl = "/api/readwebjournals";
export const readpdfjournalurl = "/api/readpdfjournals";
export const readpersonalurl = "/api/readpersonal";



export default createStackNavigator(
  {

    Login: Login,
    Home: Home,
    Journal: Journal,
    PDFJournal: PDFJournal

  },

 
  {
    initialRouteName: 'Login',

    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
  }
  });

/*
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native! dio</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/