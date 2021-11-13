import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateJobOnUpdate } from "../store/actions/jobActions";
import firebase from "firebase";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button, Input, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GOOGLE_PLACES_API_KEY } from "@env";

const EditJobRequest = () => {
  const dropOffRef = useRef();
  const pickupRef = useRef();
  const dispatch = useDispatch();

  const job = useSelector((state) => state.jobReducer);

  const [requestType, setRequestType] = useState(job.task);
  const [fromLocation, setFromLocation] = useState(
    job.pickup.latitude
      ? {
          latitude: job.pickup.latitude,
          longitude: job.pickup.longitude,
          address: job.pickup.address,
        }
      : null
  );
  const [toLocation, setToLocation] = useState(
    job.dropOff.latitude
      ? {
          latitude: job.dropOff.latitude,
          longitude: job.dropOff.latitude,
          address: job.dropOff.address,
        }
      : null
  );
  const [editDate, setEditDate] = useState(new Date(job.time));
  const [editTime, setEditTime] = useState(new Date(job.time));
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  useEffect(() => {
    dropOffRef.current.setAddressText(toLocation.address);
    pickupRef.current.setAddressText(fromLocation.address);
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || editDate;
    setShow(Platform.OS === "ios");
    mode === "date" ? setEditDate(currentDate) : setEditTime(currentDate);
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

  const updateJobRequest = () => {
    const dateTimeProvided = new Date(
      editDate.getFullYear(),
      editDate.getMonth(),
      editDate.getDate(),
      editTime.getHours(),
      editTime.getMinutes(),
      editTime.getSeconds(),
      editTime.getMilliseconds()
    );

    firebase
      .firestore()
      .collection("jobs")
      .doc(job.id)
      .update({
        dropOffLatitude: toLocation.latitude,
        dropOffLongitude: toLocation.longitude,
        dropOffAddress: toLocation.address,
        pickupLatitude: fromLocation.latitude,
        pickupLongitude: fromLocation.longitude,
        pickupAddress: fromLocation.address,
        task: requestType,
        time: dateTimeProvided,
      })
      .then(() => {
        alert("Request Updated");
        dispatch(
          updateJobOnUpdate(
            toLocation,
            fromLocation,
            dateTimeProvided,
            requestType
          )
        );
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
          ref={pickupRef}
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
          ref={dropOffRef}
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
              value={mode === "date" ? editDate : editTime}
              mode={mode}
              is24hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
      </View>
      <View>
        <Button
          title="Update"
          raised
          onPress={() => updateJobRequest()}
          disabled={job.accepted}
        />
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

export default EditJobRequest;
