"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";

interface ListingCardsProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disable?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCards: React.FC<ListingCardsProps> = ({ 
    data,
    reservation,
    onAction,
    disable,
    actionLabel,
    actionId = "",
    currentUser,
 }) => {
    const router = useRouter();
    const { getByValues } = useCountries();
    const location = getByValues(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disable) { 
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disable]);

    const price = useMemo(() => {
        if (reservation) { 
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) { 
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        
    }, []);

    return ( 
        <div>ListingCards</div>
    );
}
 
export default ListingCards;