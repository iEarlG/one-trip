"use client";

import { create } from "zustand";

interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClosed: () => void;
}

const useRegisterModals = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClosed: () => set({ isOpen: false }),
}));

export default useRegisterModals;