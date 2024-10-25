"use client";

import { Socket } from "socket.io-client";

import { CHANNEL_MESSAGE_NEW, CHANNEL_SEND_MESSAGE, CHANNEL_TYPING_STATUS, FOREX_UPDATE, SEND_MESSAGE, TYPING_STATUS, USER_JOINED } from "@/lib/constants";
import { ChannelMessagePayload, ChannelTypingStatusPayload, ForexDataPayload, MessagePayload, TypingStatusPayload, UserPayload } from "@/lib/types";

export const useSocketHandler = (socket: Socket | null) => {
    
    const sendMessage = (payload: MessagePayload) => {
        return new Promise((resolve, reject) => {
            if (!socket?.connected) {
                reject("Socket not connected");
                return;
            }

            socket.timeout(30000).emit(SEND_MESSAGE, payload, (err: any, sentMessage: any) => {
                if (err) {
                    console.log({ err });
                    reject(err);
                    return;
                }
                resolve(sentMessage);
            });
        });
    };

    const sendChannelMessage = (payload: ChannelMessagePayload) => {
        return new Promise((resolve, reject) => {
            if (!socket?.connected) {
                reject("Socket not connected");
                return;
            }

            socket.timeout(30000).emit(CHANNEL_SEND_MESSAGE, payload, (err: any, sentMessage: any) => {
                console.log('emit channel message');
                if (err) {
                    console.log({ err });
                    reject(err);
                    return;
                }
                resolve(sentMessage);
            });
        });
    };

    const channelMessageNew = (payload: ChannelMessagePayload) => {
        return new Promise((resolve, reject) => {
            if (!socket?.connected) {
                reject("Socket not connected");
                return;
            }
            socket.timeout(30000).emit(CHANNEL_MESSAGE_NEW, payload, (err: any, sentMessage: any) => {
                if (err) {
                    console.log({ err });
                    reject(err);
                    return;
                }
                resolve(sentMessage);
            });
        });
    };

    const updateTypingStatus = (payload: TypingStatusPayload) => {
        if (!socket?.connected) {
            return;
        }

        socket.emit(TYPING_STATUS, payload);
    };

    const updateChannelTypingStatus = (payload: ChannelTypingStatusPayload) => {
        if (!socket?.connected) {
            return;
        }

        socket.emit(CHANNEL_TYPING_STATUS, payload);
    };

    // Might delete this
    const registerUser = (payload: UserPayload) => {
        return new Promise((resolve, reject) => {
            if (!socket?.connected) {
                reject("Socket not connected");
                return;
            }

            socket.timeout(30000).emit(USER_JOINED, payload, (err: any, sentMessage: any) => {
                if (err) {
                    console.log({ err });
                    reject(err);
                    return;
                }
                resolve(sentMessage);
            });
        });
    };

    const forexUpdate = (payload: ForexDataPayload)=>{
        return new Promise((resolve, reject) => {
            if (!socket?.connected) {
                reject("Socket not connected");
                return;
            }

            socket.timeout(30000).emit(FOREX_UPDATE, payload, (err: any, sentMessage: any) => {
                if (err) {
                    console.log({ err });
                    reject(err);
                    return;
                }
                resolve(sentMessage);
            });
        });
    }

    return {
        sendMessage,
        updateTypingStatus,
        updateChannelTypingStatus,
        registerUser,
        sendChannelMessage,
        forexUpdate,
        channelMessageNew
    };
};
