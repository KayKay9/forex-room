import db from "@/lib/prisma-db";
import { getCurrentUser } from "./get-current-user";


// Return all of the user of app
export const getAllFriends = async () => {
    const currUser = await getCurrentUser();

    if (!currUser) return [];

    const data = await db.user.findMany({
        where: {
            NOT: {
                email: currUser.email,
            },
        },
        select: {
            email: true,
            username: true,
            image: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return data ? data : [];
};
