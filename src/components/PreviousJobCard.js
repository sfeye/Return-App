import React from "react";
import { Card, Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";

const PreviousJobCard = (
  datetime,
  pickup,
  dropoff,
  driverName,
  driverId,
  status
) => {
  // TODO: refactor date time using moment js
  console.log(status);
  return (
    <View>
      <Card>
        <Text>{status}</Text>
        <Text></Text>
        <Text></Text>
      </Card>
    </View>
  );
};

export default PreviousJobCard;

const styles = StyleSheet.create({});
