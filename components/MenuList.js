import React from 'react';
import { MENU } from "../dummy_data/menu";
import { FlatList, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const MenuList = (props) => {
    if (props.type == "BREAKFAST") {
        return (
          <FlatList
            data={MENU.BREAKFAST}
            keyExtractor={(item) => `${item.itemId}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  props.setMenuItem({
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    description: item.description,
                    options: item.options,
                  })
                }
              >
                <View style={styles.mealItem}>
                  <Image source={item.image} style={{ height: 75, width: 100 }} />
                  <View style={styles.meal_details}>
                    <Text style={styles.meal_name}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      } else if (props.type === "LUNCH") {
        return (
          <FlatList
            data={MENU.LUNCH}
            keyExtractor={(item) => `${item.itemId}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  props.setMenuItem({
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    description: item.description,
                    options: item.options,
                  })
                }
              >
                <View style={styles.mealItem}>
                  <Image source={item.image} style={{ height: 75, width: 100 }} />
                  <View style={styles.meal_details}>
                    <Text style={styles.meal_name}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      } else if (props.type === "SUPPER") {
        return (
          <FlatList
            data={MENU.SUPPER}
            keyExtractor={(item) => `${item.itemId}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  props.setMenuItem({
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    description: item.description,
                    options: item.options,
                  })
                }
              >
                <View style={styles.mealItem}>
                  <Image source={item.image} style={{ height: 75, width: 100 }} />
                  <View style={styles.meal_details}>
                    <Text style={styles.meal_name}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      }
}

const styles = StyleSheet.create({
    mealItem: {
      marginHorizontal: 20,
      marginTop: 20,
      flexDirection: "row",
      paddingBottom: 5,
      borderBottomWidth: 0.3,
    },
    meal_details: {
      flexDirection: "column",
      justifyContent: "flex-end",
      marginLeft: 20,
    },
    meal_name: {
      fontWeight: "bold",
      marginBottom: 10,
    },
  });

export default MenuList;