import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import colors from '../layouts/colors';

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  }
});

const GeneralStatusBar = (props) => (
  <View style={styles.statusBar}>
    <StatusBar translucent  {...props} />
  </View>
);

export default GeneralStatusBar;
