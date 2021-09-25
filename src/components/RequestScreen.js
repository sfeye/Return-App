import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";

const RequestScreen = () => {
  const [fromLocation, setFromLoction] = useState(null);
  const [toLocation, setToLocation] = useState("");
  const [requestType, setRequestType] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const resetStateVars = () => {
    setFromLocation(null);
    setToLocation("");
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
        dropOff: toLocation,
        pickup: fromLocation,
        time: dateTimeProvided,
      })
      .then(() => {
        alert("Request Created!");
        resetStateVars();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View>
          <Input
            onChangeText={setFromLoction}
            value={fromLocation}
            placeholder="From ?"
          />
          <Input
            onChangeText={setToLocation}
            value={toLocation}
            placeholder="To ?"
          />
          <Input
            onChangeText={setRequestType}
            value={requestType}
            placeholder="Task to be done"
          />
        </View>
        <View>
          <View>
            <Button
              title="Pick a date"
              raised
              onPress={() => showDatepicker()}
            />
            <Button
              title="Pick a time"
              raised
              onPress={() => showTimePicker()}
            />
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RequestScreen;