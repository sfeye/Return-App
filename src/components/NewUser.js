import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import firebase from "firebase";

const NewUser = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const adduser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // Signed in
        console.log(res);
        // ...
      })
      .catch(error => {
        alert(error);
      });

    firebase
      .firestore()
      .collection("users")
      .add({
        acceptedterms: true,
        address: "",
        billinginfo: "",
        isValid: true,
        name: "",
        phone: ""
      })
      .then(() => {
        alert("Success");
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        type="password"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => adduser(email, password)}
      >
        <Text style={styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 50,
    borderColor: "#0000FF",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#0000FF",
    padding: 10,
    margin: 15,
    height: 50
  },
  submitButtonText: {
    color: "white"
  }
});

export default NewUser;
