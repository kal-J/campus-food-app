import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import colors from "../layouts/colors";
import Vendor from "../components/Vendor";
import { View, FlatList } from "react-native";
import { VENDORS } from "../dummy_data/vendors";
import { mapStateToProps } from "../redux/mapStateToProps";
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  Body,
  Text,
} from "native-base";

const Vendors = (props) => {
  const [vendors, setVendors] = useState();
  useEffect(() => {
    setVendors(
      VENDORS.filter((vendor, index) =>
        vendor.delivers_to.find(
          (val) => val.campus === props.redux_state.campus
        )
      )
    );
  }, [props.redux_state.campus]);
  
  // return loading screen if not done fetching vendors
  return (
    <Container>
      <Header style={{ backgroundColor: colors.primary }}>
        <Left>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Text
            
          >
            <Title style={{ fontSize: 12 }}>
              {`Delivery to ${props.redux_state.campus}`}
            </Title>
            
            </Text>
          <Text >
            <Title style={{ fontSize: 12 }}>
              {props.redux_state.pickupPoint}
            </Title>
            
          </Text>
        </Body>
        <Right style={{ marginRight: "10%" }}>
          <Icon name="search" style={{ color: "white" }} />
        </Right>
      </Header>
      <View style={{ alignItems: "center" }}>
        <Text>All vendors</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={vendors}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Vendor
              key={item.id}
              vendorName={item.name}
              image={item.image}
              rating={item.rating}
              navigation={props.navigation}
            />
          )}
        />
      </View>
    </Container>
  );
};

export default connect(mapStateToProps)(Vendors);
