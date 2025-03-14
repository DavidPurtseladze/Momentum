import React from 'react';
import comments from '../assets/comments.svg';

export default function DropDown(props) {
    return (
        <div className="w-full p-5 rounded-[0.9375rem] border border-yellow">

            <div className="flex items-center">
                <div className="w-fit rounded-sm flex gap-4 p-1 border border-yellow font-medium text-xs leading-[150%] text-yellow">
                    <img src="https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg" alt=""/>
                    საშვალო
                </div>
                <div className="ml-2.5 w-fit text-white text-xs rounded-[0.9375rem] py-1 px-5 bg-pink">
                    დიზაინი
                </div>
                <span className="ml-auto text-xs text-primary-text">
                     22 იანვ, 2022
                </span>
            </div>


            <div className="px-2.5 mt-7">
                <h3 className="text-primary-text text-[0.9375rem] font-medium">
                    Redberry-ს საიტის ლენდინგის დიზაინი
                </h3>

                <p className="text-primary-text text-sm">
                    შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას.
                </p>
            </div>

            <div className="flex justify-between items-center mt-7">
                <img className="w-[1.9375rem] h-[1.9375rem] object-cover rounded-full" src="https://momentum.redberryinternship.ge/storage/employee-avatars/V5VtGqkJz7QuXucTuuEIU9T5sobbZhXC88pTFhYQ.jpg" alt="Avatar Photo"/>

                <div className="flex">
                    <img src={comments} alt="Comments"/>
                    <span className="ml-1">8</span>
                </div>
            </div>

        </div>
    )
}