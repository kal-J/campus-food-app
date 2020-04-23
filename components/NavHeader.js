import React from "react";
import colors from "../layouts/colors";
import { Header, Left, Button, Icon, Body, Title } from "native-base";

const NavHeader = (props) => {
  const navTitle = props.hasOwnProperty("title")
    ? props.title
    : props.navigation.state.routeName;
  const navIcon = props.hasOwnProperty("icon") ? props.icon : "menu";
  const onPressCallback = props.hasOwnProperty("onPressCallback")
    ? props.onPressCallback
    : () => props.navigation.openDrawer();
  return (
    <Header style={{ backgroundColor: colors.primary }}>
      <Left>
        <Button transparent onPress={onPressCallback}>
          <Icon name={navIcon} />
        </Button>
      </Left>
      <Body>
        <Title>{navTitle}</Title>
      </Body>
    </Header>
  );
};

export default NavHeader;
