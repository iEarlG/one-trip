"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";
import axios from "axios";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { toast } from "react-hot-toast";
import { categories } from "@/app/components/Navbar/Categories";
import Container from "@/app/components/Container";
import ListingHeader from "@/app/components/Listings/ListingHeader";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import useLoginModals from "@/app/hooks/useLoginModals";
import ListingReservations from "@/app/components/Listings/ListingReservations";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

interface ListingClientsProps {
    reservations?: SafeReservation[];
    listing: SafeListing & { 
        user: SafeUser 
    };
    currentUser?: SafeUser | null;
}

const ListingClients: React.FC<ListingClientsProps> = ({
    listing, 
    currentUser, 
    reservations = []
}) => {
    const loginModal = useLoginModals();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [rangeDate, setRangeDate] = useState<Range>(initialDateRange);

    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === listing.category);
    }, [listing.category]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const dateRange = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });
            dates = {...dates, ...dateRange};
        });

        return dates;
    }, [reservations]);
    
    const onCreateReservation = useCallback(() => {
        if (!currentUser) { 
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: rangeDate.startDate,
            endDate: rangeDate.endDate,
            listingId: listing?.id,
        })
        .then(() => {
            toast.success('Reserved successfully!');
            setRangeDate(initialDateRange);

            router.push('/trips');
        })
        .catch(() => {
            toast.error('Something went wrong!');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [currentUser, listing?.id, loginModal, totalPrice, router, rangeDate]);

    useEffect(() => {
      if (rangeDate.startDate && rangeDate.endDate) { 
        const DaysCount = differenceInCalendarDays(
            rangeDate.endDate,
            rangeDate.startDate,
        );
        if (DaysCount && listing.price) {
            setTotalPrice(DaysCount * listing.price);
        } else { 
            setTotalPrice(listing.price);
        }
      }
    }, [rangeDate, listing.price]);
    

    return ( 
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHeader 
                        id={listing.id}
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        currentUser={currentUser}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo 
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />

                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservations 
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setRangeDate(value)}
                                rangeDate={rangeDate}
                                onSubmit={onCreateReservation}
                                disable={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
 
export default ListingClients;