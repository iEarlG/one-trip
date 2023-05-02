"use client";

import { useMemo, useState } from "react";

import useRentModals from "@/app/hooks/useRentModals";
import Modals from "./Modals";
import Headings from "../Headings";
import { categories } from "../Navbar/Categories";
import CategoryInputs from "../Input/CategoryInputs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelected from "../Input/CountrySelected";
import dynamic from "next/dynamic";
import Info from "../Input/Info";
import UploadImages from "../Input/UploadImages";
import Inputs from "../Input/Inputs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [steps, setSteps] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

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
            guestCount: 1,
            roomCount: 1, 
            bathroomCount: 1,
            price: 1,
            // bedCounts: 1,
        }
    });

    const category = watch("category");
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

    const Maps = useMemo(() => dynamic(() => import("../Maps"), {
        ssr: false,
    }), [location]);

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (steps !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        axios.post("/api/listing", data)
            .then(() => {
                toast.success("Successfully created listing!.");
                router.refresh();
                reset();
                setSteps(STEPS.CATEGORY);
                rentModals.onClosed();
            })
            .catch(() => {
                toast.error("Server went wrong. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

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

    if (steps === STEPS.LOCATION) { 
        bodyContents = (
            <div className="flex flex-col gap-8">
                <Headings 
                    title="Where is your place located?"
                    subTitle="Enter your address."
                />
                <CountrySelected 
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}
                />
                <Maps 
                    center={location?.latlng}
                />
            </div>
        );
    };

    if (steps === STEPS.INFO) {
        bodyContents = (
            <div className="flex flex-col gap-8">
                <Headings 
                    title="What's your place looks like?"
                    subTitle="We'll use this info to help you create your listing."
                />
                <Info 
                    title="Guest"
                    subtitle="How many guests can your place accommodate?"
                    onChange={(value) => setCustomValue("guestCount", value)}
                    value={guestCount}
                />
                <hr />
                <Info 
                    title="Rooms"
                    subtitle="How many rooms will you get?"
                    onChange={(value) => setCustomValue("roomCount", value)}
                    value={roomCount}
                />
                <hr />
                <Info 
                    title="Bathrooms"
                    subtitle="How many bathrooms will you get?"
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                    value={bathroomCount}
                />
            </div>
        );
    };

    if (steps === STEPS.IMAGES) {
        bodyContents = (
            <div className="flex flex-col gap-8">
                <Headings 
                    title="What's your place looks like? Upload photo for reference."
                    subTitle="We'll use this info to help you create your listing."
                />
                
                <UploadImages 
                    value={imageSrc}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />
            </div>
        );
    };

    if (steps === STEPS.DESCRIPTIONS) {
        bodyContents = (
            <div className="flex flex-col gap-8">
                <Headings 
                    title="How would you describe your place?"
                    subTitle="Short & sweet is the way to go."
                />
                <Inputs 
                    id="title"
                    label="Title"
                    disable={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Inputs 
                    id="description"
                    label="Description"
                    disable={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    };

    if (steps === STEPS.PRICE) {
        bodyContents = (
            <div className="flex flex-col gap-8">
                <Headings 
                    title="Set your price"
                    subTitle="How much do you want to charge per night?"
                />
                <Inputs 
                    id="price"
                    label="Price"
                    type="number"
                    formatPrice={true}
                    disable={isLoading}
                    errors={errors}
                    register={register}
                    required
                />
            </div>
        );
    };

    return (
        <Modals 
            title="OTH IS YOUR PLACE"
            isOpen={rentModals.isOpen}
            onClose={rentModals.onClosed}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContents}
        />
    );
}
 
export default RentModals;