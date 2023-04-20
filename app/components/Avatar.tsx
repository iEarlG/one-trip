'use client';

import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return ( 
        <Image 
            src={src || "/images/placeholder.png"}
            alt="Avatar"
            className="rounded-full"
            height="25"
            width="25"
        />
    );
}
 
export default Avatar;