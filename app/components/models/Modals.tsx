'use client';

import { useState, useEffect, useCallback } from "react";

import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalsProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;

    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    disable?: boolean;
    actionLabel: string;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modals: React.FC<ModalsProps> = ({
    isOpen, onClose, onSubmit, title, body, footer, actionLabel, disable, secondaryAction, secondaryActionLabel,
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
                            <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
                                <button className="p-1 border-0 hover:opacity-70 transition absolute left-9" onClick={handleClosed}>
                                    <IoMdClose size={18} />
                                </button>

                                <div className="text-lg font-medium">{title}</div>
                            </div>
                            
                            {/* BODY */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction && secondaryActionLabel && (

                                        <Button 
                                            outline 
                                            disable={disable} 
                                            label={secondaryActionLabel} 
                                            onClick={handleSecondaryAction} 
                                        />
                                    )}
                                        <Button 
                                            disable={disable} 
                                            label={actionLabel} 
                                            onClick={handleSubmitted} 
                                        />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Modals;