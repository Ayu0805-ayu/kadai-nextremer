import React from 'react'
import axios from 'axios'
import { requestData, receiveDataSuccess, receiveDataFailed } from '../actions'

const HistoryList = ({ store }) => {
  const { isFetching, historyArray } = store.getState().histores

  const handleFetchData = () => {
   store.dispatch(requestData())
    axios.get('/history/list')
    .then(response => {  // データ受け取りに成功した場合
      var data = response.data.sort(function(a,b) {
        return (a.response_timestamp > b.response_timestamp ? 1 : -1);
      }); //表示用にタイムスタンプ昇順で並べる

      const _historyArray = data;
      store.dispatch(receiveDataSuccess(_historyArray))    // データをstoreに保存するとともにisFetchingをfalse
    })
    .catch(err => {  // データ受け取りに失敗した場合
      console.error(new Error(err))
      store.dispatch(receiveDataFailed())  // isFetchingをfalse
    })
  }

  return (
    <div>
    {
        isFetching  // isFetchingの値で分岐
          ? <h2>Now Loading...</h2>  // データをFetch中ならばローディング表示
          : <div>
              <ul>
                {historyArray.map(history => (
                  <li key={history.response_timestamp}>
                    {`${history.input_timestamp} YOU>${history.user_input} `}
                    <br />
                    {`${history.response_timestamp} BOT>${history.bot_response}`}
                  </li>
                ))}
              </ul>
            </div>
      }
    </div>
  )
}

export default HistoryList
