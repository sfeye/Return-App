import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import PreviousJobCard from "../components/PreviousJobCard";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

const Previous = () => {
  const [pjob, setPjob] = useState(null);
  const userEmail = useSelector((state) => state.userReducer.user.email);

  useEffect(() => {
    firebase
      .firestore()
      .collection("jobArchive")
      .where("email", "==", userEmail)
      .orderBy("datetime", "desc")
      .onSnapshot((snapshot) => {
        setPjob(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            job: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <View>
      {pjob ? (
        pjob.map(({ id, job }) => (
          <PreviousJobCard
            key={id}
            cost={job.cost}
            datetime={job.datetime}
            pickup={job.pickup}
            dropoff={job.dropoff}
            driverName={job.driverName}
            driverId={job.driverId}
            status={job.status}
          />
        ))
      ) : (
        <ActivityIndicator color="black" size="large" />
      )}
    </View>
  );
};

export default Previous;

const styles = StyleSheet.create({});
