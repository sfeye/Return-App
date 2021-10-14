import types from "../constants/action-types";

//update driverLocation, dropOff, pickup to objects later on

const initialState = {
  id: null,
  accepted: false,
  completed: false,
  driverLocation: "",
  diverName: "",
  driverPhone: "",
  dropOff: "",
  pickup: "",
  time: "",
  userName: "",
  userPhone: "",
  activeCd: "",
};

function jobReducer(state = initialState, action) {
  switch (action.type) {
    case types.INITIALIZE_JOB_STATUS:
      return {
        ...state,
        id: action.payload.id,
        dropOff: action.payload.dropOff,
        pickup: action.payload.pickup,
        time: action.payload.time,
        userName: action.payload.userName,
        userPhone: action.payload.userPhone,
        activeCd: action.payload.activeCd,
      };

    case types.UPDATE_JOB_STATUS:
      return {
        ...state,
        accepted: action.payload.accepted,
        completed: action.payload.completed,
        driverName: action.payload.driverName,
        driverLocation: action.payload.driverLocation,
        driverPhone: action.payload.driverPhone,
      };
    case types.RESET_JOB_STATUS:
      return {
        state: initialState,
      };
    default:
      return state;
  }
}

export default jobReducer;
