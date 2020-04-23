import { NetInfo ,Platform } from 'react-native';

const checkInternetConnection = () => {
    if (Platform.OS === "android") {
        let check;
        NetInfo.isConnected.fetch().then(isConnected => {
          check = isConnected;
        });
        return check;
      } 
}

export {checkInternetConnection};