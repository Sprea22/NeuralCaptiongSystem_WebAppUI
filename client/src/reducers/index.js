import { combineReducers } from 'redux';
import captionReducer from './captionReducer';

export default combineReducers({
  caption: captionReducer
});
