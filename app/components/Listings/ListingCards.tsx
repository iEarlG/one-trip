"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";

import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import HeartBtn from "../HeartBtn";

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

        return `${format(start, "PP")} - ${format(end, "PP")}`;
    }, [reservation]);

    return ( 
        <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/listings/${data.id}`)}>
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square relative w-full overflow-hidden rounded-xl">
                    <Image 
                        alt="Listing"
                        src={data.imageSrc}
                        className="object-cover h-full w-full group hover:scale-110 transition"
                        fill
                    />
                    <div className="absolute top-3 right-3">
                        <HeartBtn 
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ListingCards;