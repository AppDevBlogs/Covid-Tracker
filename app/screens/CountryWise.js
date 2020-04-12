import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
const axios = require('react-native-axios');
import CountryWiseComponent from '../components/CountrywiseComponent';

class CountryWise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api/countries',
    })
      .then(response => {
        var items = [];
        for (var i = 0; i < response.data.countries.length; i++) {
          items.push(response.data.countries[i].name);
        }
        this.setState({
          countries: items,
        });
        // console.log(this.state.countries);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo3.png')} style={styles.logo} />
          <Text style={styles.heading}>Country Wise Data</Text>
        </View>
        <CountryWiseComponent countries={this.state.countries} />
      </View>
    );
  }
}

export default CountryWise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});
