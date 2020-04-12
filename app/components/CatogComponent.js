import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class CatogComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.catogWide}>
        <View style={[styles.catogInner, {backgroundColor: '#e59400'}]}>
          <Text style={styles.label}>Confirmed</Text>
          <Text style={styles.data}>{this.props.confirmed}</Text>
        </View>
        <View style={[styles.catogInner, {backgroundColor: 'green'}]}>
          <Text style={styles.label}>Recovered</Text>
          <Text style={styles.data}>{this.props.recovered}</Text>
        </View>
        <View style={[styles.catogInner, {backgroundColor: 'red'}]}>
          <Text style={styles.label}>Deaths</Text>
          <Text style={styles.data}>{this.props.deaths}</Text>
        </View>
        <View style={[styles.catogInner, {backgroundColor: '#22222d'}]}>
          <Text style={styles.label}>Active</Text>
          <Text style={styles.data}>{this.props.active}</Text>
        </View>
      </View>
    );
  }
}

export default CatogComponent;

const styles = StyleSheet.create({
  catogWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  catogInner: {
    width: '24%',
    backgroundColor: 'green',
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  label: {
    color: '#cce5cc',
  },
  data: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
