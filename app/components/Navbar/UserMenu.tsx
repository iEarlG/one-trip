'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { AiOutlineMenu } from 'react-icons/ai';
import { SafeUser } from '@/app/types';
import Avatar from '../Avatar';
import MenuItems from './MenuItems';
import useRegisterModals from '@/app/hooks/useRegisterModals';
import useLoginModals from '@/app/hooks/useLoginModals';
import useRentModals from '@/app/hooks/useRentModals';

interface UserMenuProps {
    currentUsers?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUsers
}) => {
    const registerModal = useRegisterModals();
    const loginModal = useLoginModals();
    const rentModals = useRentModals();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = useCallback(() => {
        setIsOpen((index) => !index)
    }, [])

    const onRent = useCallback(() => {
        if(!currentUsers) { 
            return loginModal.onOpen();
        }
        rentModals.onOpen();
    }, [currentUsers, loginModal, rentModals]);
    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm px-4 rounded-full hover:bg-neutral-100 
                    transition cursor-pointer py-3 font-medium uppercase">OTH is your place
                </div>

                <div onClick={toggleMenu} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 
                    flex flex-row gap-3 items-center rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />

                    <div className="hidden md:block">
                        <Avatar src={currentUsers?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUsers ? (
                            <>
                                <MenuItems onClick={() => router.push("/trips")} label="My Trips" />
                                <MenuItems onClick={() => {}} label="My Favorites" />
                                <MenuItems onClick={() => {}} label="My reservations" />
                                <MenuItems onClick={() => {}} label="My properties" />
                                <MenuItems onClick={() => {}} label="My account" />
                                <hr />
                                <MenuItems onClick={rentModals.onOpen} label="OTH IS YOUR PLACE" />
                                <MenuItems onClick={() => signOut()} label="Logout" />
                            </>
                        ) : (
                            <>
                                <MenuItems onClick={loginModal.onOpen} label="Login" />
                                <MenuItems onClick={registerModal.onOpen} label="Sign up" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default UserMenu;