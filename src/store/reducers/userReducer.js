import types from "../constants/action-types";

const initialState = {
  id: "",
  user: "",
  location: {
    coords: {
      accuracy: 9.868981155673548,
      altitude: 273.1167869567871,
      altitudeAccuracy: 4,
      heading: -1,
      latitude: 39.03638137973755,
      longitude: -94.58940982827413,
      speed: 0,
    },
    timestamp: 1632582136000.115,
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.INITIALIZE_USER:
      return {
        ...state,
        id: action.payload.id,
        user: action.payload.user,
      };
    case types.UPDATE_USER_LOCATION:
      return {
        ...state,
        location: action.payload.location,
      };
    default:
      return state;
  }
}

export default userReducer;
