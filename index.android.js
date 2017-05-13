import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import SvgUri from 'react-native-svg-uri';

import AuthorizationComponent from './app/auth';
import * as CONST from './app/const';
import DataProvider from './app/dataProvider';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={styles.home}>
        <Image  source={require('./images/vsmc.png')}/>
        {/*<Image source={require('./images/photo.png')}/>*/}
        <Image style={{width: 200, height: 200}} source={{uri: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'}}/>
        
        <Text>HI, RICK WALLACE!</Text>
        <Text> </Text>
        <Text>TODAY'S STEPS:</Text>
        <Text style={{
          color: 'dodgerblue',
          fontSize: 100,
          fontWeight: 'bold'
        }}>
          10000
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
                500
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
                7.4
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
              1
              <Text style={{fontSize: 16, color: 'gray'}}>
                h
              </Text>
              34
              <Text style={{fontSize: 16, color: 'gray'}}>
                m
              </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class StatisticScreen extends React.Component {
  static navigationOptions = {
    title: 'Statistic',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View  style={styles.container}>
        <Text>Some Statistic</Text>
        <StatisticRouter/>
        <Button
          //onPress={() => navigate('Crash')}
          onPress={() => this.props.navigation.navigate('Crash')}
          title="Crash application"
        />
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
          color: 'grey',
          fontSize: 20,
        }}>Sorry, something went wrong!
        </Text>
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
        <Image  source={require('./images/vsmc.png')}/>
        <Image  source={require('./images/login_logo.png')}/>
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
        <Image  style={styles.error_logo} source={require('./images/error_image.png')}/>
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
        <Image  width="300" height="300" source={require('./images/graph.png')}/>
        <Text>Steps</Text>
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
       data: DataProvider.getFitnessDataForFiveDays()
    }));
  };
  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        <Image  width="300" height="300" source={require('./images/graph.png')}/>
        <Text>Calories</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Crash')}
          title="Crash application"
        />
        <Button
          onPress={() => this.forceUpdateHandler()}
          title="Get data"
        />
        <Text>Props: {[1,2,3]}</Text>
        <Text>State: {JSON.stringify(this.state)}</Text>
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
        <Image  width="300" height="300" source={require('./images/graph.png')}/>
        <Text>Distance</Text>
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
        <Image  width="300" height="300" source={require('./images/graph.png')}/>
        <Text>Time</Text>
      </View>
    );
  }
}

const StatisticRouter = TabNavigator({
    Steps: { screen:  StepsScreen },
    Calories: { screen: CalScreen },
    Distance: { screen: DistanceScreen },
    Time: { screen: TimeScreen },
  }, 
  {
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarPosition: 'bottom',
    initialRouteName: 'Steps',
    headerMode : 'none'
});

const MobileCenterRouter = TabNavigator({
    Home: { screen:  HomeScreen },
    Statistic: { screen: StatisticRouter },
    Crash: { screen: CrashScreen },
    Login: { screen: LoginScreen },
    Login2: { screen: Login2Screen },
  },
  {
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    headerMode : 'none'
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
    width: 100,
    height: 100
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
  }
});

AppRegistry.registerComponent('MobileCenter', () => MobileCenterRouter);