'use client'
import { RootState } from "@/state-management/store";
import React from "react";
import { useSelector } from "react-redux";

import '@/styles/loading.css';
import { HeroHighlightDemo } from "./HeroHighlightDemo";

export default function LoadingWrapper ({children, loading}: {children: React.ReactNode, loading?: boolean}) {
    const { loading: authLoading } = useSelector((state: RootState) => state.userProfile);

    return(
        <div className="w-[100%] h-[100vh]">
            {
                (authLoading || loading) ? 
                <HeroHighlightDemo className="w-[100%] h-[100vh] flex items-center justify-center">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div> 
                </HeroHighlightDemo>
                 : children
            }
        </div>
    )
}