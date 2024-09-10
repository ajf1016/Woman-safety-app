import React, {createContext, useReducer} from 'react';
import UserReducer from '../reducers/UserReducer';

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  image: '',
  address: null,
  is_verified: false,
  active_address: false,
  access_token: null,
};

export const UserContext = createContext(initialState);
const UserStore = ({children}) => {
  const [userState, userDispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{userState, userDispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserStore;
