"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
    user: SafeUser;
    category: { 
        icon: IconType,
        label: string;
        desc: string;
    } | undefined;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
}) => {
    const { getByValues } = useCountries();

    const coordinates = getByValues(locationValue)?.latlng;
    return ( 
        <div className="flex flex-col col-span-4 gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center text-xl font-bold gap-2">
                    <div><span className="font-semibold text-lg text-sky-500 uppercase">Agent </span>{user?.name}</div>
                    <Avatar 
                        src={user?.image}
                    />
                </div>

                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div><span className="font-bold">{guestCount}</span> Guests</div>
                    <div><span className="font-bold">{roomCount}</span> Rooms</div>
                    <div><span className="font-bold">{bathroomCount}</span> Bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                    description={category.desc}
                />
            )}
        </div>
    );
}
 
export default ListingInfo;