'use client';

import { useState, useEffect, useCallback } from "react";

import { IoMdClose } from "react-icons/io";

interface ModalsProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;

    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disable?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const Modals: React.FC<ModalsProps> = ({
    isOpen, onClose, onSubmit, title, body, footer, actionLabel, disable, secondaryAction, secondaryLabel,
}) => {
    const [showModals, setShowModals] = useState(isOpen);

    useEffect(() => {
      setShowModals(isOpen);
    }, [isOpen]);
    
    const handleClosed = useCallback(() => {
        if(disable) { 
            return;
        }
        setShowModals(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disable, onClose]);

    const handleSubmitted = useCallback(() => {
        if(disable) { 
            return;
        }
        onSubmit();
    }, [disable, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if(disable || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disable, secondaryAction]);

    if (!isOpen) { 
        return null;
    }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto 
                fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
            
                <div className="relative w-full h-full md:h-auto lg:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto">
                    {/* CONTENTS */}
                    <div className={`translate duration-300 h-full 
                        ${showModals ? "translate-y-0" : "translate-y-full"}
                        ${showModals ? "opacity-100" : "opacity-0"}`
                        }>
                            <div className="translate w-full h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg 
                                relative flex flex-col bg-white outline-none focus:outline-none">
                                {/* HEADER */}
                                <div className="flex items-center p-6 rounded-t relative border-b-[1px]">
                                    <button className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                        <IoMdClose />
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Modals;