import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST() {
    const secret = process.env.SECRET || 'shhhh';
    const token = jwt.sign({key: process.env.API_KEY}, secret, { issuer: process.env.ALLOWED_ORIGIN, expiresIn: 60 * 60});

    const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: "strict"
    });

    const response = NextResponse.json({ token }, { status: 200 });
    response.headers.set('Set-Cookie', cookie);

    return response;
}