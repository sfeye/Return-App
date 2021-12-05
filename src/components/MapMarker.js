import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";

const MapMarker = ({ latitude, longitude, color }) => {
  return (
    <Marker
      coordinate={{
        latitude: { latitude },
        longitude: { longitude },
      }}
      pinColor={color}
    />
  );
};

export default MapMarker;

const styles = StyleSheet.create({});
