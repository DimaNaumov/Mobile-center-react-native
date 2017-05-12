import React, { Component } from 'react';
import { Platform } from 'react-native';

import GoogleFitService from './googleFitService'

import * as CONST from './const';
import * as LocalStorage from './storage';

class DataProvider {
  constructor() {
    this.getFitnessDataForFiveDays = this.getFitnessDataForFiveDays.bind(this);
    this.getFitnessDataForOneDay = this.getFitnessDataForOneDay.bind(this);
  }

  getFitnessDataForFiveDays() {
    if (LocalStorage.Storage.get('fitnessData') == undefined) {
      if (Platform.OS === CONST.PLATFORM_IOS) {

      } else 
      if (Platform.OS === CONST.PLATFORM_ANDROID) {
          //TODO: MOVE AUTHORIZE TO LOGIN SCREEN
          GoogleFitService.onAuthorize((res) => {
              console.log(res);
          });
          GoogleFitService.authorize();
        
          GoogleFitService.getFiveDaysData(function(d) {
              LocalStorage.Storage.set('fitnessData', d);
              console.log(d);
              return d;
          });
      }
    }
    else {
      return LocalStorage.Storage.get('fitnessData');
    }
  }

  getFitnessDataForOneDay() {
    if (LocalStorage.Storage.get('fitnessData') != undefined) {
      var allData = LocalStorage.Storage.get('fitnessData');
      var currDayData = {};
      currDayData.calories = allData['calories'][allData['calories'].length - 1].value;
      currDayData.steps = allData['steps'][allData['steps'].length - 1].value;
      currDayData.distance = allData['distance'][allData['distance'].length - 1].value;
      currDayData.activetime = allData['activetime'][allData['activetime'].length - 1].value;
      return currDayData;
    }
    else {
      return {}
    }
  }
}

export default new DataProvider();