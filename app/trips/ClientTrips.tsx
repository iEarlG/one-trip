"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Headings from "../components/Headings";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCards from "../components/Listings/ListingCards";

interface ClientTripsProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}

const ClientTrips: React.FC<ClientTripsProps> = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled");

                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId("");
            });
    }, [router]);
    return ( 
        <Container>
            <Headings 
                title="My Trips"
                subTitle="View your trips and manage your bookings"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 "
            >
                {reservations.map((reservation) => (
                    <ListingCards 
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disable={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default ClientTrips;