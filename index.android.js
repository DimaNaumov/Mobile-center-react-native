import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import AuthorizationComponent from './app/auth';
import * as CONST from './app/const';
import DataProvider from './app/dataProvider';
import * as LocalStorage from './app/storage';
import Chart from './app/chart'
import RoundedButton from './app/roundedButton';
import SelfAnalytics from './app/analytics';
import SelfCrashes from './app/crashes';
import moment from 'moment'


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this);
    LocalStorage.Storage.subscribe(this.updateState);
    this.state = { loading: true };
    // DataProvider.getFitnessDataForFiveDays();
  }
  updateState() {
    this.setState(() => {
      loading: !this.state.loading;
    });
  };
  render() {
    let name = LocalStorage.Storage.get('user').name;
    let photo = LocalStorage.Storage.get('user').photoUrl;
    let dataSet = DataProvider.getFitnessDataForOneDay();
    let steps = 9999;
    let calories = 999;
    let distance = 9.9;
    let activetimeHours = 9;
    let activetimeMins = 99;
    if(dataSet !== undefined){
        steps = dataSet.steps;
        calories = dataSet.calories;
        distance = dataSet.distance;
        let x = dataSet.activetime / 1000
        seconds = x % 60
        x /= 60
        minutes = x % 60
        x /= 60
        hours = x % 24
        activetimeHours = hours
        activetimeMins = minutes;
    }
    return (
      <View style={styles.home}>
        <Image  source={require('./images/vsmc.png')}/>
        <View style={styles.photo}>
            {/*<Image borderRadius={100} style={styles.photo} source={require('./images/photo.png')}/>*/}
        <Image borderRadius={100} style={styles.photo} source={{uri: LocalStorage.Storage.get('user').photoUrl}}/>
        </View>
        <Text>HI, {LocalStorage.Storage.get('user').name}</Text>
        <Text> </Text>
        <Text>TODAY'S STEPS:</Text>
        <Text style={{
          color: 'dodgerblue',
          fontSize: 100,
          fontWeight: 'bold'
        }}>
          {steps}
        </Text>
        <View style={styles.home_description}>
          <View style={styles.home_description_cell}>
            <View><Image style={styles.home_description_cell_img} source={require('./images/cal.png')}/></View>
            <View><Text>CALORIES</Text></View>
            <View>
              <Text style={{
                color: 'orange',
                fontSize: 40,
              }}>
                {calories.toFixed()}
              </Text>
            </View>
          </View>
          <Text>|</Text>
          <View style={styles.home_description_cell}>
            <View><Image style={styles.home_description_cell_img} source={require('./images/distance.png')}/></View>
            <View><Text>DISTANCE</Text></View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              }}>
              <Text style={{
                color: 'rebeccapurple',
                fontSize: 40,
                textAlignVertical: 'bottom'
              }}>
                {distance}
                <Text style={{   
                  fontSize: 16,
                  color: 'gray',
                }}> Km</Text></Text>
            </View>
          </View>
          <Text>|</Text>
          <View style={styles.home_description_cell}>
            <View><Image style={styles.home_description_cell_img} source={require('./images/time.png')}/></View>
            <View><Text>ACTIVE TIME</Text></View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              }}>
              <Text style={{
                color: 'limegreen',
                fontSize: 40,
              }}>
              {activetimeHours}
              <Text style={{fontSize: 16, color: 'gray'}}>
                h
              </Text>
              {activetimeMins}
              <Text style={{fontSize: 16, color: 'gray'}}>
                m
              </Text>
              </Text>
            </View>
          </View>
        </View>
        <HomeButtons navigation={this.props.navigation}/>
      </View>
    );
  }
}

class CrashScreen extends React.Component {
  static navigationOptions = {
    title: 'Crash',
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.error_logo} source={require('./images/error_image.png')}/>
        <Text style={{
          color: 'lightgrey',
          fontSize: 25,
          textAlign: 'center'
        }}>
          ERROR{"\n"}{"\n"}SORRY SOMETHING{"\n"}WENT WRONG!
        </Text>
        <HomeButtons navigation={this.props.navigation}/>
      </View>
    );
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <Image style={styles.login_container} source={require('./images/login_background.png')}>
      <Text>{"\n"}{"\n"}{"\n"}</Text>
        <Image  source={require('./images/vsmc.png')}/>
        <Text>{"\n"}{"\n"}{"\n"}</Text>
        <Image  source={require('./images/login_logo.png')}/>
        <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
        <AuthorizationComponent redirect={this.props.navigation.navigate}/>
      </Image>
    );
  }
}

class Login2Screen extends React.Component {
  static navigationOptions = {
    title: 'Login2 ',
  };
  render() {
    return (
      <Image style={styles.login_container} source={require('./images/login_background.png')}>
        <Text>{"\n"}{"\n"}{"\n"}</Text>
        <Image  style={styles.error_logo} source={require('./images/error_image.png')}/>
         <Text style={{
          color: 'lightgrey',
          fontSize: 25,
          textAlign: 'center'
        }}>
          ERROR{"\n"}{"\n"}SORRY SOMETHING{"\n"}WENT WRONG!
        </Text>
        <AuthorizationComponent redirect={this.props.navigation.navigate}/>
      </Image>
    );
  }
}

class StepsScreen extends React.Component {
  static navigationOptions = {
    title: 'Steps ',
  };
  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        {/*<Image  width="300" height="300" source={require('./images/graph.png')}/>*/}
        <Chart dataSetName={'steps'} />
        <Text>Steps</Text>
        <StatisticButtons navigation={this.props.navigation}/>
        <RoundedButton 
          onPress={() => (new SelfCrashes).crash()}
          title='CRASH APPLICATION'
          backgroundColor="red"
          style={styles.crash_btn}
         />
        <HomeButtons navigation={this.props.navigation}/>
      </View>
    );
  }
}

