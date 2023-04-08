import Container from "../Container";
import Logo from "./Logo";

const Navbvar = () => {
    return ( 
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-r-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                    </div>
                </Container>
            </div>
        </div>
     );
}
 
export default Navbvar;