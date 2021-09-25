import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon } from "react-native-elements";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  location
    ? console.log(
        "User location is: " +
          location.coords.latitude +
          " long: " +
          location.coords.longitude
      )
    : console.log("error message: " + errorMsg);

  return (
    <View>
      <Button
        icon={
          <Ionicons
            name="add-circle"
            size={20}
            color={"white"}
            style={{ marginRight: 5 }}
          />
        }
        title="New Request ? "
        onPress={() => navigation.push("RequestScreen")}
      />

      {location ? (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onRegionChange={setRegion}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      ) : (
        React.Fragment
      )}
    </View>
  );
};

export default Home;
