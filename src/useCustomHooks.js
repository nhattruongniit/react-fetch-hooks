import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';

const reducerLoading = (state, { type }) => {
  switch(type) {
    case 'FETCH_INIT': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        isLoading: false,
      }
    }
    case 'FETCH_ERROR': {
      return {
        ...state,
        isLoading: false,
      }
    }
    default: 
      return {
        ...state
      }
  }
}

const reducerData = (state, { type, payload }) => {
  switch(type) {
    case 'DATA_SUCCESS': {
      return {
        ...state,
        data: payload,
      }
    }
    case 'DATA_FAILURE': {
      return {
        ...state,
        data: payload,
      }
    }
    default: 
      return {
        ...state
      }
  }
}

export const useCustomHooks = (initialUrl, initialData) => {
  let didCancel = false;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(reducerLoading, {
    isLoading: false,
  });

  const [stateData, dispatchData] = useReducer(reducerData, {
    data: initialData,
  });


  const fetchData = async () => {
    dispatch({ type: 'FETCH_INIT' });
    console.log('fetchData: ', didCancel);
    try {
      const { data } = await axios(url);
      if (!didCancel) {
        dispatch({ type: 'FETCH_SUCCESS' })
        dispatchData({ type: 'DATA_SUCCESS', payload: data })
      }
    } catch (error) {
      if (!didCancel) {
        dispatch({ type: 'FETCH_ERROR' })
      }
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      didCancel = true;
    }
  }, [url]);
  
  const handleFetch = (e, api) => {
    e.preventDefault();
    setUrl(api);
  }

  return { ...state, ...stateData, handleFetch };
}
