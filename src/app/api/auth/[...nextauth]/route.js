import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma.js";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email:  { label: "Email", type: "email", placeholder: "Ej: juan@email.com" },
                password: { label: "Password", type: "password", placeholder: "Ej: 567890" }
            },
            async authorize(credentials, req) {

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) throw new Error("Usuario no encontrado")

                const matchPassword = await bcrypt.compare(credentials.password, user.password);

                if(!matchPassword) throw new Error("Password incorrecta")

                return{
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };