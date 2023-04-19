'use client';

import { useCallback, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItems from './MenuItems';
import useRegisterModals from '@/app/hooks/useRegisterModals';
import useLoginModals from '@/app/hooks/useLoginModals';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
    currentUsers?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUsers
}) => {
    const registerModal = useRegisterModals();
    const loginModal = useLoginModals();
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = useCallback(() => {
        setIsOpen((index) => !index)
    }, [])
    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={() => {}} className="hidden md:block text-sm px-4 rounded-full hover:bg-neutral-100 
                    transition cursor-pointer py-3 font-medium uppercase">OTH is your place
                </div>

                <div onClick={toggleMenu} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 
                    flex flex-row gap-3 items-center rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />

                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUsers ? (
                            <>
                                <MenuItems onClick={() => {}} label="My Trips" />
                                <MenuItems onClick={() => {}} label="My Favorites" />
                                <MenuItems onClick={() => {}} label="My reservations" />
                                <MenuItems onClick={() => {}} label="My properties" />
                                <MenuItems onClick={() => {}} label="My account" />
                                <hr />
                                <MenuItems onClick={() => {}} label="OTH IS YOUR PLACE" />
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