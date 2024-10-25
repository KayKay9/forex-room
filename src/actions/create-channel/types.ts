import { ActionState } from "@/lib/create-safe-action";
import { CreateChannelSchema } from "@/schemas";
import { Channel } from "@prisma/client";
import { z } from "zod";

export type InputType = z.infer<typeof CreateChannelSchema>;
export type ReturnType = ActionState<InputType, Channel>;
