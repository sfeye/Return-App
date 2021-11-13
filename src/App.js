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
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export default function App() {
  // ------- Local State ------- //
  const [authUser, setUser] = useState(null);
  //var currentRoute = useRoute();
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
  const HomeDrawer = createDrawerNavigator();
  const HomeStack = createStackNavigator();
  // --------------------------- //

  // --- Home Stack  Screens --- //
  function HomeStackScreens() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomeStack"
          component={Home}
          options={{
            title: "Home",
            headerMode: "none",
          }}
          initialParams={{ email: authUser.email }}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="EditJobRequest"
          component={EditJobRequest}
          options={{
            title: "Update Request",
            headerTitleStyle: {
              fontSize: 15,
              color: "white",
            },
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "blue",
            },
          }}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="RequestScreen"
          component={RequestScreen}
          options={{
            title: "Request a Pickup",
            headerTitleStyle: {
              fontSize: 15,
              color: "white",
            },
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "blue",
            },
          }}
        ></HomeStack.Screen>
      </HomeStack.Navigator>
    );
  }
  // --------------------------- //

  // -------- Templates -------- //
  function HomeDrawerTemplate(name, component, title, initialParams) {
    return (
      <HomeDrawer.Screen
        name={name}
        component={component}
        options={({ route }) => ({
          title: title,
          headerTitleStyle: {
            fontSize: 15,
            color: "white",
          },
          headerShown:
            getFocusedRouteNameFromRoute(route) === "RequestScreen" ||
            getFocusedRouteNameFromRoute(route) === "EditJobRequest"
              ? false
              : true,

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
        })}
        initialParams={initialParams}
      />
    );
  }

  function AuthStackTemplate(name, component) {
    return (
      <AuthStack.Screen
        name={name}
        component={component}
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
    );
  }
  // --------------------------- //

  return (
    <Provider store={Store}>
      {authUser ? (
        <NavigationContainer>
          <HomeDrawer.Navigator>
            {HomeDrawerTemplate(
              (name = "Home"),
              (component = HomeStackScreens)
            )}
            {HomeDrawerTemplate(
              (name = "SettingsScreen"),
              (component = Settings),
              (title = "Profile Settings")
            )}
            {HomeDrawerTemplate(
              (name = "WalletScreen"),
              (component = Wallet),
              (title = "Your Payments")
            )}
            {HomeDrawerTemplate(
              (name = "PreviousScreen"),
              (component = Previous),
              (title = "Previous Jobs")
            )}
          </HomeDrawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthStack.Navigator>
            {AuthStackTemplate((name = "Login"), (component = Login))}
            {AuthStackTemplate(
              (name = "ForgotPassword"),
              (component = ForgotPassword)
            )}
            {AuthStackTemplate((name = "NewUser"), (component = NewUser))}
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
