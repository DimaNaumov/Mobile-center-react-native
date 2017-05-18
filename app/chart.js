'use strict'

import React, { Component } from 'react'
import {
  AppRegistry,
  ActivityIndicator,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { StockLine } from 'react-native-pathjs-charts'
import moment from 'moment'
import { SmoothLine } from 'react-native-pathjs-charts'
import * as LocalStorage from './storage';


export default class Charts extends Component {

  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this);
    LocalStorage.Storage.subscribe(this.updateState);
    this.state = { loading: true };
  }
  updateState() {
    this.setState(() => {
      loading: !this.state.loading;
    });
  };
  options = {
    width: 350,
    height: 250,
    color: '#058bc4',
    strokeWidth: '1.5',
    margin: {
      top: 10,
      left: 35,
      bottom: 30,
      right: 10
    },

    animate: {
      type: 'delayed',
      duration: 200
    },
    axisX: {
      showAxis: false,
      showLines: false,
      showLabels: true,
      showTicks: false,
      zeroAxis: false,
      orient: 'bottom',
      tickValues: [
      ],
      labelFunction: ((timestamp) => {
        let date = new Date(timestamp);
        return moment(timestamp).format('DD/MM');
      }),
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: false,
        fill: '#C0C0C0',
      }
    },
    axisY: {
      showAxis: false,
      showLines: true,
      showLabels: true,
      showTicks: false,
      zeroAxis: true,
      orient: 'left',
      tickValues: [
      ],
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: false,
        fill: '#C0C0C0',
      }
    }
  }
  render() {

    let dataSet = LocalStorage.Storage.get('fitnessData');
    if (dataSet != undefined && dataSet[this.props.dataSetName] != undefined) {
      return (
        <View style={styles.container}>
          <StockLine data={[dataSet[this.props.dataSetName]]} options={this.options} xKey='date' yKey='value' />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            style={[styles.centering, styles.gray, { height: 250 }]}
            size="large"
          />
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});