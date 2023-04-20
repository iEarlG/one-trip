'use client';

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModals from "@/app/hooks/useRegisterModals";
import Modals from "./Modals";
import Headings from "../Headings";
import Inputs from "../Input/Inputs";
import Button from "../Button";
import useLoginModals from "@/app/hooks/useLoginModals";
import { useRouter } from "next/navigation";

const LoginModals = () => {
    const router = useRouter();
    const loginModal = useLoginModals();
    const registerModal = useRegisterModals();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, }} = 
    useForm<FieldValues>({
        defaultValues: {
            // name: "",
            email: "",
            password: "",
            // password_confirmation: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok) {
                toast.success("Login successful!");
                router.refresh();
                loginModal.onClosed();
            }
            if(callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const signupContents = (
        <div className="flex flex-col gap-4">
            <Headings
                title="Welcome back to OTH!!"
                subTitle="Login your account to continue using OTH"
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
            {/* <Inputs 
                id="name" 
                label="Full name"
                disable={isLoading}
                register={register}
                errors={errors}
                required
            /> */}
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
            <Button outline label="Login with Google" icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label="Login with Github" icon={AiFillGithub} onClick={() => signIn('github')} />

            <div className="text-neutral-500 font-light text-center mt-4">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Dont have an account yet?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={loginModal.onClosed}>Signup</div>
                </div>
            </div>
        </div>
    );

    return ( 
        <Modals 
            disable={isLoading}
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClosed}
            onSubmit={handleSubmit(onSubmit)}
            title="Login"
            actionLabel="Continue"
            body={signupContents}
            footer={socialContents}
        />
    );
}
 
export default LoginModals;