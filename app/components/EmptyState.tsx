"use client";

import { useRouter } from "next/navigation";
import Headings from "./Headings";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
    title = "Currently there is no match for your filters on our database!", 
    subtitle = "Try changing your current filters", 
    showReset 
}) => {
    const router = useRouter();
    return ( 
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Headings 
                title={title}
                subTitle={subtitle}
                center
            />

            <div className="w-48 mt-4">
                {showReset && (
                    <Button 
                        outline
                        label="Reset Filters"
                        onClick={() => router.push("/")}
                    />
                )}
            </div>
        </div>
    );
}
 
export default EmptyState;