import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
const axios = require('react-native-axios');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CatogComponent from './app/components/CatogComponent';

import CountryWise from './app/screens/CountryWise';
import WorldWide from './app/screens/WorldWide';

const {width, height} = Dimensions.get('screen');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      active: 0,
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api/countries/India/',
    })
      .then(response => {
        // console.log(response.data);
        this.setState({
          confirmed: response.data.confirmed.value,
          recovered: response.data.recovered.value,
          deaths: response.data.deaths.value,
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api/countries/India/confirmed',
    })
      .then(response => {
        this.setState({
          active: response.data[0].active,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  goTOWorldWide = () => {
    this.props.navigation.navigate('WorldWide');
  };
  goToCountryWise = () => {
    this.props.navigation.navigate('CountryWise');
  };

  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.upperContainer}>
          <View style={styles.header}>
            <Image
              source={require('./app/assets/logo3.png')}
              style={styles.logo}
            />
            <Text style={styles.heading}>Covid Tracker</Text>
          </View>
          <Text
            style={{
              color: 'green',
              fontSize: 18,
              marginLeft: 10,
              fontWeight: 'bold',
            }}>
            INDIA
          </Text>
          <CatogComponent
            confirmed={this.state.confirmed}
            recovered={this.state.recovered}
            deaths={this.state.deaths}
            active={this.state.active}
          />

          <View style={styles.navigator}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.goTOWorldWide()}>
              <Icon name="eye" size={20} color="#fff" />
              <Text style={styles.btnText}>World Wide Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.goToCountryWise()}>
              <Icon name="eye" size={20} color="#fff" />
              <Text style={styles.btnText}>Country Wise Data</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('./app/assets/bg.png')}
            style={{height: 250, width: width}}
          />
        </View>
        <Text style={styles.description}>
          Coronavirus disease (COVID-19) is an infectious disease caused by a
          newly discovered coronavirus. Most people infected with the COVID-19
          virus will experience mild to moderate respiratory illness and recover
          without requiring special treatment.
        </Text>
      </View>
    );
  }
}

const Main = createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      header: null,
    },
  },
  CountryWise: {
    screen: CountryWise,
    navigationOptions: {
      header: null,
    },
  },
  WorldWide: {
    screen: WorldWide,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  upperContainer: {
    height: height - 200,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 150,
    // padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  logo: {
    height: 55,
    width: 55,
  },
  heading: {
    color: 'green',
    fontSize: 35,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  description: {
    color: '#99cc99',
    margin: 10,
    marginTop: 30,
    letterSpacing: 1,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },

  navigator: {
    height: '26%',
    width: width - 100,
    // backgroundColor: 'black',
    marginTop: 50,
    alignSelf: 'flex-end',
    // paddingTop: '30%',
  },
  btn: {
    width: '75%',
    height: 50,
    backgroundColor: 'green',
    alignSelf: 'flex-end',
    marginBottom: 20,
    alignItems: 'center',
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 10,
  },
});
