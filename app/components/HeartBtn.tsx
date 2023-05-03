"use client";

import { SafeUser } from "../types";

interface HeartBtnProps {
    listingId: string;
    currentUser?: SafeUser | null;
}


const HeartBtn: React.FC<HeartBtnProps> = ({
    listingId,
    currentUser
}) => {
    return ( 
        <div>HeartBtn</div>
    );
}
 
export default HeartBtn;