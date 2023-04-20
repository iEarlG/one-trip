import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() { 
    return await getServerSession(authOptions);
}

export default async function getCurrentUsers() {
    try {
        const session = await getSession();

        if(!session?.user?.email) { 
            return null;
        }

        const currentUsers = await prisma.user.findUnique({
            where: { email: session.user.email as string },
        });

        if(!currentUsers) {
            return null;
        }

        return {
            ...currentUsers,
            created: currentUsers.created.toISOString(),
            updatedAt: currentUsers.updatedAt.toISOString(),
            emailVerified: currentUsers.emailVerified?.toISOString() || null,
        };
        
    } catch (error: any) {
        return null;
    }
}