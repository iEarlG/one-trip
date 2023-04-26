'use client';

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
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

        if(params) { 
            currentQuery = queryString.parse(params.toString());
        }

        const newQuery: any = {
            ...currentQuery,
            category: label,
        }

        if(params?.get("category") === label) {
            delete newQuery.category;
        }

        const url = queryString.stringifyUrl({
            url: "/",
            query: newQuery,
        }, { skipNull: true });

        router.push(url);
    }, [label, params, router]);
    return (  
        <div className={`flex flex-col items-center justify-center p-3 gap-2 border-b-2
         hover:text-neutral-800 transition cursor-pointer 
         ${selected ? "border-b-neutral-800" : "border-b-transparent"}
         ${selected ? "text-neutral-800" : "text-neutral-500"}`
        }
        onClick={handleClicked}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
}
 
export default CategoryContent;