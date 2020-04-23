import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateCart } from "../redux/actions";
import { mapStateToProps } from "../redux/mapStateToProps";
import colors from "../layouts/colors";
import {thousands_separator} from '../utils/number_formatter';
import { View, Alert, StyleSheet, ScrollView } from "react-native";
import CartItem from "../components/CartItem";
import NavHeader from "../components/NavHeader";
import {
  Container,
  Header,
  Icon,
  Left,
  Button,
  Body,
  Right,
  Text,
} from "native-base";


const Cart = (props) => {
  const [deliveryFee, setDeliveryFee] = useState(
    props.redux_state.delivery_fee
  );
  const [orders, setOrders] = useState(props.redux_state.orders);
  const [totalPrice, setTotalPrice] = useState(
    (() => {
      let total = 0;
      orders.map((order, index) => {
        total = total + parseInt(order.price * order.quantity);
      });
      return total + props.redux_state.delivery_fee;
    })()
  );

  useEffect(() => {
    setOrders(props.redux_state.orders);
    setTotalPrice(
      (() => {
        let total = 0;
        props.redux_state.orders.map((order, index) => {
          total = total + parseInt(order.price * order.quantity);
        });
        return total + props.redux_state.delivery_fee;
      })()
    );
  }, [props.redux_state]);

  

  if (orders.length === 0) {
    return (
      <Container>
        <NavHeader
          title="Cart"
          icon="arrow-back"
          onPressCallback={() => props.navigation.navigate("Menu")}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <Text>Your cart is empty !!</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            width: 100,
            backgroundColor: colors.primary,
            borderRadius: 50,
            alignSelf: "center",
            marginVertical: 20,
          }}
        >
          <Icon name="cart" style={{ color: "#fff" }} />
        </View>
        <View>
          <Button
            style={{
              justifyContent: "center",
              backgroundColor: colors.primary,
              margin: 20,
            }}
            onPress={() => props.navigation.navigate("Vendors")}
          >
            <Text>Go shop some stuff</Text>
          </Button>
        </View>
      </Container>
    );
  }

  return (
    <Container style={{ flex: 1 }}>
      <NavHeader
        title="Cart"
        icon="arrow-back"
        onPressCallback={() => props.navigation.navigate("Menu")}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        indicatorStyle="black"
      >
        {orders.map((item, index) => {
          return (
            <CartItem
              key={index}
              name={item.name}
              image={item.image}
              inclusives={item.inclusives}
              price={item.price}
              thousands_separator={thousands_separator}
              setTotalPrice={setTotalPrice}
              totalPrice={parseInt(totalPrice)}
              quantity={item.quantity}
              id={index}
              updateCart={(order) => {
                orders.splice(index, 1, order);
                setOrders(orders);
                props.updateCart(orders);
              }}
              removeItem={() => {
                orders.splice(index, 1);
                setOrders(orders);
                props.updateCart(orders);
              }}
            />
          );
        })}
      </ScrollView>

      <View style={[{ borderRadius: 10, padding: 30 }, styles.shadow]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 0.5,
            paddingBottom: 20,
          }}
        >
          <Text>Delivery fee</Text>
          <Text>{thousands_separator(deliveryFee)}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold", color: colors.primary }}>
            Total
          </Text>
          <Text
            style={{ fontWeight: "bold", color: colors.primary }}
          >{`UGX ${thousands_separator(totalPrice)}`}</Text>
        </View>
        <Button
          style={{
            justifyContent: "center",
            backgroundColor: colors.primary,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => {
            Alert.alert(
              "Confirm Delivery Location",
              `Your order will be delivered to ${props.redux_state.campus} at ${props.redux_state.pickupPoint}`,
              [
                {
                  text: "Change Delivery location",
                  onPress: () => {
                    Alert.alert(
                      "warning",
                      "changing delivery location will discard all items in your cart",
                      [
                        {
                          text: "continue",
                          onPress: () => {
                            props.updateCart([]);
                            props.navigation.navigate("Location");
                          },
                        },
                        {
                          text: "cancel",
                          onPress: () => props.navigation.navigate("Cart"),
                        },
                      ]
                    );
                  },
                },
                {
                  text: "continue",
                  onPress: () => {
                    props.navigation.navigate({
                      routeName: "Payment",
                      params: {
                        totalPrice: totalPrice
                      }
                    });
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text>COMPLETE YOUR ORDER</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",

    shadowOpacity: 0.1,
    elevation: 1,
  },
});

export default connect(mapStateToProps, { updateCart })(Cart);
