import React from "react";
import { Button, Text, Icon } from "native-base";
import { View, Image, StyleSheet } from "react-native";
import colors from "../layouts/colors";
import { thousands_separator } from "../utils/number_formatter";

const OrderItem = (props) => {
  const { order } = props;
  return (
    <View style={[{ borderRadius: 10, paddingVertical: 10 }, styles.shadow]}>
      <View style={{ marginVertical: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 30,
          }}
        >
          <Text>{`Order No: ${order.orderNumber}`}</Text>
          <Text
            style={{ color: colors.primary, fontSize: 20, fontWeight: "bold" }}
          >{`UGX ${thousands_separator(order.totalPrice)}`}</Text>
        </View>

        <Text
          style={{
            color: colors.primary,
            marginHorizontal: 30,
            padding: 10,
            fontWeight: "bold",
          }}
        >
          {order.status}
        </Text>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 20,
            padding: 10,
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
          }}
        >
          {order.items.map((item, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Text>{item.name}</Text>
                <Text>{item.quantity}</Text>
                <Text>{item.price}</Text>
              </View>
            );
          })}
          
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
        }}
      >
        <Button bordered style={{ borderColor: colors.light }}>
          <Text style={{ color: colors.light }}>cancel order</Text>
        </Button>
        <Button bordered style={{ borderColor: colors.primary }}>
          <Text style={{ color: colors.primary }}>track order</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cart_btn_txt: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default OrderItem;
