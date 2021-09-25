import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeUser,
  updateUserLocation,
} from "../store/actions/userActions";
import { View, Text, StyleSheet, Keyboard, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon } from "react-native-elements";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const Home = ({ route, navigation }) => {
  // --------- Redux ----------- //
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.userReducer.location);
  // --------------------------- //

  // ------- Local State ------- //
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: userLocation.coords.latitude,
    longitude: userLocation.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // --------------------------- //

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", route.params.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) =>
          dispatch(initializeUser(doc.id, doc.data()))
        );
      });

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(updateUserLocation(location));
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

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

      {userLocation ? (
        <MapView style={{ flex: 1 }} region={region} onRegionChange={setRegion}>
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
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
