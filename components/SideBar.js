import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import { Image, View } from "react-native";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Right,
  Body,
} from "native-base";
import colors from "../layouts/colors";
const routes = ["Location", "Vendors", "Orders", "Cart", "Account", "Signup", "Restaurant"];
const SideBar = (props) => {
  const [headerImage, setHeaderImage] = useState();
  useEffect(() => {
    const user_state = props.redux_state.user;
    if (user_state.isLoggedin) {
      const user = jwt_decode(user_state.auth0_credentials.idToken);
      setHeaderImage({ uri: user.picture });
    } else {
      setHeaderImage(require("../assets/icon.png"));
    }
  });
  return (
    <Container>
      <View style={{ flex: 1, padding: 30, backgroundColor: colors.primary }}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              width: 140,
              height: 140,
              borderRadius: 70,
            }}
          >
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={headerImage}
            />
          </View>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <List
            dataArray={routes}
            keyExtractor={(data) => data}
            renderRow={(data) => {
              return (
                <ListItem
                  button
                  onPress={() => props.navigation.navigate(data)}
                >
                  <Text style={{ color: "#fff" }}>{data}</Text>
                </ListItem>
              );
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default connect(mapStateToProps)(SideBar);
