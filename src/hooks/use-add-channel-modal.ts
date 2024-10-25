import { create } from "zustand";

type Type = "group" | "private";

type AddChannelModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const useAddChannelModal = create<AddChannelModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
