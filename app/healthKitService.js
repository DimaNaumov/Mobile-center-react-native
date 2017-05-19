'use strict'
import {
    Alert
} from 'react-native';
import moment from 'moment'
import AppleHealthKit from 'react-native-apple-healthkit-rn0.40';

const HKPERMS = AppleHealthKit.Constants.Permissions;
const HKOPTIONS = {
    permissions: {
        read: [
            HKPERMS.StepCount,
            HKPERMS.DistanceWalkingRunning,
            HKPERMS.FlightsClimbed,
            HKPERMS.Height,
            HKPERMS.DateOfBirth,
            HKPERMS.BiologicalSex,
            HKPERMS.SleepAnalysis,
            HKPERMS.DistanceWalkingRunning,
            HKPERMS.ActiveEnergyBurned,
            HKPERMS.AppleExerciseTime
        ],

    }
};

class HealthKitService {
    constructor(props) {
        this.isAvailable = this.isAvailable.bind(this);
        this.initHealthKit = this.initHealthKit.bind(this);
        this.fetchDataForFiveDays = this.fetchDataForFiveDays.bind(this);
        this.getDailyStepCountSamples = this.getDailyStepCountSamples.bind(this);
        this.getDailyActiveEnergyBurnedSamples = this.getDailyActiveEnergyBurnedSamples.bind(this);
        this.getDailyAppleExerciseTimeSamples = this.getDailyAppleExerciseTimeSamples.bind(this);
        this.getDailyDistanceWalkingRunningSamples = this.getDailyDistanceWalkingRunningSamples.bind(this);
        this.state = {
            loading: false,
        }
    }
    isAvailable(callback){
        AppleHealthKit.isAvailable(callback);
    }
    initHealthKit(callback){
        AppleHealthKit.initHealthKit(HKOPTIONS, callback);
    }
    fetchDataForFiveDays(callback){
        var data = {};
        Promise.all(
            [
                this.getDailyStepCountSamples(),
                this.getDailyActiveEnergyBurnedSamples(),
                this.getDailyDistanceWalkingRunningSamples(),
                this.getDailyAppleExerciseTimeSamples()
            ])
            .then((allData) => {
                data.steps = this._getFiveDaysFormated(allData[0]) || [];
                data.calories = this._getFiveDaysFormated(allData[1]) || [];
                data.distance = this._getFiveDaysFormated(allData[2]) || [];
                data.activetime = this._getFiveDaysFormated(allData[3]) || [];
                callback(data);
            }).catch((err) => {
                console.log(err);
            });
    }
    // fetchDataForFiveDays(callback) {
    //     AppleHealthKit.isAvailable((err, available) => {
    //         if (available) {
    //             AppleHealthKit.initHealthKit(HKOPTIONS, (err, res) => {
    //                 if (err) {
    //                     console.log(err);
    //                     return;
    //                 }
    //                 var data = {};
    //                 Promise.all(
    //                     [
    //                         this.getDailyStepCountSamples(),
    //                         this.getDailyActiveEnergyBurnedSamples(),
    //                         this.getDailyDistanceWalkingRunningSamples(),
    //                         this.getDailyAppleExerciseTimeSamples()
    //                     ])
    //                     .then((allData) => {
    //                         data.steps = this._getFourDaysFormated(allData[0]) || [];
    //                         data.calories = this._getFourDaysFormated(allData[1]) || [];
    //                         data.distance = this._getFourDaysFormated(allData[2]) || [];
    //                         data.activetime = this._getFourDaysFormated(allData[3]) || [];
    //                         callback(data);
    //                     }).catch((err) => {
    //                         console.log(err);
    //                     });
    //             });
    //         }
    //     });
    //     this.setState((prevState, props) => {
    //         loading: !this.state.loading;
    //     });

    // }
    _getFiveDaysFormated(data) {
        if (data == undefined) {
            return;
        }
        let result = [];
        let fiveDays = [
            moment().add(-4, 'days'),
            moment().add(-3, 'days'),
            moment().add(-2, 'days'),
            moment().add(-1, 'days'),
            moment() //today
        ]
        for (let i in fiveDays) {
            let has = false;
            for (let j in data) {
                let date = moment(data[j].startDate, 'YYYY-MM-DD');
                if (fiveDays[i].isSame(date, 'day')) {
                    result.push(
                        {
                            //date: date.format('X'),
                            date: date.toDate().getTime(),
                            value: data[j].value
                        }
                    );
                    has = true;
                    break;
                }
            }
            if (!has) {
                result.push({
                    //date: fourDays[i].unix(),
                    date: fiveDays[i].toDate().getTime(),
                    value: 0
                });
            }
        }
        return result;
    }
    //getDailyStepCountSamples
    //getDailyActiveEnergyBurnedSamples
    //getDailyAppleExerciseTimeSamples
    //getDailyDistanceWalkingRunningSamples
    getDailyStepCountSamples() {
        let options = {
            startDate: (moment(new Date(), 'YYYY-MM-DD HH:mm').subtract(4, 'days')).toISOString(),
        };
        return new Promise(function (resolve, reject) {
            AppleHealthKit.getDailyStepCountSamples(options, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
    getDailyActiveEnergyBurnedSamples() {
        let options = {
            startDate: (moment(new Date(), 'YYYY-MM-DD HH:mm').subtract(4, 'days')).toISOString(),
        };
        return new Promise(function (resolve, reject) {
            AppleHealthKit.getDailyActiveEnergyBurnedSamples(options, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
    getDailyAppleExerciseTimeSamples() {
        let options = {
            startDate: (moment(new Date(), 'YYYY-MM-DD HH:mm').subtract(4, 'days')).toISOString(),
        };
        return new Promise(function (resolve, reject) {
            AppleHealthKit.getDailyAppleExerciseTimeSamples(options, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
    getDailyDistanceWalkingRunningSamples() {
        let options = {
            startDate: (moment(new Date(), 'YYYY-MM-DD HH:mm').subtract(4, 'days')).toISOString(),
        };
        return new Promise(function (resolve, reject) {
            AppleHealthKit.getDailyDistanceWalkingRunningSamples(options, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
}

export default new HealthKitService();