import { useEffect, useState } from "react";
import { InitialState } from "./interfaces";


const initialState: InitialState = { 
  data: undefined, 
  isLoading: true,
  hasError: false, 
   errorMessage: { 
    code: 0, 
    message: '' 
  } 
};

const localCache: any = {};

export const useFetch = (url: string) => {
  // console.log({url});
  const [state, setState] = useState<InitialState>(initialState);

  const setLoadingState = () => {
    setState(initialState);
  }

  const getData = async () => {
    if (localCache[url]) {
      console.log('Usando cache');
      setState({
        ...state,
        data: localCache[url],
        isLoading: false,
        hasError: false,
        errorMessage: {
          code: 0,
          message: '',
        },
      });
      return;
    }

    setLoadingState();

    const resp = await fetch(url);
    if (!resp.ok) {
      setState({
        ...state,
        data: undefined,
        isLoading: false,
        hasError: true,
        errorMessage: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return;
    }
    const data = await resp.json();
    setState({
      ...state,
      data: data,
      isLoading: false,
      hasError: false,
      errorMessage: {
        code: 0,
        message: '',
      },
    });

    localCache[url] = data;
  }

  useEffect(() => {
    getData();
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
}