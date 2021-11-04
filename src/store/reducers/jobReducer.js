import types from "../constants/action-types";

//update driverLocation, dropOff, pickup to objects later

const currentTime = new Date();
const actualDateFormat = new Date(
  currentTime.getFullYear(),
  currentTime.getMonth(),
  currentTime.getDate(),
  currentTime.getHours(),
  currentTime.getMinutes(),
  currentTime.getSeconds(),
  currentTime.getMilliseconds()
);

const initialState = {
  id: null,
  accepted: false,
  completed: false,
  driverLocation: "",
  diverName: "",
  driverPhone: "",
  dropOff: {
    latitude: 0,
    longitude: 0,
    address: "",
  },
  pickup: {
    latitude: 0,
    longitude: 0,
    address: "",
  },
  time: actualDateFormat,
  userName: "",
  userPhone: "",
  activeCd: "",
  task: "",
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
        task: action.payload.task,
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
    case types.UPDATE_JOB_ON_UPDATE:
      return {
        ...state,
        dropOff: action.payload.dropOff,
        pickup: action.payload.pickup,
        time: action.payload.time,
        task: action.payload.task,
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
