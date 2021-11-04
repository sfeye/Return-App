import types from "../constants/action-types";

export const initializeJob = (
  id,
  dropOff,
  pickup,
  time,
  userName,
  userPhone,
  activeCd,
  task
) => ({
  type: types.INITIALIZE_JOB_STATUS,
  payload: {
    id: id,
    dropOff: dropOff,
    pickup: pickup,
    time: time,
    userName: userName,
    userPhone: userPhone,
    activeCd: activeCd,
    task: task,
  },
});

export const updateJob = (
  accepted,
  completed,
  driverName,
  driverLocation,
  driverPhone
) => ({
  type: types.UPDATE_JOB_STATUS,
  payload: {
    accepted: accepted,
    completed: completed,
    driverName: driverName,
    driverLocation: driverLocation,
    driverPhone: driverPhone,
  },
});

export const updateJobOnUpdate = (dropOff, pickup, time, task) => ({
  type: types.UPDATE_JOB_ON_UPDATE,
  payload: {
    dropOff: dropOff,
    pickup: pickup,
    time: time,
    task: task,
  },
});

export const resetJob = () => ({
  type: types.RESET_JOB_STATUS,
});
