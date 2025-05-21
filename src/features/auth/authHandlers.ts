import { auth, db } from "@/services/firebase/firebase";
import { fetchUserProfileInfo, setIsAuth } from "./userSlice";
import { RegisterFunctionProps } from "./types";
import { FIRESTORE_PATH_NAMES } from "@/lib/constants";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { store } from "@/state-management/store";
import { ROUTE_NAMES } from "@/lib/Route_Names";

export const handleRegister = async ({values, setLoading, push}: RegisterFunctionProps) => {
    setLoading(true);
    const { firstName, lastName, email, password } = values;
    try{
        const response = await createUserWithEmailAndPassword( auth, email, password );
        const { uid } = response.user;

        const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
        await setDoc(createDoc, {
            uid, firstName, lastName, email
        });

        push(ROUTE_NAMES.LOGIN);
    }catch(error: any){
        console.log(error.message);
    }finally{
        setLoading(false);
    };
};

export const handleLogin = async ({values, setLoading, push, dispatch}: RegisterFunctionProps) => {
    setLoading(true);

    try{        
    const { email, password } = values;
    
    const user = await signInWithEmailAndPassword( auth, email, password );
    if(dispatch){
        dispatch(fetchUserProfileInfo(user.user.uid));
    };

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.user.uid,
        })
      });

      if (res.ok) {
        push(ROUTE_NAMES.HOME);
      } else {
        console.log('Authentication failed, please try again.');
      }
    }catch(error:any){
        console.log(error.message);
    }finally{
        setLoading(false);
    };
};

export default async function handleLogout () {
  try{
    await signOut(auth); 
    console.log('hi');
    
    store.dispatch(setIsAuth(false));

    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if(!res.ok){
      throw new Error('Something went wrong.')
    };

    window.location.reload();
  }catch(err: any){

  }
}