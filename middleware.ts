import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req: NextRequest) {
    const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
    const origin = req.headers.get("origin");

    if (!origin || origin !== allowedOrigin) {
        console.log(origin);
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const token = req.cookies.get("token")?.value;
    const secret = new TextEncoder().encode(process.env.SECRET || 'shhhh');

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { payload } = await jwtVerify(token, secret);
        if(payload.key !== process.env.API_KEY){
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
    } catch (err) {
        console.log("Token verification error:", err);
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/((?!token).*)',
    ]
}