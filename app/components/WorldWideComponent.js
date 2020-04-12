import React, {Component} from 'react';
import {View, StyleSheet, Picker, Text} from 'react-native';
const axios = require('react-native-axios');
import CatogComponent from './CatogComponent';
import GraphComponent from './GraphComponent';

class WorldwideComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'India',
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      lastUpdate: null,
      active: 0,
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api',
    })
      .then(response => {
        var lastupdate = response.data.lastUpdate.replace('T', '  ');
        lastupdate = lastupdate.replace('.000Z', '');

        this.setState({
          confirmed: response.data.confirmed.value,
          recovered: response.data.recovered.value,
          deaths: response.data.deaths.value,
          active:
            response.data.confirmed.value -
            (response.data.recovered.value + response.data.deaths.value),
          lastUpdate: lastupdate,
        });
        console.log(response.data.lastUpdate);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <CatogComponent
          confirmed={this.state.confirmed}
          recovered={this.state.recovered}
          deaths={this.state.deaths}
          active={this.state.active}
        />
        <View style={styles.lastUpdate}>
          <Text style={{color: '#99cc99', fontSize: 20, fontWeight: 'bold'}}>
            Last Update
          </Text>
          <Text style={styles.text}>{this.state.lastUpdate}</Text>
        </View>

        <GraphComponent
          confirmed={this.state.confirmed}
          recovered={this.state.recovered}
          deaths={this.state.deaths}
          active={this.state.active}
        />
      </View>
    );
  }
}

export default WorldwideComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
    width: '50%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'gray',
    elevation: 5,
    marginBottom: 15,
  },
  lastUpdate: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
  },
  text: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
