import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCards from "./components/Listings/ListingCards";

export default async function Home() {
  const listings = getListings();
  
  if ((await listings).length === 0) {
    return (
      <EmptyState showReset />
    );
  };

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {(await listings).map((listing: any) => {
          return (
            <ListingCards 
              key={listing.id}
              data={listing}
            />
          )
        })}
      </div>
    </Container>
  );
};
