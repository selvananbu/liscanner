export const setRack = (value) => {
  return{
    type: "SET_RACK",
    payload: value
  }
};

export const setBatch = (value) => {
  return{
    type: "SET_BATCH",
    payload: value
  }
};
export const setReasonChoicesUpdated = (value) => {
  return{
    type: "SET_REASON_CHOICES_UPDATED",
    payload: value
  }
};
export const setReasonList = (value) => {
  return{
    type: "SET_REASON_LIST",
    payload: value
  }
};
export const setReasonId = (value) => {
  return{
    type: "SET_REASON_ID",
    payload: value
  }
};

export const setSoftKey = (value) => {
  return{
    type: "SET_SOFTKEY",
    payload: value
  }
};
export const clearItem = () => {
  return {
    type: "CLEAR_ITEM"
  }
};
export const setReadyDisabled = (value) => {
  return {
    type: "SET_READY_DISABLED",
    payload: value
  }
};
export const setUndoDisabled = (value) => {
  return {
    type: "SET_UNDO_DISABLED",
    payload: value
  }
};
export const setWorkStepId = (value) => {
  return {
    type: "SET_WORKSTEP_ID",
    payload: value
  }
};
export const setMachineId = (value) => {
  return {
    type: "SET_MACHINE_ID",
    payload: value
  }
};
export  const setItem  =  (value)  =>  {
  return {
    type:  "SET_ITEM",
    payload:  value
  }
};
