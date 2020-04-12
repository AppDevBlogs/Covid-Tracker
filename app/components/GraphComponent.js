import React, {Component} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {View, StyleSheet, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
class GraphComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = {
      labels: ['Confirmed', 'Recovered', 'Deaths', 'Active'],
      datasets: [
        {
          data: [
            this.props.confirmed,
            this.props.recovered,
            this.props.deaths,
            this.props.active,
          ],
        },
      ],
    };
    const chartConfig = {
      backgroundGradientFrom: '#fff',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#fff',
      color: (opacity = 1) => `green`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 1.2,
      decimalPlaces: 0,
      fillShadowGradient: 'green',
      fillShadowGradientOpacity: 0.3,
    };

    return (
      <View style={styles.container}>
        <View style={styles.barContainer}>
          <BarChart
            style={styles.graphStyle}
            data={data}
            width={screenWidth - 50}
            height={350}
            fromZero={true}
            // yAxisLabel="$"
            chartConfig={chartConfig}
          />
        </View>
      </View>
    );
  }
}

export default GraphComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },

  barContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    marginTop: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  graphStyle: {
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
