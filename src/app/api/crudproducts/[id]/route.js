import { NextResponse } from "next/server";
import prisma from "@/libs/prisma.js";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET (request, {params}) {
    try {
        const product = await prisma.product.findUnique({
        where: {
            id: Number(params.id)
        }
        })

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(
            {
                message: "Product not found",
            },
            {
                status: 400,
            }
        )
    }
};

export async function PUT (request, {params}) {
    try {
        const data = await request.formData()
        
        const name = data.get("name");
        const price = Number(data.get("price"));
        const brand = data.get("brand");
        const category = data.get("category");
        const file = data.get("img");

        //File Code
        if (file != null){
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = path.join(process.cwd(), "public/img/products", file.name)
            writeFile(filePath, buffer)
            console.log("file uploaded to", filePath)

            const productUpdated = await prisma.product.update({
                where: {
                    id: Number(params.id)
                },
                data: {
                    name,
                    price,
                    brand,
                    category,
                    img: file.name,
                }
            });
        } else {
            const productUpdated = await prisma.product.update({
                where: {
                    id: Number(params.id)
                },
                data: {
                    name,
                    price,
                    brand,
                    category,
                }
            });
        }
        

        return NextResponse.json(productUpdated)
    } catch (error) {
        return NextResponse.json(
            {
                message: "Product not found",
            },
            {
                status: 400,
            }
        )
    }
};

export async function DELETE (request, {params}) {
    try {
        const productRemoved = await prisma.product.delete({
            where: {
                id: Number(params.id)
            }
        })
    
        return NextResponse.json(productRemoved)
    } catch (error) {
        return NextResponse.json(
            {
                message: "Product not found",
            },
            {
                status: 400,
            }
        )
    }
};