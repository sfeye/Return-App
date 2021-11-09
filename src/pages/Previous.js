import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
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
            pickup={job.pickup}
            dropoff={job.dropoff}
            driverName={job.driverName}
            driverId={job.driverId}
            status={job.status}
          />
        ))
      ) : (
        <React.Fragment />
      )}
    </View>
  );
};

export default Previous;

const styles = StyleSheet.create({});
