import React, { useState } from "react";
import { Card, Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import DriverOverlay from "./DriverOverlay";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const PreviousJobCard = ({
  datetime,
  pickup,
  dropoff,
  driverName,
  driverId,
  status,
  cost,
}) => {
  const [toggle, setToggle] = useState(false);

  var dt = new Date(datetime.seconds * 1000);
  return (
    <View>
      <Card>
        <Card.Title>
          {moment(dt).format("lll")} - {status}
        </Card.Title>
        <Card.Divider />
        <Text>Pickup from: {pickup}</Text>
        <Text>Dropoff to: {dropoff}</Text>
        <Text>Cost: ${cost}</Text>
        <Button
          title={driverName}
          icon={
            <Ionicons name="person-circle-outline" size={30} color={"white"} />
          }
          onPress={(e) => setToggle(true)}
        ></Button>
        <DriverOverlay
          driverId={driverId}
          driverName={driverName}
          toggle={toggle}
          setToggle={setToggle}
        />
      </Card>
    </View>
  );
};

export default PreviousJobCard;

const styles = StyleSheet.create({});
