import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { CheckBox, Icon, Input } from "react-native-elements";
import firebase from "firebase";
import { validate } from "../UtilFunctions";

const NewUser = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedterms, setAcceptedterms] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedAddress, setTouchedAddress] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);

  function isDisabled() {
    return (
      validate("name", name) !== "" ||
      validate("email", email) !== "" ||
      validate("address", address) != "" ||
      validate("password", password) !== "" ||
      validate("phone", phone) !== ""
    );
  }

  function addUserToCollection(
    email,
    password,
    name,
    phone,
    address,
    acceptedterms
  ) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        firebase
          .firestore()
          .collection("users")
          .add({
            acceptedterms: acceptedterms,
            address: address,
            isValid: true,
            name: name,
            phone: phone,
            email: email,
          })
          .catch((error) => {
            alert(error);
          })
      )
      .catch((error) => {
        alert(error);
      });
  }

  const setPhoneFormat = (value) => {
    setPhone(normalizeInput(value, phone));
  };

  return (
    <ScrollView>
      <View>
        <Input
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#0000FF"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setTouchedEmail(true)}
          errorMessage={touchedEmail ? validate("email", email) : ""}
        />

        <Input
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#0000FF"
          autoCapitalize="none"
          type="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          onFocus={() => setTouchedPassword(true)}
          errorMessage={touchedPassword ? validate("password", password) : ""}
        />

        <Input
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Address"
          placeholderTextColor="#0000FF"
          autoCapitalize="none"
          value={address}
          onChangeText={setAddress}
          onFocus={() => setTouchedAddress(true)}
          errorMessage={touchedAddress ? validate("address", address) : ""}
        />

        <Input
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="First and Last Name"
          placeholderTextColor="#0000FF"
          autoCapitalize="none"
          value={name}
          onChangeText={setName}
          onFocus={() => setTouchedName(true)}
          errorMessage={touchedName ? validate("name", name) : ""}
        />

        <Input
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Phone Number"
          placeholderTextColor="#0000FF"
          autoCapitalize="none"
          value={phone}
          onChangeText={setPhoneFormat}
          onFocus={() => setTouchedPhone(true)}
          errorMessage={touchedPhone ? validate("phone", phone) : ""}
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
            addUserToCollection(
              email,
              password,
              name,
              phone,
              address,
              acceptedterms
            )
          }
          disabled={isDisabled()}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const normalizeInput = (value, previousValue) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return value;
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  } else {
    return value;
  }
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
