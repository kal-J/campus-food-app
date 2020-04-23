import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import { newOrder } from "../redux/actions";
import colors from "../layouts/colors";
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Text,
  Card,
  CardItem,
  ListItem,
  CheckBox,
} from "native-base";

import { View, Image, Alert, StyleSheet, Dimensions } from "react-native";

const fullWidth = Dimensions.get('window').width; //full width
// class component so as to use callbacks when setting state
class Order extends Component {
  state = {
    checked: {},
    order: {
      vendor: this.props.redux_state.vendor,
      price: this.props.selected_menu_item.price,
      name: this.props.selected_menu_item.name,
      image: this.props.selected_menu_item.image,
      quantity: 1,
      inclusives: {},
    },
    selected_menu_item: this.props.selected_menu_item,
  };

  render() {
    if (this.state.selected_menu_item === null) {
      return this.props.navigation.navigate("Menus");
    }
    const {
      name,
      image,
      price,
      description,
      options,
    } = this.state.selected_menu_item;

    return (
      <Container style={{ flex: 1 }}>
        <View style={styles.arrange_front}>
          <Header
            style={{ width: fullWidth, backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <Left>
              <Button transparent onPress={() => this.props.setMenuItem(null)}>
                <Icon name="close" style={{ color: colors.dark }} />
              </Button>
            </Left>
            <Body />

            <Right />
          </Header>
        </View>
        <View style={{ zIndex: -1 }}>
          <Card>
            <CardItem cardBody>
              <Image source={image} style={{ height: 150, width: "100%" }} />
            </CardItem>
            <CardItem>
              <Left>
                <Text>{name}</Text>
              </Left>
              <Body />
              <Right>
                <Text>{`UGX ${price}`}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>{description}</Text>
              </Left>
            </CardItem>
          </Card>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              marginVertical: 10,
              color: colors.light,
              marginHorizontal: "25%",
            }}
          >
            Choose any 2 Inclusives
          </Text>

          {options.map((option, index) => (
            <ListItem key={index}>
              <CheckBox
                color={colors.primary}
                checked={this.state.checked[index]}
                onPress={() => {
                  if (this.state.checked[index] === undefined) {
                    this.setState(
                      {
                        ...this.state,
                        checked: { ...this.state.checked, [index]: true },

                        order: {
                          ...this.state.order,
                          inclusives: {
                            ...this.state.order.inclusives,
                            [index]: { name: option.name, price: option.price },
                          },
                        },
                      },
                      () => {
                        this.setState({
                          ...this.state,
                          order: {
                            ...this.state.order,
                            price:
                              parseInt(this.state.order.price) +
                              parseInt(
                                this.state.order.inclusives[index].price
                              ),
                          },
                        });
                      }
                    );
                  } else if (this.state.checked[index]) {
                    this.setState({
                      ...this.state,
                      checked: { ...this.state.checked, [index]: false },
                      order: {
                        ...this.state.order,
                        price:
                          parseInt(this.state.order.price) -
                          parseInt(this.state.order.inclusives[index].price),
                        inclusives: {
                          ...this.state.order.inclusives,
                          [index]: {},
                        },
                      },
                    });
                  } else {
                    this.setState(
                      {
                        ...this.state,
                        checked: { ...this.state.checked, [index]: true },

                        order: {
                          ...this.state.order,
                          inclusives: {
                            ...this.state.order.inclusives,
                            [index]: { name: option.name, price: option.price },
                          },
                        },
                      },
                      () => {
                        this.setState({
                          ...this.state,
                          order: {
                            ...this.state.order,
                            price:
                              parseInt(this.state.order.price) +
                              parseInt(
                                this.state.order.inclusives[index].price
                              ),
                          },
                        });
                      }
                    );
                  }
                }}
              />
              <Body>
                <Text>{option.name}</Text>
              </Body>
              <Right>
                <Text>{`+${option.price}`}</Text>
              </Right>
            </ListItem>
          ))}
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", marginVertical: 50 }}
        >
          <View style={styles.footer}>
            <Button
              bordered
              transparent
              onPress={() => {
                if (this.state.order.quantity > 1) {
                  this.setState({
                    ...this.state,
                    order: {
                      ...this.state.order,
                      quantity: this.state.order.quantity - 1,
                    },
                  });
                }
              }}
            >
              <Text style={styles.footer_btn_txt}>-</Text>
            </Button>
            <Text style={styles.footer_btn_txt}>
              {this.state.order.quantity}
            </Text>
            <Button
              bordered
              transparent
              onPress={() => {
                this.setState({
                  ...this.state,
                  order: {
                    ...this.state.order,
                    quantity: this.state.order.quantity + 1,
                  },
                });
              }}
            >
              <Text style={styles.footer_btn_txt}>+</Text>
            </Button>
            <Button
              style={styles.footer_btn}
              onPress={() => {
                if (this.state.order) {
                  this.props.newOrder(this.state.order);
                  Alert.alert(
                    "SUCCESS",
                    "Item added to your cart",
                    [
                      {
                        text: "CONTINUE SHOPPING",
                        onPress: () => this.props.setMenuItem(null),
                      },
                      {
                        text: "CHECKOUT",
                        onPress: () => {
                          this.props.setMenuItem(null);
                          this.props.navigation.navigate("Cart");
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }
              }}
            >
              <Text>ADD TO CART</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  arrange_front: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footer_btn: {
    backgroundColor: colors.primary,
  },
  footer_btn_txt: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default connect(mapStateToProps, { newOrder })(Order);
