"use client";

import { create } from "zustand";

interface LoginInModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClosed: () => void;
}

const useLoginModals = create<LoginInModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClosed: () => set({ isOpen: false }),
}));

export default useLoginModals;