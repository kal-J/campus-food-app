import React from "react";
import { changeCampus, changePickupPoint } from "../redux/actions";
import { View, Text, Picker } from "react-native";
import colors from "../layouts/colors";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
const LocationInput = (props) => {
  const PickupPoints = props.PickupPoints
  return (
    <View style={{ margin: "10%" }}>
      <View
        style={{
          borderBottomWidth: 2,
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Text style={{ color: colors.light }}>Select your campus</Text>
        <Picker
          mode="dropdown"
          selectedValue={props.redux_state.campus}
          onValueChange={(value) => {
            props.changeCampus(value);
            props.changePickupPoint(PickupPoints[value][0]);
          }}
        >
          {Object.keys(PickupPoints).map((value, index) => {
            return <Picker.Item label={value} value={value} key={index} />;
          })}
        </Picker>
      </View>
      <View
        style={{
          borderBottomWidth: 2,
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Text style={{ color: colors.light }}>Select your Pickup point</Text>
        <Picker
          mode="dropdown"
          selectedValue={props.redux_state.pickupPoint}
          onValueChange={(value) => {
            props.changePickupPoint(value);
          }}
        >
          {PickupPoints[props.redux_state.campus].map((value, index) => {
            return <Picker.Item label={value} value={value} key={index} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, { changeCampus, changePickupPoint })(
  LocationInput
);
