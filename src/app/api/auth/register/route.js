import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prisma.js";

export async function POST(request) {
    try {
        const data = await request.formData();

        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");

        const userFound = await prisma.user.findUnique({
            where:  { email: email },
        });
    
        if (userFound) {
            return NextResponse.json({
                message: "Email existente, intente con otro"
            }, {
                status: 400
            })
        };
    
        const usernameFound = await prisma.user.findUnique({
            where:  { username: username},
        });
    
        if (usernameFound) {
            return NextResponse.json({
                message: "Usuario existente, intente con otro"
            }, {
                status: 400
            })
        };
    
        const hash = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username:  username,
                email:      email,
                password:    hash,
            }
        });
    
        const {password: _, ... user} = newUser;
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        )
    }
};