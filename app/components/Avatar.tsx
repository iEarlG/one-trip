'use client';

import Image from "next/image";

const Avatar = () => {
    return ( 
        <Image 
            src="/images/placeholder.png"
            alt="Avatar"
            className="rounded-full"
            height="25"
            width="25"
        />
    );
}
 
export default Avatar;