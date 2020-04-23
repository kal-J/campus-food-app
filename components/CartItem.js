import React, { useState } from "react";
import colors from "../layouts/colors";
import { View, Image, StyleSheet } from "react-native";
import { Icon, Button, Text } from "native-base";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const {
    image,
    name,
    price,
    inclusives,
    updateCart,
    setTotalPrice,
    totalPrice,
    thousands_separator,
  } = props;
  return (
    <View style={[{ borderRadius: 10, padding: 30 }, styles.shadow]}>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Image style={{ height: 70, width: 70 }} source={image} />

        <View
          style={{ alignItems: "flex-start", justifyContent: "space-around" }}
        >
          <Text>{name}</Text>
          <Text>{thousands_separator(price)}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          bordered
          style={{ borderColor: colors.light }}
          onPress={props.removeItem}
        >
          <Icon name="trash" style={{ color: colors.light }} />
          <Text style={{ color: colors.light }}>REMOVE</Text>
        </Button>
        <Button
          rounded
          style={{ backgroundColor: colors.primary }}
          onPress={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
              setTotalPrice(totalPrice - price);
              const order = {
                name,
                price,
                image,
                quantity: quantity - 1,
                inclusives,
              };
              updateCart(order);
            }
          }}
        >
          <Text style={styles.cart_btn_txt}>-</Text>
        </Button>

        <View
          style={{ alignItems: "center", borderBottomWidth: 0.5, width: 50 }}
        >
          <Text style={[styles.cart_btn_txt, { color: "#000" }]}>
            {quantity}
          </Text>
        </View>

        <Button
          rounded
          style={{ backgroundColor: colors.primary }}
          onPress={() => {
            {
              setQuantity(quantity + 1);
              setTotalPrice(parseInt(totalPrice) + parseInt(price));
              const order = {
                name,
                price,
                image,
                quantity: quantity + 1,
                inclusives,
              };
              updateCart(order);
            }
          }}
        >
          <Text style={styles.cart_btn_txt}>+</Text>
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
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
});

/* 
shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 1
  },
 */

export default CartItem;
