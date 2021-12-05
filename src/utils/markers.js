import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation } from "./fetchLocation";

const job = useSelector((state) => state.jobReducer);
const location = fetchLocation();

export default markers = [
  {
    type: "pickup",
    latitude: job.pickup.latitude,
    longitude: job.pickup.longitude,
    color: "black",
  },
  {
    type: "dropoff",
    latitude: job.dropOff.latitude,
    longitude: job.dropOff.longitude,
    color: "green",
  },
  {
    type: "self",
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    color: "red",
  },
];
