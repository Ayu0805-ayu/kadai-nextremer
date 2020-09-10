import React from 'react'
import axios from 'axios'
import { changeUserInput,initializeForm,requestData, receiveDataSuccess, receiveDataFailed} from '../actions'
import HistoryList from './HistoryList'
import moment from 'moment-timezone';

const AddForm = ({ store }) => {
  const {user_input} = store.getState().form  // storeからフォームの内容を取得

  const handleSubmit = e => {
   e.preventDefault()
   var input_timestamp =moment().tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
   axios.post('/chat', { user_input,input_timestamp})  // 入力文字列と送信時刻をサーバーにPOST
    .then(response => {
      var data = response.data.sort(function(a,b) {
        return (a.response_timestamp > b.response_timestamp ? 1 : -1);
      }); //表示用にタイムスタンプ昇順で並べる

      store.dispatch(initializeForm())  // submit後はフォームを初期化
      const historyArray = data
      store.dispatch(receiveDataSuccess(historyArray))
    })
    .catch(err => {
      //console.error(new Error(err))
      store.dispatch(receiveDataFailed())
    })
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
          <input value={user_input} onChange={e => store.dispatch(changeUserInput(e.target.value))} />
        <button type="submit">送信</button>
      </form>
    </div>
  )
}

export default AddForm
