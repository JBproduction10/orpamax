import { getToken } from "next-auth/jwt";
import User from "../database/models/User";
import { connectToDatabase } from "../database/mongodb";
import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, res:NextResponse, next:any) => {
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });
    connectToDatabase();
    let user = await User.findById(token?.sub);
    connectToDatabase();
    if(user.role == "admin"){
        next();
    }else{
        NextResponse.json({message: "Access denied"}, {status: 401})
    }
}