'use client';

import { IconType } from "react-icons/lib";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disable?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label, onClick, disable, outline, small, icon: Icon,
}) => {
    return ( 
        <button className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition w-full rounded-lg
            ${outline ? "bg-white": "bg-sky-500"}
            ${outline ? "border-black": "border-sky-500"}
            ${outline ? "text-black": "text-white"}
            ${small ? "py-1": "py-3"}
            ${small ? "text-sm": "text-md"}
            ${small ? "font-light": "font-medium"}
            ${small ? "border-[1px]": "border-[2px]"}`}
            onClick={onClick}
            disabled={disable}
        >
            {Icon && <Icon size={24} className="abosolute gap-3 left-4" />}
            {label}
        </button>
    );
}
 
export default Button;