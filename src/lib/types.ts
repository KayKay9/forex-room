import { Channel, ChannelMessage, Chat, Message, User } from "@prisma/client";
import { Socket } from "socket.io-client";

export type FullMessageType = Message & {
    sender: {
        id: string;
        username: string | null;
        email: string | null;
        image: string | null;
    };
    seen: { id: string; email: string | null }[];
};

export type FullChannelMessageType = ChannelMessage & {
    sender: {
        id: string;
        username: string | null;
        email: string | null;
        image: string | null;
    };
    seen: { id: string; email: string | null }[];
};

export type FullChatType = Chat & {
    participants: User[];
    messages: FullMessageType[];
};
export type FullChannelType = Channel & {
    members: User[];
    channelMessages:FullChannelMessageType[]
}

export interface MessagePayload {
    chatId: string;
    content: string;
    senderId: string;
}
export interface ChannelMessagePayload {
    channelId: string;
    message: string;
    senderId: string;
}
export interface TypingStatusPayload {
    chatId: string;
    senderId: string;
    isTyping: boolean;
}

export interface ChannelTypingStatusPayload {
    channelId: string;
    senderId: string;
    isTyping: boolean;
}

export type SelectOptions = {
    username: string | null;
    image: string | null;
    email: string | null; // For temp, we can use id instead
};

export interface UserPayload {
    id: string;
    username: string;
    socket?: Socket;
}

export interface ForexDataPayload{
    id: string;
    pair: string;
    bidPrice: string;
    askPrice: string;
}
