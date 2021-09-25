import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";
import firebase from "firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        // Signed in
        console.log(res);
        // ...
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
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
        onPress={() => login(email, password)}
      >
        <Text style={styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
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
