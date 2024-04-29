import { NextResponse } from "next/server";
import prisma from "@/libs/prisma.js";

export async function GET (request, {params}) {
    try {
        const user = await prisma.user.findUnique({
        where: {
            email: params.email
        }, 
        })
        delete user.password;
        
        return NextResponse.json({
            data: user,
            message: "Usuario logueado con éxito",
            code: 200
        })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Email user not found",
                error: error.message,
                code: 404
            }, 
        )
    }
};