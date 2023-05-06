"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
    icon,
    label,
    description
}) => {
    return ( 
        <div>ListingCategory</div>
    );
}
 
export default ListingCategory;