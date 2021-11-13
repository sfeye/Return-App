import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import firebase from "firebase";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const id = useSelector(state => state.userReducer.id);

  let user = firebase.auth().currentUser;

  const onPasswordSubmit = () => {
    user.updatePassword(password).then(
      () => {
        // Update successful.
        alert("Success");
      },
      error => {
        // An error happened.
        alert(error);
      }
    );
  };

  const onAddressSubmit = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        address: address
      })
      .then(
        () => {
          // Update successful.
          alert("Success");
        },
        error => {
          // An error happened.
          alert(error);
        }
      );
  };

  const onNameSubmit = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        name: name
      })
      .then(
        () => {
          // Update successful.
          alert("Success");
        },
        error => {
          // An error happened.
          alert(error);
        }
      );
  };

  const onPhoneSubmit = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        phone: phone
      })
      .then(
        () => {
          // Update successful.
          alert("Success");
        },
        error => {
          // An error happened.
          alert(error);
        }
      );
  };

  const onEmailSubmit = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        email: email
      });

    user.updateEmail(email).then(
      () => {
        // Update successful.
        alert("Success");
      },
      error => {
        // An error happened.
        alert(error);
      }
    );
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

      <TouchableOpacity onPress={() => onEmailSubmit()}>
        <Text style={styles.forgotPassword}>Change Email?</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        type="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={() => onPasswordSubmit()}>
        <Text style={styles.forgotPassword}>Change Password?</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Address"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity onPress={() => onAddressSubmit()}>
        <Text style={styles.forgotPassword}>Change Address?</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="First and Last Name"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity onPress={() => onNameSubmit()}>
        <Text style={styles.forgotPassword}>Change Name?</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Phone Number"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity onPress={() => onPhoneSubmit()}>
        <Text style={styles.forgotPassword}>Change Phone Number?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

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
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "center"
  },
  newUser: {
    justifyContent: "center",
    alignItems: "center"
  }
});
