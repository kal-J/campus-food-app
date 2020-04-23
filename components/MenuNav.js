import React from "react";
import colors from "../layouts/colors";
import Vendor from "./Vendor";
import MenuList from "./MenuList";
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Tab,
} from "native-base";

import { View, StyleSheet, Dimensions } from "react-native";
import ScrollTabs from "./ScrollTabs";

const fullWidth = Dimensions.get('window').width; //full width
const MenuNav = (props) => {
  const { name, image, rating } = props;
  return (
    <Container style={{ flex: 1 }}>
      <View style={styles.arrange_front}>
        <Header
          style={{ width: fullWidth, backgroundColor: "rgba(255,255,255,0.5)" }}
        >
          <Left>
            <Button
              transparent
              onPress={() => {
                props.navigation.navigate("Vendors");
              }}
            >
              <Icon name="arrow-back" style={{ color: colors.dark }} />
            </Button>
          </Left>
          <Body />

          <Right style={{ marginRight: "10%" }}>
            <View style={styles.circle_icon}>
              <Icon name="information" style={{ color: colors.light }} />
            </View>
          </Right>
        </Header>
      </View>
      <View style={{ zIndex: -1 }}>
        <Vendor vendorName={name} image={image} rating={rating} height={150} />
      </View>
      <ScrollTabs navigation={props.navigation}>
        <Tab
          tabStyle={{ backgroundColor: colors.primary }}
          activeTabStyle={{ backgroundColor: colors.primary }}
          heading="BreakFast"
        >
          <MenuList setMenuItem={props.setMenuItem} type="BREAKFAST" />
        </Tab>

        <Tab
          tabStyle={{ backgroundColor: colors.primary }}
          activeTabStyle={{ backgroundColor: colors.primary }}
          heading="Lunch"
        >
          <MenuList setMenuItem={props.setMenuItem} type="LUNCH" />
        </Tab>

        <Tab
          tabStyle={{ backgroundColor: colors.primary }}
          activeTabStyle={{ backgroundColor: colors.primary }}
          heading="supper"
        >
          <MenuList setMenuItem={props.setMenuItem} type="SUPPER" />
        </Tab>
      </ScrollTabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  circle_icon: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  arrange_front: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});

export default MenuNav;
