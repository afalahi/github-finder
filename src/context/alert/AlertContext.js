import { createContext, useReducer } from 'react';
import alertReducer from './AlertReducers';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg) => {
    dispatch({ type: 'SET_ALERT', payload: { msg } });
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };
  return (
    <AlertContext.Provider value={{ setAlert, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
