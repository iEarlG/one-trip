"user client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface InfoProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Info: React.FC<InfoProps> = ({
    title,
    subtitle,
    value,
    onChange,
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);

    }, [onChange, value]);
    
    const onReduce = useCallback(() => {
        if(value === 1) { 
            return;
        }
        onChange(value - 1);

    }, [onChange, value]);

    return ( 
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-normal text-neutral-500">{subtitle}</div>
            </div>
                <div className="flex flex-row items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center text-neutral-600 cursor-pointer 
                        rounded-full border-[1px] border-neutral-400 hover:opacity-80 transition" onClick={onReduce}>
                        <AiOutlineMinus />
                    </div>
                    <div className="font-normal text-xl text-neutral-600">
                        {value}
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center text-neutral-600 cursor-pointer 
                        rounded-full border-[1px] border-neutral-400 hover:opacity-80 transition" onClick={onAdd}>
                        <AiOutlinePlus />
                    </div>
                </div>
        </div>
    );
}
 
export default Info;