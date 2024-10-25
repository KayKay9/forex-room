"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "../db/get-current-user";
import { revalidatePath } from "next/cache";
import { CreateChannelSchema } from "@/schemas";

const handler = async (data: InputType): Promise<ReturnType> => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return {
            error: "Unauthorized",
        };
    }

    const {name,isPrivate} = data;
    let channel;

    try {
        const newChannel = await db.channel.create({
            data: {
                name,
                isPrivate,
                createdBy:{
                    connect: { id: currentUser.id },
                },
                members: {
                    connect: [{id:currentUser.id}],
                },
            },
        });

        channel = newChannel;
    } catch (error) {
        return {
            error: "Failed to create a channel.",
        };
    }

    revalidatePath("/");

    return {
        data: channel,
    };
};

export const createChannelAction = createSafeAction(CreateChannelSchema, handler);
