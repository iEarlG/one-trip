"use client";

import Image from "next/image";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoEdit } from "react-icons/tb";

declare global { 
    var cloudinary: any;
}

interface UploadImagesProps {
    onChange: (value: string) => void;
    value: string;
}

const UploadImages: React.FC<UploadImagesProps> = ({ onChange, value }) => {
    const handleUploads = useCallback((results: any) => {
        onChange(results.info.source_url);
    }, [onChange]);
    return ( 
        <CldUploadWidget
            uploadPreset="v1bpwrcj"
            onUpload={handleUploads}
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return ( 
                    <div 
                        className="relative flex flex-col justify-center items-center gap-4 text-neutral-600 
                        cursor-pointer border-2 border-dashed hover:opacity-70 transition p-20 border-neutral-300"
                        onClick={() => open?.()}
                    >
                        <TbPhotoEdit size={25}/>
                        <div className="font-semibold text-lg">Click to upload</div>

                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image 
                                    src={value}
                                    alt="Upload"
                                    style={{ objectFit: "cover" }}
                                    fill
                                />
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
}
 
export default UploadImages;