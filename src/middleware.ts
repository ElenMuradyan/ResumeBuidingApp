import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROUTE_NAMES  } from "./lib/Route_Names";

export default async function authMiddleware(request: NextRequest){
    const isAuth = (await cookies()).get('isAuth')?.value === 'true';

    const notAuthProtectedUrls = [ ROUTE_NAMES.CREATERESUME, ROUTE_NAMES.EDITRESUME, ROUTE_NAMES.PROFILE, ROUTE_NAMES.RESUME, ROUTE_NAMES.RESUMES ];
    const authProtectedUrls = [ ROUTE_NAMES.LOGIN, ROUTE_NAMES.REGISTER ];

    if(!isAuth && notAuthProtectedUrls.includes(request.nextUrl.pathname)){
        return NextResponse.redirect(new URL(ROUTE_NAMES.LOGIN, request.url));
    };

    if(isAuth && authProtectedUrls.includes(request.nextUrl.pathname)){
        return NextResponse.redirect(new URL(ROUTE_NAMES.HOME, request.url));
    };

    return NextResponse.next();
}