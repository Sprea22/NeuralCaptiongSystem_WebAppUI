import {
    GET_CAPTIONS,
    ADD_CAPTION,
    CAPTIONS_LOADING
  } from '../actions/types';
  
  const initialState = {
    captions: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CAPTIONS:
        return {
          ...state,
          captions: action.payload,
          loading: false
        };
      case ADD_CAPTION:
        return {
          ...state,
          captions: [action.payload, ...state.captions]
        };
      case CAPTIONS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  