import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST (
    request: Request,
) { 
    const body = await request.json();
    const { email, password, name,} = body;
    const hashPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashPassword,
        }
    });

    return NextResponse.json(user);
}