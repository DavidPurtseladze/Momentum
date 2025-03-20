import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
    return (
        <div className="relative w-full">
            <DatePicker
                selected={props.selectedDate}
                onChange={(date) => props.setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                minDate={new Date()}
                className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>
    );
};

export default CustomDatePicker;
