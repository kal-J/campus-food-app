import React from "react";
import { View } from "react-native";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import colors from "../layouts/colors";
const ScrollTabs = (props) => {
  return (
    <Container>
      <Tabs
        
        renderTabBar={() => (
          <ScrollableTab style={{backgroundColor: colors.primary}} />
        )}
      >
        {props.children}
      </Tabs>
    </Container>
  );
};

export default ScrollTabs;
