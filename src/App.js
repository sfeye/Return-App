import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Store from "./store/store";
import firebase from "firebase";
import { firebaseConfig } from "./firebase";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequestScreen from "./components/RequestScreen";

export default function App() {
  // ------- Local State ------- //
  const [authUser, setUser] = useState(null);
  // --------------------------- //

  // --- Initialize Firebase --- //
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  // --------------------------- //

  // ---- Authenticate User ---- //
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => {
      unsubscribe();
    };
  });
  // --------------------------- //

  // ------ Create Stacks ------ //
  const AuthStack = createStackNavigator();
  const HomeStack = createStackNavigator();
  // --------------------------- //

  return (
    <Provider store={Store}>
      {true ? (
        <NavigationContainer>
          <HomeStack.Navigator>
            <HomeStack.Screen
              name="HomeStack"
              component={Home}
              options={{
                title: "Welcome tester",
                headerTitleAlign: "left",
                headerTitleStyle: {
                  fontSize: 15,
                  color: "white",
                },
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "blue",
                },
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => firebase.auth().signOut()}
                    style={{ maginBottom: 10, marginRight: 20 }}
                  >
                    <Ionicons name={"power"} size={20} color={"white"} />
                  </TouchableOpacity>
                ),
              }}
              initialParams={{ email: "ljhorosz@gmail.com" }}
            />
            <HomeStack.Screen name="RequestScreen" component={RequestScreen} />
          </HomeStack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitleStyle: {
                  color: "white",
                  textAlign: "center",
                },
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "blue",
                },
              }}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
