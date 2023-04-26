'use client';

import Container from "../Container";

import { TbBeach, TbWindmill } from "react-icons/tb";
import { GiIsland, GiModernCity, GiFarmer, GiCampingTent, GiMountainRoad, GiBattleship } from "react-icons/gi";
import { FaHome, FaHandPeace } from "react-icons/fa";
import { MdMeetingRoom, MdGolfCourse } from "react-icons/md";
import CategoryContent from "../CategoryContent";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        desc: "This property is located near the beach."
    },
    {
        label: 'Farms',
        icon: GiFarmer,
        desc: "This property is located at the freash, peaceful farms."
    },
    {
        label: 'Modern',
        icon: GiModernCity,
        desc: "This property is located at the modern city."
    },
    {
        label: 'Small Home',
        icon: FaHome,
        desc: "This property is a small size home, just for 2-3 peoples."
    },
    {
        label: 'Camping',
        icon: GiCampingTent,
        desc: "This property is located at the camping area. It's a perfect place to relax and enjoy the nature."
    },
    {
        label: 'Country Side',
        icon: GiMountainRoad,
        desc: "This property is located at the country side."
    },
    {
        label: 'Cruise Ship',
        icon: GiBattleship,
        desc: "This property is located at the cruise ship."
    },
    {
        label: 'Private Room',
        icon: MdMeetingRoom,
        desc: "This property is a private room."
    },
    {
        label: 'Private Island',
        icon: GiIsland,
        desc: "This property is a private island."
    },
    {
        label: 'Play & Pools',
        icon: MdGolfCourse,
        desc: "This property is located at the play & pools area."
    },
    {
        label: 'Off Grid',
        icon: FaHandPeace,
        desc: "This property is located at the off grid area. It's a perfect place to relax and enjoy the nature."
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathName = usePathname();

    const isMainPage = pathName === "/";

    if(!isMainPage) {
        return null;
    }
    return ( 
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryContent 
                        key={item.label} 
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default Categories;