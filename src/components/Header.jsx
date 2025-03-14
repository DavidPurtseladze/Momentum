import React from 'react';
import logo from '../assets/logo.svg';

const Header = () => {
    return (
        <header className="max-w-[105rem] w-full py-[1.875rem] mx-auto flex justify-between items-center">
            <div>
                <img src={logo} alt="Logo"/>
            </div>
            <div>
                <button className="py-2.5 px-5 text-base text-primary-text border border-purple rounded-md mr-10">თანამშრომლის შექმნა</button>
                <button className="py-2.5 px-5 text-base bg-purple text-white rounded-md">+ შექმენი ახალი დავალება</button>
            </div>
        </header>
    );
};

export default Header;