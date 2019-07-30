import axios from 'axios';
import { GET_CAPTIONS, ADD_CAPTION, CAPTIONS_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getCaptions = () => dispatch => {
  dispatch(setCaptionsLoading());
  axios
    .get('/api/captions')
    .then(res =>
      dispatch({ 
        type: GET_CAPTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCaption = caption => (dispatch, getState) => {
  axios
    .post('/api/captions', caption)
    .then(res => 
      dispatch({
        type: ADD_CAPTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCaptionsLoading = () => {
  return {
    type: CAPTIONS_LOADING
  };
};
