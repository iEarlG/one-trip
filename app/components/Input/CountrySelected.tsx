"use client";

import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';

import useCountries from '@/app/hooks/useCountries';

export type CountrySelectedValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

interface CountrySelectedProps {
    value?: CountrySelectedValue;
    onChange: (value: CountrySelectedValue) => void;
}

const CountrySelected: React.FC<CountrySelectedProps> = ({  value, onChange, }) => 
{
    const { getAll } = useCountries();
    return ( 
        <div>
            <Select 
                placeholder="Select a country"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectedValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <ReactCountryFlag 
                            className="w-[1rem] h-[1rem]"
                            countryCode={option.value}
                            aria-label={option.label}
                            svg
                        />
                        <div>{option.label}, 
                            <span className="text-neutral-800 ml-1">{option.region}, </span>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}
 
export default CountrySelected;