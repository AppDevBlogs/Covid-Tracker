import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
const axios = require('react-native-axios');
import WorldwideComponent from '../components/WorldWideComponent';

class WorldWide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo3.png')} style={styles.logo} />
          <Text style={styles.heading}>World Wide Data</Text>
        </View>
        <WorldwideComponent />
      </View>
    );
  }
}

export default WorldWide;

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
