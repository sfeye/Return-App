import types from "../constants/action-types";

export const initializeUser = (id, user) => ({
  type: types.INITIALIZE_USER,
  payload: { id: id, user: user },
});

export const updateUserLocation = (location) => ({
  type: types.UPDATE_USER_LOCATION,
  payload: { location },
});
