import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
    return (
        <div className="relative h-fit w-full flex flex-col">
            <label className="text-secondary-text text-base mb-1.5"
                   htmlFor="datepicker">დედლაინი</label>
            <DatePicker
                selected={props.selectedDate.date}
                onChange={(date) => props.setSelectedDate({date: date, error: false})}
                dateFormat="yyyy-MM-dd"
                id="datepicker"
                name="datepicker"
                placeholderText="Select a date"
                minDate={new Date()}
                className={`w-[19.375rem] bg-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${props.selectedDate.error ? 'border-priority-high' : ''}`}
            />
        </div>
    );
};

export default CustomDatePicker;
