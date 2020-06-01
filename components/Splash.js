import React from 'react';
import {ImageBackground, View, ActivityIndicator, Text} from 'react-native';
import colors from '../layouts/colors';

const Splash = () => {
  return (
    <ImageBackground source={require('../assets/splash.png')} style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: 200,
        }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Loading...</Text>
      </View>
    </ImageBackground>
  );
};

export default Splash;
