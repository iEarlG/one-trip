'use client';

import { BiSearch } from 'react-icons/bi';

const Search = () => {
    return ( 
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row justify-center items-center">
                <div className="text-sm font-medium px-6">Somewhere</div>
                <div className="hidden sm:block text-sm px-6 flex-1 text-center border-x-[1px] font-medium">Any weeks</div>

                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">Add Guest</div>
                    <div className="p-2 bg-sky-500 rounded-full text-white">
                        <BiSearch size={18}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Search;