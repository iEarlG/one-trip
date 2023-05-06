"use client";

import { Range } from "react-date-range";
import CalendarRange from "../Input/CalendarRange";
import Button from "../Button";

interface ListingReservationsProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    rangeDate: Range;
    onSubmit: () => void;
    disable?: boolean;
    disabledDates: Date[];
}

const ListingReservations: React.FC<ListingReservationsProps> = ({
    price,
    totalPrice,
    onChangeDate,
    rangeDate,
    onSubmit,
    disable,
    disabledDates,
}) => {
    return ( 
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">$ {price}</div>

                <div className="font-light text-neutral-600">Night</div>
            </div>
            <hr />

            <CalendarRange
                value={rangeDate}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />

            <div className="p-4">
                <Button 
                    disable={disable}
                    label="Reserve"
                    onClick={onSubmit}
                />
            </div>

            <div className="flex flex-row items-center justify-between font-semibold text-lg p-4">
                <div>Total</div>
                <div>${totalPrice} <span className="font-normal text-base">Nights</span></div>
            </div>
        </div>
    );
}
 
export default ListingReservations;