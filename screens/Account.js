import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import { setUser } from "../redux/actions";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import NavHeader from "../components/NavHeader";
import { login, logout } from "../auth/Auth";
import {
  Container,
  Card,
  CardItem,
  Content,
  Right,
  Icon,
  Button,
  Text,
} from "native-base";
import colors from "../layouts/colors";

const Account = (props) => {
  const [loggedin, setloggedin] = useState(props.redux_state.user.isLoggedin);
  const [isloading, setIsloading] = useState(false);

  if (isloading) {
    return (
      <View style={styles.isloading}>
        <Text style={{color: "#fff"}}>Loading...</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  if (loggedin &&  props.redux_state.user.auth0_credentials !== null) {
    const idToken = props.redux_state.user.auth0_credentials.idToken;
    const user = jwt_decode(idToken);
    return (
      <Container>
        <NavHeader navigation={props.navigation} />
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: user.picture }}
              style={{ width: 140, height: 140, borderRadius: 70, margin: 20 }}
            />
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              full
              style={{ backgroundColor: colors.primary, margin: 40 }}
              onPress={() => {
                setIsloading(true);
                logout(props.setUser, setloggedin, setIsloading);
              }}
            >
              <Text>LOGOUT</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
  return (
    <Container>
      <NavHeader navigation={props.navigation} />

      <View style={{ flex: 1 }}>
        <Button
          full
          style={{ backgroundColor: colors.primary, margin: 50 }}
          onPress={() => {
            setIsloading(true);
            login(props.setUser, setloggedin, setIsloading);
          }}
        >
          <Text>SIGN IN TO CONTINUE</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  isloading: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, { setUser })(Account);
