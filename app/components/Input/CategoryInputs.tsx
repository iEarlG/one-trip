"use client";

import { IconType } from "react-icons";

interface CategoryInputsProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInputs: React.FC<CategoryInputsProps> = ({
    icon: Icon,
    label,
    selected,
    onClick,
}) => {
    return ( 
        <div 
            onClick={() => onClick(label)} 
            className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
            `}
        >
            <Icon size={25} />
            <div className="font-medium">
                {label}
            </div>
        </div>
    );
}
 
export default CategoryInputs;