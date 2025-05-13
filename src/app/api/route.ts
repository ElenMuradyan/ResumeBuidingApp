import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {    
    try{
        const isAuth = (await cookies()).get('isAuth')?.value === 'true';
        const uid = (await cookies()).get('uid')?.value;

        return NextResponse.json({ uid, isAuth });
    } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}