import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { initializeJob } from "../store/actions/jobActions";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";

const RequestScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [activeCd, setActiveCd] = useState("Y");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const user = useSelector((state) => state.userReducer.user);

  const resetStateVars = () => {
    setFromLocation(null);
    setToLocation(null);
    setRequestType("");
    setDate(new Date());
    setTime(new Date());
    setShow(false);
    setMode("date");
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    mode === "date" ? setDate(currentDate) : setTime(currentDate);
  };
  //show mode for date and time
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  const createNewJobRequest = () => {
    const dateTimeProvided = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds()
    );

    firebase
      .firestore()
      .collection("jobs")
      .add({
        dropOffLatitude: toLocation.latitude,
        dropOffLongitude: toLocation.longitude,
        pickupLatitude: fromLocation.latitude,
        pickupLongitude: fromLocation.longitude,
        dropOffAddress: toLocation.address,
        pickupAddress: fromLocation.address,
        time: dateTimeProvided,
        accepted: false,
        completed: false,
        driverLocation: "",
        driverName: "",
        driverPhone: "",
        userName: user.name,
        userPhone: user.phone,
        email: user.email,
        activeCd: "Y",
        task: requestType,
      })
      .then((ref) => {
        alert("Request Created!");
        dispatch(
          initializeJob(
            ref.id,
            toLocation,
            fromLocation,
            dateTimeProvided,
            user.name,
            user.phone,
            activeCd,
            requestType
          )
        );
        resetStateVars();
        navigation.pop();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="From"
          minLength={2}
          autoFocus={true}
          returnKeyType={"search"}
          keyboardAppearance={"light"}
          listViewDisplayed={"auto"}
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details.geometry.location.lat);
            setFromLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: details.formatted_address,
            });
          }}
          getDefaultValue={() => ""}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              width: "100%",
              marginTop: 10,
            },
            listView: {
              borderColor: "#c8c7cc",
              borderWidth: 1,
              borderRadius: 2,
            },
            textInputContainer: {
              backgroundColor: "transparent",
              margin: 0,
              width: "100%",
              padding: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              backgroundColor: "#F9F5F4",
              borderRadius: 50,
              width: "100%",
              height: 50,
              padding: 20,
            },
            description: {
              fontWeight: "300",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
          //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          nearbyPlacesAPI="GooglePlacesSearch"
          enablePoweredByContainer={true}
          debounce={200}
        />
      </View>
      <View>
        <GooglePlacesAutocomplete
          placeholder="To"
          minLength={2}
          autoFocus={false}
          returnKeyType={"search"}
          keyboardAppearance={"light"}
          listViewDisplayed={"auto"}
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setToLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: details.formatted_address,
            });
          }}
          getDefaultValue={() => "123 Main St New York, NY 111234"}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              width: "100%",
              marginTop: 10,
            },
            listView: {
              borderColor: "#c8c7cc",
              borderWidth: 1,
              borderRadius: 2,
            },
            textInputContainer: {
              backgroundColor: "transparent",
              margin: 0,
              width: "100%",
              padding: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              backgroundColor: "#F9F5F4",
              borderRadius: 50,
              width: "100%",
              height: 50,
              padding: 20,
            },
            description: {
              fontWeight: "300",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
          //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          nearbyPlacesAPI="GooglePlacesSearch"
          enablePoweredByContainer={true}
          debounce={200}
        />
      </View>
      <View>
        <View>
          <Input
            onChangeText={setRequestType}
            value={requestType}
            placeholder="Task to be done"
          />
        </View>
        <View>
          <Button title="Pick a date" raised onPress={() => showDatepicker()} />
          <Button title="Pick a time" raised onPress={() => showTimePicker()} />
        </View>
        <View>
          {show && (
            <DateTimePicker
              testID="datePicker"
              value={mode === "date" ? date : time}
              mode={mode}
              is24hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
      </View>
      <View>
        <Button title="Submit" raised onPress={() => createNewJobRequest()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
  },
});

export default RequestScreen;
