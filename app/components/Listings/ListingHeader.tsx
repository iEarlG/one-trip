"use client";

import Image from "next/image";

import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Headings from "../Headings";
import HeartBtn from "../HeartBtn";

interface ListingHeaderProps {
    id: string;
    title: string;
    locationValue: string;
    imgSrc: string;
    currentUser?: SafeUser | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
    id,
    title,
    locationValue,
    imgSrc,
    currentUser,
}) => {
    const { getByValues } = useCountries();

    const location = getByValues(locationValue);
    return (  
        <>
            <Headings 
                title={title}
                subTitle={`${location?.region}, ${location?.label}`}
            />

            <div className="w-full h-[60vh] relative overflow-hidden rounded-xl">
                <Image 
                    src={imgSrc}
                    alt="Image"
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartBtn 
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}
 
export default ListingHeader;