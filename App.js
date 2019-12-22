import React,{Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import TabNavigator from './src/TabNavigator/TabNavigator'

const initialState = {  //GLOBAL STATE
  counter: 0
}
const reducer = (state = initialState,action) => {
  switch(action.type){
    case 'INCREASE_COUNTER':
    return{counter:state.counter+1}
    case 'DECREASE_COUNTER':
    return {counter:state.counter-1}
  }
  return state
}
const store = createStore(reducer) //STORE CONNECTION
export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    )
  }
}



