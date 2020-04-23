import React from "react";
import { StyleSheet, View } from "react-native";
import { Spinner } from "native-base";

const SpinnerComponent = props => {
  return (
    <View style={styles.container}>
      <Spinner color={props.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SpinnerComponent;
