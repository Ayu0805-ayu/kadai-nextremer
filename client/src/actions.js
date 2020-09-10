export const CHANGE_USER_INPUT      = 'CHANGE_USER_INPUT'
export const INITIALIZE_FORM = 'INITIALIZE_FORM'
export const REQUEST_DATA         = 'REQUEST_DATA'
export const RECEIVE_DATA_SUCCESS = 'RECEIVE_DATA_SUCCESS'
export const RECEIVE_DATA_FAILED  = 'RECEIVE_DATA_FAILED'

export const changeUserInput = user_input => ({
  type: CHANGE_USER_INPUT,
  user_input,
})
export const initializeForm = () => ({
  type: INITIALIZE_FORM,
})
export const requestData = () => ({
  type: REQUEST_DATA,
})
export const receiveDataSuccess = historyArray => ({
  type: RECEIVE_DATA_SUCCESS,
  historyArray,
})
export const receiveDataFailed = () => ({
  type: RECEIVE_DATA_FAILED,
})
