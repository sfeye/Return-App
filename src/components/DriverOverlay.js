import React, { useState, useEffect } from "react";
import { Overlay } from "react-native-elements";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import firebase from "firebase";

const DriverOverlay = ({ driverId, driverName, toggle, setToggle }) => {
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("drivers")
      .doc(driverId)
      .get()
      .then((res) => {
        setDriver(res.data());
      });
    setLoading(false);
  }, []);

  return (
    <Overlay isVisible={toggle} onBackdropPress={setToggle}>
      <Text>{driverName}</Text>
      {loading ? (
        <ActivityIndicator color="black" size="large" />
      ) : driver ? (
        <View>
          <Text>
            Vehicle: {driver.vehicle.make} {driver.vehicle.model}{" "}
            {driver.vehicle.color}
          </Text>
          <Text>Phone: {driver.phone}</Text>
        </View>
      ) : (
        <React.Fragment />
      )}
    </Overlay>
  );
};

export default DriverOverlay;

const styles = StyleSheet.create({});
