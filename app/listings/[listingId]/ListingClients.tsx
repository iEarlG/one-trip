"use client";

import { useMemo } from "react";
import { Reservation } from "@prisma/client";

import { SafeListing, SafeUser } from "@/app/types";
import { categories } from "@/app/components/Navbar/Categories";
import Container from "@/app/components/Container";
import ListingHeader from "@/app/components/Listings/ListingHeader";

interface ListingClientsProps {
    reservations?: Reservation[];
    listing: SafeListing & { 
        user: SafeUser 
    };
    currentUser?: SafeUser | null;
}

const ListingClients: React.FC<ListingClientsProps> = ({
    listing, currentUser
}) => {
    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === listing.category);
    }, [listing.category]);

    return ( 
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHeader 
                        id={listing.id}
                        title={listing.title}
                        imgSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </Container>
    );
}
 
export default ListingClients;