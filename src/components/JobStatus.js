import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { resetJob } from "../store/actions/jobActions";
import { Button } from "react-native-elements";
import firebase from "firebase";

const JobStatus = ({
  dropOff,
  pickup,
  accepted,
  completed,
  driverName,
  driverLocation,
  driverPhone,
  time,
}) => {
  const dispatch = useDispatch();
  const docId = useSelector((state) => state.jobReducer.id);

  // Process date and time
  // function processDate(datetime) {
  //   var temp = new Date(datetime.seconds * 1000);
  //   return (
  //     temp.getMonth() + 1 + "/" + temp.getDate() + "/" + temp.getFullYear()
  //   );
  // }

  // function processTime(datetime) {
  //   var temp = new Date(datetime.seconds * 1000);
  //   return (
  //     processHour(temp.getHours()) +
  //     ":" +
  //     temp.getMinutes().toString().padEnd(2, "0") +
  //     " " +
  //     processAMPM(temp.getHours())
  //   );
  // }

  // function processHour(hour) {
  //   if (hour === "24") {
  //     return "12";
  //   } else if (hour < 13) {
  //     return hour;
  //   } else {
  //     return hour - 12;
  //   }
  // }

  // function processAMPM(hour) {
  //   if (hour === 12) {
  //     return "PM";
  //   } else if (hour === 24) {
  //     return "AM";
  //   } else if (hour < 13) {
  //     return "AM";
  //   } else {
  //     return "PM";
  //   }
  // }

  //------------------------------

  const cancelJob = () => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(docId)
      .delete()
      .then(() => {
        alert("Request has been cancelled");
        dispatch(resetJob());
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View>
      <View>
        {dropOff ? (
          <View>
            <Text>Dropoff:{dropOff.address}</Text>
            <Text>Pickup: {pickup.address}</Text>
            <Text>Time: {time.toString()}</Text>
          </View>
        ) : (
          React.Fragment
        )}

        {accepted ? (
          <View>
            <Text>Accepted: {accepted}</Text>
            <Text>Completed: {completed}</Text>
            <Text>Driver Name: {driverName}</Text>
            <Text>Driver Location: {driverLocation}</Text>
            <Text>Driver Phone: {driverPhone}</Text>
          </View>
        ) : (
          React.Fragment
        )}
      </View>
      <View>
        <Button
          transparent
          title="Cancel Request"
          titleStyle={{ fontSize: 15, fontWeight: "600" }}
          onPress={() => cancelJob()}
        />
      </View>
      {/* <View>
        <Button
          transparent
          title="Edit Request"
          titleStyle={{ fontSize: 15, fontWeight: "600" }}
          onPress={() => navigation.push("EditJobRequest")}
          disabled={accepted ? true : false}
        />
      </View> */}
    </View>
  );
};

export default JobStatus;
