import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';

const reducer = (state, { type, payload }) => {
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
        isError: false,
        data: payload
      }
    }
    case 'FETCH_ERROR': {
      return {
        ...state,
        isLoading: false,
        isError: true
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

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  const fetchData = async () => {
    dispatch({ type: 'FETCH_INIT' });
    console.log('fetchData: ', didCancel);
    try {
      const { data } = await axios(url);
      if (!didCancel) {
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
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

  return { ...state, handleFetch };
}
