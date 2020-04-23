import React, { useEffect, useState } from "react";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import * as Font from "expo-font";
import { View, ActivityIndicator } from "react-native";
import HomeScreenRouter from "./screens/HomeScreenRouter";
import GeneralStatusBar from "./components/GeneralStatusBar";
import colors from "./layouts/colors";


const App = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async function() {
      await Font.loadAsync({
        Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf")
      });
      setIsReady(true);
    })();
  });

  return (
    <Provider store={ store } >
      <View style={{ flex: 1 }}>
        <GeneralStatusBar backgroundColor={colors.primary} barStyle="light-content" />

        {isReady ? <HomeScreenRouter /> : <ActivityIndicator />}
      </View>
    </Provider>
      
  );
};

export default App;