class CalScreen extends React.Component {
  static navigationOptions = {
    title: 'Calories ',
  };
  constructor(props){
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = { data:[1,2,3] };
  };
  
  forceUpdateHandler(){
     console.log('State: ', this.state);
    this.setState((prevState, props) => ({
       data: [3,2,1]//DataProvider.getFitnessDataForFiveDays()
    }));

    // let fitnessData= {
    //       'calories': [{
    //         "date": 0,
    //         "value": 0
    //       }, {
    //         "date": 1,
    //         "value": 1000
    //       }, {
    //         "date": 2,
    //         "value": 1500
    //       }, {
    //         "date": 3,
    //         "value": 500
    //       }, {
    //         "date": 4,
    //         "value": 2000
    //       }]
    // }
    // LocalStorage.Storage.set('fitnessData', fitnessData);

  };

  // onCrashPress() {
  //   const crash = new SelfCrashes();
  //   crash.crash();
  // }

  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        {/*<Image  width="300" height="300" source={require('./images/graph.png')}/>*/}
        <Chart dataSetName={'calories'} />
        <Text>Calories</Text>
        {/*<Button
          onPress={() => this.forceUpdateHandler()}
          title="Get data"
        />*/}
        {/*<Text>Props: {[1,2,3]}</Text>
        <Text>State: {JSON.stringify(this.state)}</Text>*/}
        <StatisticButtons navigation={this.props.navigation}/>
        <RoundedButton 
          onPress={() => (new SelfCrashes).crash()}
          title='CRASH APPLICATION'
          backgroundColor="red"
          style={styles.crash_btn}
         />
        <HomeButtons navigation={this.props.navigation}/>
      </View>
    );
  }
}


class DistanceScreen extends React.Component {
  static navigationOptions = {
    title: 'Distance ',
  };
  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        {/*<Image  width="300" height="300" source={require('./images/graph.png')}/>*/
        <Chart dataSetName={'distance'} />}
        <Text>Distance</Text>
        <StatisticButtons navigation={this.props.navigation}/>
        <RoundedButton 
          onPress={() => (new SelfCrashes).crash()}
          title='CRASH APPLICATION'
          backgroundColor="red"
          style={styles.crash_btn}
         />
        <HomeButtons navigation={this.props.navigation}/>
      </View>
    );
  }
}

class TimeScreen extends React.Component {
  static navigationOptions = {
    title: 'Time ',
  };
  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        {/*<Image  width="300" height="300" source={require('./images/graph.png')}/>*/
        <Chart dataSetName={'activetime'} />}
        <Text>Time</Text>
        <StatisticButtons navigation={this.props.navigation}/>
        <RoundedButton 
          onPress={() => (new SelfCrashes).crash()}
          title='CRASH APPLICATION'
          backgroundColor="red"
          style={styles.crash_btn}
         />
        <HomeButtons navigation={this.props.navigation}/>
      </View>
    );
  }
}

class StatisticButtons extends React.Component {
  render() {
    return (
      <View style={styles.home_description}>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Steps')}>
            <View>
              <Image style={styles.stat_cell_img} source={require('./images/stats_steps.png')}/>
              <Text>Steps</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Calories')}>
            <View>
              <Image style={styles.stat_cell_img} source={require('./images/stats_calories.png')}/>
              <Text>Calories</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Distance')}>
            <View>
              <Image style={styles.stat_cell_img} source={require('./images/stats_distance.png')}/>
              <Text>Distance</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Time')}>
            <View>
              <Image style={styles.stat_cell_img} source={require('./images/stats_time.png')}/>
              <Text>Time</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>  
    );
  }
}

class HomeButtons extends React.Component {
  
  onStatPress() {
    const analytics = new SelfAnalytics();
    analytics.track('view_stats');
    this.props.navigation.navigate('Steps');
  }
  
  render() {
    return (
    <View style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'lightgrey',
          height: 50
        }}>  
      <View style={styles.home_buttons}>
       
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
            <View style={styles.home_description_cell}>
              <Image style={styles.home_buttons_img} source={require('./images/main_home.png')}/>
              <Text>Home</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.onStatPress()}>
            <View style={styles.home_description_cell}>
              <Image style={styles.home_buttons_img} source={require('./images/main_stats.png')}/>
              <Text>Statistics</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>  
    </View>
    );
  }
}

const MobileCenterRouter = TabNavigator({
    Login2: { screen: Login2Screen },
    Login: { screen: LoginScreen },
    Home: { screen:  HomeScreen },
    Steps: { screen:  StepsScreen },
    Calories: { screen: CalScreen },
    Distance: { screen: DistanceScreen },
    Time: { screen: TimeScreen },
    Crash: { screen: CrashScreen },
  },
  {
    navigationOptions: {
      tabBarVisible: false
    },
    tabBarPosition: 'bottom',
    initialRouteName: 'Login',
    headerMode : 'none',
    animationEnabled: true,
    lazy: true,
    swipeEnabled: true,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  home: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  error_logo: {
    width: 150,
    height: 150
  },
  home_description: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  home_description_cell: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  home_description_cell_img: {
    height: 40,
    width: 40
  },
  stat_cell_img: {
  },
  photo: {
    width: 200,
    height: 200
  },
  home_buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  home_buttons_cell: {},
  home_buttons_img: {
    width: 25,
    height: 25
  },
  crash_btn: {
    margin: 20,
    padding: 20
  }
});

AppRegistry.registerComponent('MobileCenter', () => MobileCenterRouter);