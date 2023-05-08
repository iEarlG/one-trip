
import EmptyState from "../components/EmptyState";

import getCurrentUsers from "../actions/getCurrentUsers";
import getReservations from "../actions/getReservations";
import ClientTrips from "./ClientTrips";

const TripsPage = async () => {
    const currentUser = await getCurrentUsers();

    if (!currentUser) { 
        return ( 
            <EmptyState 
                title="You are not logged in"
                subtitle="Please log in to view your trips"
            />
        );
    }

    const reservations = await getReservations({
        userId: currentUser.id,
    });

    if (reservations.length === 0) { 
        return ( 
            <EmptyState 
                title="You have no reservations"
                subtitle="You have no reservations yet"
            />
        );
    }

    return (
        <ClientTrips 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage;