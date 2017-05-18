import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import RoundedButton from './roundedButton';
import * as simpleAuthProviders from 'react-native-simple-auth';
import PermissionService from './permissionService';
import SelfAnalytics from './analytics';
import SelfCrashes from './crashes';
import * as CONST from './const';
import DataProvider from './dataProvider';
import * as LocalStorage from './storage';

const configs = {
  facebook: {
        appId: '1945815635652325',
        appSecret: 'f5638047a74faae2250f6436a065f26c',
        callback: 'fb1945815635652325://authorize',
        scope: 'user_friends',
        fields: ['email', 'first_name', 'last_name', 'picture']
    },
    twitter: {
        appId: 'RpQDj4XFdHRvHp4l3uOKkyDJq',
        appSecret: 'qqOILC0EPMvOFdsYXbE5zkgccU5Dsuo8P7PwcDR3cGoRLRm21c',
        callback: 'com.mobilecenter://authorize',
        fields: ['email', 'name', 'profile_image_url']
    }
}

class Login extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <RoundedButton 
          onPress={this.onBtnPressed.bind(this,'facebook', configs['facebook'])}
          title='LOGIN VIA FACEBOOK'
          img={require('../images/login_facebook.png')}
          backgroundColor="#3b5998"/>
        <RoundedButton 
          onPress={this.onBtnPressed.bind(this,'twitter', configs['twitter'])}
          title='LOGIN VIA TWITTER'
          img={require('../images/login_twitter.png')}
          backgroundColor="#48BBEC"
          marginTop={20}/>
      </View>
    )
  }

  onBtnPressed(provider, opts) {
    const _this = this;
    const redirection = this.props.redirect;
    let user = this.props.user;
    this.setState({
      loading: true
    });
    LocalStorage.Storage.set(CONST.AUTH_IN_PROGRESS, true);
    
    const analytics = new SelfAnalytics();
    const crash = new SelfCrashes();
    simpleAuthProviders[provider](opts)
      .then((info) => {
        //analytics.enable();
        //DoMethod(info)
        LocalStorage.Storage.set(CONST.AUTH_IN_PROGRESS, false);
        LocalStorage.Storage.set(CONST.SOCIAL_AUTHORIZED_ITEM, true);
        if(provider == 'facebook'){
            //Alert.alert(provider, info.user.first_name + ' ' + info.user.last_name + '\n ' + info.user.picture.data.url);
            console.log('!!!!');
            console.log(info.user);
            user = {
              name: info.user.first_name + ' ' + info.user.last_name,
              photoUrl: info.user.picture.data.url
            };
            LocalStorage.Storage.set('user', user);
            analytics.track('fb_login');
        } else if(provider == 'twitter'){
            //Alert.alert(provider, info.user.name + '\n ' + info.user.profile_image_url);
            console.log('!!!!');
            console.log(info.user);
            user = {
              name: info.user.name,
              photoUrl: info.user.profile_image_url
            };
            LocalStorage.Storage.set('user', user);
            analytics.track('tw_login');
        }
        analytics.track('login_api_request_result', {"Social network": provider, 'Result': 'true'});
        PermissionService.requestLocationPermission(function() {//onAllow
          DataProvider.getFitnessDataForFiveDays(function(d) {
            LocalStorage.Storage.set(CONST.FIT_DATA_RECEIVED_ITEM, true);
            redirection(CONST.HOME_SCREEN);
          });
        }, 
        function() {//onErrorOrDenied
          LocalStorage.Storage.set(CONST.AUTH_IN_PROGRESS, false);
          redirection(CONST.LOGIN2_SCREEN);
        });
      })
      .catch((error) => {
        Alert.alert(
          'Authorize Error',
          error.message
        );
       analytics.track('login_api_request_result', {"Social network": provider, 'Result': 'false'});
       LocalStorage.Storage.set(CONST.AUTH_IN_PROGRESS, false);
       LocalStorage.Storage.set(CONST.SOCIAL_AUTHORIZED_ITEM, false);
       redirection(CONST.LOGIN2_SCREEN);
      });
  }
}

export default class AuthorizationComponent extends Component {
  render() {
    return (
            <Login redirect={this.props.redirect}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  },
  google: {
    backgroundColor: '#ccc'
  }
});