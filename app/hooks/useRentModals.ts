"use client";

import { create } from "zustand";

interface RentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClosed: () => void;
}

const useRentModals = create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClosed: () => set({ isOpen: false }),
}));

export default useRentModals;