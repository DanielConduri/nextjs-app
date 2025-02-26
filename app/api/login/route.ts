import { authenticate } from "@/app/lib/actions";
import { NextRequest, NextResponse } from "next/server"

import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log('reqBody in POST', reqBody)

        //check if user exists on mongoDB database using the email as search parameter
        const user = await getUser(email); //mongoose findOne() function is checking the Mongoose User Schema for a user that matches the provided email
        console.log('user', user)


        if (!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 404});
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        console.log('passwordsMatch', passwordsMatch)

        //if (passwordsMatch) return user;

        //if password is incorrect
        if(!passwordsMatch) {
            return NextResponse.json({error: "Invalid Password"}, {status : 400})
        };

        const tokenData = {
            id: user.id, 
            username: user.name,
            email: user.email
        }

        console.log('tokenData',tokenData)

        //create token using jsonwebtoken. parameters include thee tokenData, the TOKEN_SECRET
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "2 days" });
        console.log(token)

        const response = NextResponse.json({
            message: "Login succesfull",
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        // response.cookies.set({
        //     name: "token",
        //     value: token,
        //     httpOnly: true,
        //     sameSite: "strict",
        //     path: "/"
        // });

        
        return response;

    } catch (error: any) {
        return error;return NextResponse.json({error: error.message}, {status: 500})

    }

}
