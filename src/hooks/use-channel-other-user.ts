import { FullChannelType } from "@/lib/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useChannelOtherUser = (
    channel:
        | FullChannelType
        | {
              members: User[];
          }
) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session.data?.user?.email;

        const receiver = channel.members.filter((user) => user.email !== currentUserEmail);

        return receiver[0];
    }, [channel.members, session.data?.user?.email]);

    return otherUser;
};
