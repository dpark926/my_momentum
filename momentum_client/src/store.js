import { combineReducers, createStore } from 'redux';
import weatherReducer from './reducers/weatherReducer';
// import typeReducer from './reducers/typeReducer';

const rootReducers = combineReducers({
  weatherReducer,
  // typeReducer
})

const initialState = {}

const store = createStore(
  rootReducers,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
);

export default store;