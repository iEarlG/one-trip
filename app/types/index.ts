import { User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "created" | "updatedAt" | "emailVerified"
> & {
    created: string;
    updatedAt: string;
    emailVerified: string | null;
};