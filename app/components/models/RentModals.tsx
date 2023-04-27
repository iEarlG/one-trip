"use client";

import { useMemo, useState } from "react";

import useRentModals from "@/app/hooks/useRentModals";
import Modals from "./Modals";
import Headings from "../Headings";
import { categories } from "../Navbar/Categories";
import CategoryInputs from "../Input/CategoryInputs";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS { 
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTIONS = 4,
    PRICE = 5,
}

const RentModals = () => {
    const rentModals = useRentModals();
    const [steps, setSteps] = useState(STEPS.CATEGORY);

    const {
        register, handleSubmit, setValue, watch, 
        formState: { 
            errors, 
        }, 
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            description: "",
            imageSrc: "",
            title: "",
            location: null,
            guestCounts: 1,
            roomCounts: 1, 
            bathroomCounts: 1,
            price: 1,
            // bedCounts: 1,
        }
    });

    const category = watch("category");
    const setCustomValue = (id: string, value: any) => { 
        setValue(id, value, { 
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onBack = () => {
        setSteps((prev) => prev - 1);
    };
    const onNext = () => {
        setSteps((prev) => prev + 1);
    };

    const actionLabel = useMemo(() => {
        if (steps === STEPS.PRICE) {
            return "Create";
        }
        return "Next";
    }, [steps]);

    const secondaryActionLabel = useMemo(() => {
        if (steps === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back";
    }, [steps]);

    let bodyContents = (
        <div className="flex flex-col gap-8">
            <Headings 
                title="Which of these best describes your place?"
                subTitle="Choose your categories."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInputs 
                            onClick={(category) => setCustomValue("category", category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Modals 
            title="OTH IS YOUR PLACE"
            isOpen={rentModals.isOpen}
            onClose={rentModals.onClosed}
            onSubmit={rentModals.onClosed}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContents}
        />
    );
}
 
export default RentModals;