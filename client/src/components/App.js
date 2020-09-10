import React, { Component } from 'react';
import AddForm from './AddForm'
import HistoryList from './HistoryList'

class App extends Component {
  render() {
    return (
      <div>
        <AddForm  store={this.props.store} />
        <HistoryList  store={this.props.store} />
      </div>
    )
  }
}

export default App;
