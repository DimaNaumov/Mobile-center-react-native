import { PermissionsAndroid, Platform } from 'react-native';
import * as CONST from './const';

class PermissionService {
    constructor() {
    }

    requestLocationPermission() {
        if (Platform.OS == CONST.PLATFORM_ANDROID) {
            try {
                if (Platform.Version >= 23) {
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(function(wasAlreadyGranted) {
                        if (!wasAlreadyGranted) {
                            PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION/*,
                                {
                                    'title': 'Access Location Permission',
                                    'message': 'Application needs access to your location.'
                                }*/
                            ).then(function (granted) {
                                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                    console.log("Location access permission: ok")
                                } else {
                                    console.log("Location access permission: denied")
                                }
                            }).catch(function(err) {
                                console.log(err)
                            });
                        } else {
                            console.log("Location access permission: already was granted")
                        }
                    }).catch(function(err) {
                        console.log(err);
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default new PermissionService();