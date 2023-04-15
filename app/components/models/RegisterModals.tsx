'use client';

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModals from "@/app/hooks/useRegisterModals";
import Modals from "./Modals";
import Headings from "../Headings";
import Inputs from "../Input/Inputs";
import Button from "../Button";

const RegisterModals = () => {
    const registerModal = useRegisterModals();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, }} = 
    useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            // password_confirmation: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClosed();
            })
            .catch(() => {
                toast.error("Something went wrong when submitting");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const signupContents = (
        <div className="flex flex-col gap-4">
            <Headings
                title="One Trip Home (OTH)"
                subTitle="Create an account to get started with OTH"
                center
            />
            <Inputs 
                id="email" 
                label="Email"
                disable={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Inputs 
                id="name" 
                label="First & Last Name"
                disable={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Inputs 
                id="password" 
                label="Password"
                type="password"
                disable={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const socialContents = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="Login with Google" icon={FcGoogle} onClick={() => {}} />
            <Button outline label="Login with Github" icon={AiFillGithub} onClick={() => {}} />

            <div className="text-neutral-500 font-light text-center mt-4">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Already have an OTH account?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={registerModal.onClosed}>Log in</div>
                </div>
            </div>
        </div>
    );

    return ( 
        <Modals 
            disable={isLoading}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClosed}
            onSubmit={handleSubmit(onSubmit)}
            title="Register"
            actionLabel="Continue"
            body={signupContents}
            footer={socialContents}
        />
    );
}
 
export default RegisterModals;