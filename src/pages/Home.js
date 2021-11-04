import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeUser,
  updateUserLocation,
} from "../store/actions/userActions";
import { updateJob } from "../store/actions/jobActions";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon } from "react-native-elements";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import JobStatus from "../components/JobStatus";

const Home = ({ route, navigation }) => {
  // --------- Redux ----------- //
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.userReducer.location);
  const job = useSelector((state) => state.jobReducer);

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

    firebase
      .firestore()
      .collection("jobs")
      .where("email", "==", route.params.email)
      .where("activeCd", "==", "Y")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) =>
          dispatch(
            updateJob(
              doc.data().accepted,
              doc.data().completed,
              doc.data().driverName,
              doc.data().driverLocation,
              doc.data().driverPhone
            )
          )
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
          onPress={() => navigation.navigate("RequestScreen")}
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
              pinColor="red"
            />
            {job.activeCd === "Y" ? (
              <>
                <Marker
                  coordinate={{
                    latitude: job.pickup.latitude,
                    longitude: job.pickup.longitude,
                  }}
                  pinColor="black"
                ></Marker>
                <Marker
                  coordinate={{
                    latitude: job.dropOff.latitude,
                    longitude: job.dropOff.longitude,
                  }}
                  pinColor="green"
                ></Marker>
              </>
            ) : (
              React.Fragment
            )}
          </MapView>
        ) : (
          <ActivityIndicator color="black" size="large" />
        )}
      </View>
      <View style={{ paddingTop: 50 }}>
        {job.activeCd === "Y" ? (
          <JobStatus
            dropOff={job.dropOff}
            pickup={job.pickup}
            accepted={job.accepted}
            completed={job.completed}
            driverName={job.driverName}
            driverLocation={job.driverLocation}
            driverPhone={job.driverPhone}
            time={job.time}
          />
        ) : (
          React.Fragment
        )}
      </View>
      {job.activeCd === "Y" ? (
        <View>
          <Button
            transparent
            title="Edit Request"
            titleStyle={{ fontSize: 15, fontWeight: "600" }}
            onPress={() => navigation.navigate("EditJobRequest")}
            disabled={job.accepted ? true : false}
          />
        </View>
      ) : (
        React.Fragment
      )}
    </View>
  );
};

export default Home;
