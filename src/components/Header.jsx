import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";

export default function Header(props) {
    return (
        <header className="max-w-[105rem] w-full py-[1.875rem] mx-auto flex justify-between items-center">
            <Link to="/">
                <img src={logo} alt="Logo"/>
            </Link>

            <div>
                <button className="py-2.5 px-5 text-base text-primary-text border border-purple hover:border-light-purple duration-300 rounded-md mr-10" onClick={() => props.setOpenPopUp(true)}>თანამშრომლის შექმნა</button>
                <Link to="/create-task">
                    <button className="py-2.5 px-5 text-base bg-purple hover:bg-light-purple duration-300 text-white rounded-md">+ შექმენი ახალი დავალება</button>
                </Link>
            </div>
        </header>
    );
};

