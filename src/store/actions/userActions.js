import types from "../constants/action-types";

export const initializeUser = (user) => ({
  type: types.INITIALIZE_USER,
  payload: { user },
});

export const updateUserLocation = (location) => ({
  type: types.INITIALIZE_USER,
  payload: { location },
});
