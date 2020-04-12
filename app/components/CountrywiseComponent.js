import React, {Component} from 'react';
import {View, StyleSheet, Picker, Text, TouchableOpacity} from 'react-native';
const axios = require('react-native-axios');
import CatogComponent from './CatogComponent';
import GraphComponent from './GraphComponent';
import {captureScreen} from 'react-native-view-shot';
class CatogwideComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'India',
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      lastUpdate: null,
      active: 0,
      imageURI: '',
    };
  }

  componentDidMount() {
    this.getItems('India');
  }

  getItems(country) {
    console.log(country);
    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api/countries/' + country,
    })
      .then(response => {
        var lastupdate = response.data.lastUpdate.replace('T', '  ');
        lastupdate = lastupdate.replace('.000Z', '');
        this.setState({
          confirmed: response.data.confirmed.value,
          recovered: response.data.recovered.value,
          deaths: response.data.deaths.value,
          lastUpdate: lastupdate,
        });
        console.log(response.data.lastUpdate);
      })
      .catch(error => {
        console.log(error);
      });

    //   "https://covid19.mathdro.id/api/countries/India/confirmed"
    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api/countries/' + country + '/confirmed',
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          active: response.data[0].active,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedValue = item => {
    console.log(item);
    this.setState({
      country: item,
    });
    this.getItems(item);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.picker}>
          <Picker
            selectedValue={this.state.country}
            style={{
              height: 40,
              width: '90%',
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValue(itemValue)
            }>
            {this.props.countries.map(country => (
              <Picker.Item label={country} value={country} />
            ))}
          </Picker>
        </View>
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

export default CatogwideComponent;

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
