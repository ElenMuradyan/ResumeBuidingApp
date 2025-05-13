import { AppDispatch } from "@/state-management/store";

export interface Register {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    collabId?: string;
  }
  
  export interface RegisterFunctionProps {
    values: Register;
    setLoading: (val: boolean) => void;
    push: (path: string) => void; 
    dispatch?: AppDispatch;
  }
  
  export interface stateInterface {
    loading: boolean,
    error: string | null,
    authUserInfo: {
        isAuth: boolean,
        userData: userData | null
    }
}

export interface userData  {
    uid: string,
    imgUrl: string,
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
}
