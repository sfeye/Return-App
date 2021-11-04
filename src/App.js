import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Store from "./store/store";
import firebase from "firebase";
import { firebaseConfig } from "./firebase";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Previous from "./pages/Previous";
import Wallet from "./pages/Wallet";
import RequestScreen from "./components/RequestScreen";
import ForgotPassword from "./components/ForgotPassword";
import NewUser from "./components/NewUser";
import EditJobRequest from "./components/EditJobRequest";

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
  const HomeStack = createDrawerNavigator();
  // --------------------------- //

  // -------- Templates -------- //
  function HomeStackTemplate(name, component, title, initialParams) {
    return (
      <HomeStack.Screen
        name={name}
        component={component}
        options={{
          title: title,
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
        initialParams={initialParams}
      />
    );
  }
  // --------------------------- //

  return (
    <Provider store={Store}>
      {authUser ? (
        <NavigationContainer>
          <HomeStack.Navigator>
            {HomeStackTemplate(
              (name = "HomeStack"),
              (component = Home),
              (title = "Welcome tester"),
              (initialParams = { email: "email" })
            )}
            {HomeStackTemplate(
              (name = "RequestScreen"),
              (component = RequestScreen),
              (title = "Request a pickup")
            )}
            {HomeStackTemplate(
              (name = "SettingsScreen"),
              (component = Settings),
              (title = "Profile Settings")
            )}
            {HomeStackTemplate(
              (name = "WalletScreen"),
              (component = Wallet),
              (title = "Your Payments")
            )}
            {HomeStackTemplate(
              (name = "PreviousScreen"),
              (component = Previous),
              (title = "Previous Jobs")
            )}
            {HomeStackTemplate(
              (name = "EditJobRequest"),
              (component = EditJobRequest),
              (title = "Update Request")
            )}
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
            <AuthStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
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
            <AuthStack.Screen
              name="NewUser"
              component={NewUser}
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
