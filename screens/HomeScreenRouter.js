import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Cart from "./Cart";
import Vendors from "./Vendors";
import Menu from "./Menu";
import Orders from "./Orders";
import Payment from "./Payment";
import SideBar from "../components/SideBar";
import Account from "./Account";
import DeliveryLocation from "./DeliveryLocation";

const HomeScreenRouter = createDrawerNavigator(
  {
    Location: { screen: DeliveryLocation },
    Vendors: { screen: Vendors },
    Cart: { screen: Cart },
    Account: { screen: Account },
    Menu: { screen: Menu },
    Orders: { screen: Orders },
    Payment: { screen: Payment },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    initialRouteName: 'Location'
  }
);

export default createAppContainer(HomeScreenRouter);
