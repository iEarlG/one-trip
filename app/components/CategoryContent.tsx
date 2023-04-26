import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

interface CategoryContentProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryContent: React.FC<CategoryContentProps> = ({ icon: Icon, label, selected }) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClicked = useCallback(() => {
        let currentQuery = {};
    }, []);
    return (  
        <div className={`flex flex-col items-center justify-center p-3 gap-2 border-b-2
         hover:text-neutral-800 transition cursor-pointer 
         ${selected ? "border-b-neutral-800" : "border-b-transparent"}
         ${selected ? "text-neutral-800" : "text-neutral-500"}`
        }>
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
}
 
export default CategoryContent;