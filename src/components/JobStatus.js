import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { resetJob } from "../store/actions/jobActions";
import { Button } from "react-native-elements";
import firebase from "firebase";
import moment from "moment";

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
            <Text>Time: {moment(time).format("MMMM Do YYYY, h:mm:ss a")}</Text>
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
