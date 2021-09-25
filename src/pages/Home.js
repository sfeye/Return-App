import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeUser,
  updateUserLocation,
} from "../store/actions/userActions";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
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
  const [region, setRegion] = useState(null);
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
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View>
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
      </View>
      <View>
        {region ? (
          <MapView
            style={{ height: 300, width: Dimensions.get("window").width }}
            region={region}
            onRegionChange={setRegion}
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            />
          </MapView>
        ) : (
          <React.Fragment />
        )}
      </View>
    </View>
  );
};

export default Home;
