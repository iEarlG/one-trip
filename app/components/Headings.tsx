'use client';

interface HeadingsProps {
    title: string;
    subTitle?: string;
    center?: boolean;
}

const Headings: React.FC<HeadingsProps> = ({
    title, subTitle, center,
}) => {
    return ( 
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-1xl font-bold">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subTitle}
            </div>
        </div>
    );
}
 
export default Headings;