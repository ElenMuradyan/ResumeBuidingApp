'use client'

import { fetchUserProfileInfo } from "@/features/auth/userSlice";
import { AppDispatch } from "@/state-management/store";
import { getIsAuth } from "@/lib/helpers/getIsAuth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AuthLoader({children}: {children: React.ReactNode}) {
    const dispatch = useDispatch<AppDispatch>();
    const [ isAuth, setIsAuth ] = useState<boolean | undefined>(false);
    const [ uid, setUid ] = useState<string>('');

    useEffect(() => {        
        const getIsAuthenticated = async function () {
            const { isAuth, uid } = await getIsAuth();  
            console.log(isAuth, uid);
                      
            if(isAuth){
                setIsAuth(true);
                setUid(uid);
            }else{
                setIsAuth(false);
                setUid('');
            }
        };

        getIsAuthenticated();
    }, []);

    useEffect(() => {        
        if(isAuth && uid){
            dispatch(fetchUserProfileInfo(uid));
        }
    }, [isAuth, uid, dispatch])

    return(
        <>{children}</>
    )
};