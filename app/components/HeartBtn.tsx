"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";

interface HeartBtnProps {
    listingId: string;
    currentUser?: SafeUser | null;
}


const HeartBtn: React.FC<HeartBtnProps> = ({
    listingId,
    currentUser
}) => {
    const hasFavorited = false;
    
    const toggleFavorited = () => {

    };
    return ( 
        <div onClick={toggleFavorited} className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart size={25} className="fill-white absolute -top-[2px] -right-[2px]" />
            <AiFillHeart size={22} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </div>
    );
}
 
export default HeartBtn;