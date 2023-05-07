
import getCurrentUsers from "@/app/actions/getCurrentUsers";
import { getListingById } from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClients from "./ListingClients";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUsers();

    if (!listing) {
        return (
            <EmptyState />
        );
    };
    return ( 
        <ListingClients 
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
        />
    );
}
 
export default ListingPage;