import {createContext} from 'react';

//Context for global Login Credentials
export const CredentialsContext = createContext({storedCredentials: {}, setStredCredentials: () => {}})