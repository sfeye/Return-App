import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import firebase from "firebase";

const NewUser = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [billinginfo, setBillinginfo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [isValid, setIsvalid] = useState(false);
  const [acceptedterms, setAcceptedterms] = useState(false);

  const adduser = (
    email,
    password,
    name,
    phone,
    billinginfo,
    address,
    acceptedterms
  ) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        email,
        password //,
        //name,
        //phone,
        //billinginfo,
        //address,
        // acceptedterms
        // bug here can I use this to have more than email and password only
      )
      .then((res) => {
        // Signed in
        console.log(res);
        // ...
      })
      .catch((error) => {
        alert(error);
      });

    firebase
      .firestore()
      .collection("users")
      .add({
        acceptedterms: acceptedterms,
        address: address,
        billinginfo: billinginfo,
        isValid: true,
        name: name,
        phone: phone,
        email: email,
      })
      .then(() => {
        alert("Success");
      })
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

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Address"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Billing Information"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        value={billinginfo}
        onChangeText={setBillinginfo}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="First and Last Name"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Phone Number"
        placeholderTextColor="#0000FF"
        autoCapitalize="none"
        value={phone}
        onChangeText={setPhone}
      />

      <CheckBox
        center
        title="Accept terms and conditions"
        checked={acceptedterms}
        onPress={() => setAcceptedterms(!acceptedterms)}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() =>
          adduser(
            email,
            password,
            name,
            phone,
            billinginfo,
            address,
            acceptedterms
          )
        }
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

export default NewUser;
