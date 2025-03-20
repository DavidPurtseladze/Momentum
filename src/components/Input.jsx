import React from 'react'
import checkGreen from "../assets/green-check.svg";
import checkRed from "../assets/red-check.svg";
import check from "../assets/check.svg";

export default function Input(props) {
    const validateInput = (value) => {
        const filteredValue = value.replace(/[^a-zA-Zა-ჰ\s]/g, "");

        let min = true;
        let max = true;

        if (filteredValue.length === 0) {
            props.setState({ input: filteredValue, error: { min: null, max: null } });
            return;
        }

        if (filteredValue.length < 2)
            min = false;

        if (filteredValue.length > 255)
            max = false;

        props.setState({ input: filteredValue, error: { min: min, max: max } });
    };

    return (
        <div>
            <label className="text-secondary-text text-sm font-medium"
                   htmlFor="name">{ props.label }</label>
            <input className="w-full h-[2.625rem] bg-white text-sm font-light text-light-black rounded-md border-[#CED4DA] border outline-0 pl-[0.875rem]" name={props.input} id={props.input} type="text"
                   value={props.state.input} onChange={(e) => validateInput(e.target.value)} />

            <div className="flex items-center gap-0.5">
                {props.state.error.min === true && <img src={checkGreen} alt="Check"/>}
                {props.state.error.min === false && <img src={checkRed} alt="Check"/>}
                {props.state.error.min === null && <img src={check} alt="Check"/>}

                <span className={`text-[0.625rem] font-[350] ` + (props.state.error.min ? `text-priority-low` : props.state.error.min === false ? `text-priority-high` : `text-secondary-text`)}>მინიმუმ 2 სიმბოლო</span>
            </div>
            <div className="flex items-center gap-0.5">
                {props.state.error.max === true && <img src={checkGreen} alt="Check"/>}
                {props.state.error.max === false && <img src={checkRed} alt="Check"/>}
                {props.state.error.max === null && <img src={check} alt="Check"/>}

                <span className={`text-[0.625rem] font-[350] ` + (props.state.error.max ? `text-priority-low` : props.state.error.max === false ? `text-priority-high` : `text-secondary-text`)}>მინიმუმ 255 სიმბოლო</span>
            </div>
        </div>
    )
}