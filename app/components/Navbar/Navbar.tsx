'use client';

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUsers?: SafeUser | null;
}

const Navbvar: React.FC<NavbarProps> = ({
    currentUsers
}) => {
    return ( 
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-r-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu currentUsers={currentUsers} />
                    </div>
                </Container>
            </div>
        </div>
    );
}
 
export default Navbvar;