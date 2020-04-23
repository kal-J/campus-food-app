import React from "react";
import { connect } from "react-redux";
import { updateCart } from "../redux/actions";
import { mapStateToProps } from "../redux/mapStateToProps";
import ScrollTabs from "../components/ScrollTabs";
import NavHeader from "../components/NavHeader";
import colors from "../layouts/colors";
import OrderItem from "../components/OrderItem";
import { Tab, Container, Text, Button } from "native-base";
import { FlatList, View } from "react-native";

const Orders = (props) => {
  const orders = props.redux_state.ordersPlaced;
  const ongoing = orders.filter(
    (order, index) =>
      order.status !== "cancelled" && order.status !== "complete"
  );
  const past = orders.filter(
    (order, index) =>
      order.status === "cancelled" || order.status === "complete"
  );
  return (
    <Container>
      <NavHeader navigation={props.navigation} />
      <ScrollTabs navigation={props.navigation}>
        <Tab
          tabStyle={{ backgroundColor: colors.primary }}
          activeTabStyle={{ backgroundColor: colors.primary }}
          heading="Ongoing Orders"
        >
          {ongoing.length > 0 ? (
            <FlatList
              data={ongoing}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => {
                return(<OrderItem order={item} />);
                
              }}
            />
          ) : (
            <View>
              <Text
                style={{
                  color: colors.light,
                  alignSelf: "center",
                  marginVertical: 20,
                }}
              >
                No orders ongoing
              </Text>
              <Button
                style={{
                  backgroundColor: colors.primary,
                  margin: 50,
                  justifyContent: "center",
                }}
                onPress={() => props.navigation.navigate("Vendors")}
              >
                <Text>Order Now</Text>
              </Button>
            </View>
          )}
        </Tab>
        <Tab
          tabStyle={{ backgroundColor: colors.primary }}
          activeTabStyle={{ backgroundColor: colors.primary }}
          heading="Past Orders"
        >
          {past.length > 0 ? (
            <FlatList
              data={ongoing}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => {
                <OrderItem order={item} />;
              }}
            />
          ) : (
            <View>
              <Text
                style={{
                  color: colors.light,
                  alignSelf: "center",
                  marginVertical: 20,
                }}
              >
                oops! nothing here
              </Text>
              <Button
                style={{
                  backgroundColor: colors.primary,
                  margin: 50,
                  justifyContent: "center",
                }}
                onPress={() => props.navigation.navigate("Vendors")}
              >
                <Text>Order Now</Text>
              </Button>
            </View>
          )}
        </Tab>
      </ScrollTabs>
    </Container>
  );
};

export default connect(mapStateToProps)(Orders);
