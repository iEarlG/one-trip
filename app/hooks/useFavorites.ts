"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModals from "./useLoginModals";

interface IUseFavorites {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorites = ({ listingId, currentUser }: IUseFavorites) => {
    const router = useRouter();
    const loginModals = useLoginModals();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorited = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) { 
            return loginModals.onOpen();
        }

        try {
            let request;

            if (hasFavorited) { 
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else { 
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success("Success!");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }, [currentUser, hasFavorited, listingId, loginModals, router]);

    return {
        hasFavorited,
        toggleFavorited
    };
};

export default useFavorites;