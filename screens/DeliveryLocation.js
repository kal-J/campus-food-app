import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import colors from "../layouts/colors";
import NavHeader from "../components/NavHeader";
import { Button, Text, Icon } from "native-base";
import LocationInput from "../components/LocationInput";
import InternetError from "../components/InternetError";
import Splash from "../components/Splash";
import {
  View,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from "react-native";

const DeliveryLocation = (props) => {
  const [isConnected, setIsConnected] = useState();
  const [location, setLocation] = useState();
  useEffect(() => {
    if (Platform.OS === "android") {
      NetInfo.fetch().then((state) => {
        setIsConnected(state.isConnected);
      });
    }
    // fetch location data here
    const {PickupPoints} = require("../dummy_data/pickupPoints");
    setLocation(PickupPoints);

  }, []);

  if (!isConnected) {
    return <InternetError />;
  }

  if (!location) {
    return <Splash />;
  }
  return (
    <View style={{ flex: 1 }}>
      <NavHeader navigation={props.navigation} />

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <LocationInput PickupPoints={location} />

        <Button
          style={{ margin: 20, backgroundColor: colors.primary }}
          full
          onPress={() => props.navigation.navigate("Vendors")}
        >
          <Text>SEE VENDORS</Text>
        </Button>
      </View>
    </View>
  );
};

export default DeliveryLocation;
