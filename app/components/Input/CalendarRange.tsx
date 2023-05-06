"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css'; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface CalendarRangeProps {
    value: Range;
    disabledDates?: Date[]; 
    onChange: (value: RangeKeyDict) => void;
}

const CalendarRange: React.FC<CalendarRangeProps> = ({
    value,
    disabledDates,
    onChange
}) => {
    return ( 
        <DateRange 
            rangeColors={["#0EA5E9"]}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    );
}
 
export default CalendarRange;