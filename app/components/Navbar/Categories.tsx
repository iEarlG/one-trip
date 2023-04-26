import Container from "../Container";

import { TbBeach, TbWindmill } from "react-icons/tb";
import { GiIsland, GiModernCity, GiFarmer } from "react-icons/gi";
import CategoryContent from "../CategoryContent";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        desc: "This property is located near the beach."
    },
    {
        label: 'Farms',
        icon: GiFarmer,
        desc: "This property is located at the freash, peaceful farms."
    },
    {
        label: 'Modern',
        icon: GiModernCity,
        desc: "This property is located at the modern city."
    },
]

const Categories = () => {
    return ( 
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryContent 
                        key={item.label} 
                        label={item.label}
                        desc={item.desc}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default Categories;