import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const resetpwd = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then()
      .catch((error) => {
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

      <TouchableOpacity style={styles.submitButton} onPress={() => resetpwd()}>
        <Text style={styles.submitButtonText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 50,
    borderColor: "#0000FF",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#0000FF",
    padding: 10,
    margin: 15,
    height: 50,
  },
  submitButtonText: {
    color: "white",
  },
});

export default ForgotPassword;
