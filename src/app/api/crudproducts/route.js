import { NextResponse } from "next/server";
import prisma from "@/libs/prisma.js";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json(products)
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

export async function POST(request) {
    try {
        const data = await request.formData()
        
        const name = data.get("name");
        const price = Number(data.get("price"));
        const brand = data.get("brand");
        const category = data.get("category");
        const file = data.get("img");

        //File Code
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(process.cwd(), "public/img/products", file.name)
        writeFile(filePath, buffer)
        console.log("file uploaded to", filePath) 

        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
                brand,
                category,
                img: file.name,
            }
        })
        return NextResponse.json(newProduct)
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