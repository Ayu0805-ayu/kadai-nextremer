import { combineReducers } from 'redux'
import { CHANGE_USER_INPUT, INITIALIZE_FORM,REQUEST_DATA, RECEIVE_DATA_SUCCESS, RECEIVE_DATA_FAILED  } from './actions'

const initialState = {
  form: {
    user_input: '', // 入力文字列
  },
  histores: {
    isFetching: false,  // サーバーからリストを取ってきている最中かどうか
    historyArray: [],  // 履歴データを入れる配列
  },
}

const formReducer = (state = initialState.form, action) => {
  switch (action.type) {
    case CHANGE_USER_INPUT:
      return {
        ...state,
        user_input: action.user_input,
      }
    case INITIALIZE_FORM:
      return initialState.form
    default:
      return state
  }
}

const historesReducer = (state = initialState.histores, action) => {
   switch (action.type) {
     case REQUEST_DATA:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        historyArray: action.historyArray,
      }
    case RECEIVE_DATA_FAILED:
      return {
        ...state,
        isFetching: false,
      }
    default:
       return state
   }
 }

const rootReducer = combineReducers({
  form: formReducer,
  histores: historesReducer,
})

export default rootReducer
