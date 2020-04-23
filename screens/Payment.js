import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
import NavHeader from "../components/NavHeader";
import colors from "../layouts/colors";
import { thousands_separator } from "../utils/number_formatter";
import { mapStateToProps } from "../redux/mapStateToProps";
import { placeOrder, updateCart } from "../redux/actions";
import { Text, Container, Radio, Button, Icon } from "native-base";

const Payment = (props) => {
  const [orderComplete, setOrderComplete] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
  const totalPrice = props.navigation.getParam("totalPrice");

  if (orderComplete !== null) {
    return (
      <Container>
        <NavHeader
          onPressCallback={() => {
            props.updateCart([]);
            setOrderComplete(null);
            props.navigation.navigate("Vendors");
          }}
          icon="close"
          title="Complete Order"
          navigation={props.navigation}
        />
        {Alert.alert(
          `Order with No. ${orderComplete.orderNumber} placed`,
          `Your Item(s) will be delivered to ${orderComplete.delivery_to.campus} at ${orderComplete.delivery_to.pickupPoint}`,
          [
            {
              text: "GO TO MY ORDERS",
              onPress: () => {
                setOrderComplete(null);
                props.navigation.navigate("Orders");
              },
            },
            {
              text: "CONTINUE SHOPPING",
              onPress: () => {
                setOrderComplete(null);
                props.navigation.navigate("Vendors");
              },
            },
          ],
          { cancelable: false }
        )}
        <View
          style={{
            alignSelf: "center",
            borderRadius: 50,
            width: 100,
            height: 100,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <Icon style={{ color: "#fff" }} name="md-checkmark" />
        </View>
      </Container>
    );
  }
  return (
    <Container>
      <NavHeader
        icon="arrow-back"
        navigation={props.navigation}
        onPressCallback={() => props.navigation.navigate("Cart")}
      />
      <View style={{ flex: 1, margin: 50 }}>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Radio
            color={colors.light}
            selectedColor={colors.primary}
            selected={true}
          />
          <Text style={{ marginLeft: 10 }}>Cash on Delivery</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Radio
            color={colors.light}
            selectedColor={colors.primary}
            selected={false}
          />
          <Text style={{ marginLeft: 10 }}>MTN momo</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <Text>{`Total : UGX ${thousands_separator(totalPrice)}`}</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button
            style={{
              justifyContent: "center",
              backgroundColor: colors.primary,
            }}
            onPress={() => {
              const order = {
                orderNumber: `${Date.now()}${Math.trunc(Math.random() * 9)}`,
                status: "pending approval",
                totalPrice: totalPrice,
                paymentMethod: paymentMethod,
                items: props.redux_state.orders,
                delivery_to: {
                  campus: props.redux_state.campus,
                  pickupPoint: props.redux_state.pickupPoint,
                },
                placed_at: new Date().toDateString(),
              };
              // this is where i will send my order to the database
              props.placeOrder(order);
              props.updateCart([]);
              setOrderComplete(order);
            }}
          >
            <Text>CONTINUE</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default connect(mapStateToProps, { placeOrder, updateCart })(Payment);
