'use client';

interface MenuItemsProps {
    onClick: () => void;
    label: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({
    onClick, label,
}) => {
    return ( 
        <div className="px-4 py-3 hover:bg-neutral-100 transition font-medium text-center" onClick={onClick}>
            {label}
        </div>
    );
}
 
export default MenuItems;