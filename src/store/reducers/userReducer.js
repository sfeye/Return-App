import types from "../constants/action-types";

const initialState = {
  email: "",
  name: "",
  location: "",
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.INITIALIZE_USER:
      return {
        ...state,
        email: action.payload.userReducer.email,
        name: action.payload.userReducer.name,
        location: action.payload.userReducer.location,
      };
    case types.UPDATE_USER_LOCATION:
      return {
        ...state,
        location: action.payload.userReducer.location,
      };
    default:
      return state;
  }
}

export default userReducer;
