import types from "../constants/action-types";

const initialState = {
  id: "",
  user: {
    acceptedterms: false,
    address: "",
    email: "",
    isValid: false,
    name: "",
    phone: "",
  },
  location: {},
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
