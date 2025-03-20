import React from 'react';
import comments from '../assets/comments.svg';
import {Link} from "react-router-dom";

export default function DropDown(props) {
    const getColor = (number) => {
        switch (number) {
            case 1:
                return "text-priority-low border-priority-low";
            case 2:
                return "text-priority-med border-priority-med";
            default:
                return "text-priority-high border-priority-high";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("ka-GE", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <Link to={`/task/${props.data.id}`}>
            <div className={`w-full p-5 rounded-[0.9375rem] border ${props.data.status.id === 1 ? "border-yellow" : props.data.status.id === 2 ? "border-orange" : props.data.status.id === 3 ? "border-pink" : "border-blue"}`} >
                <div className="flex items-center">
                    <div className={`w-fit rounded-sm flex gap-1 p-1 border font-medium text-xs leading-[150%] ${getColor(props.data.priority.id)}`}>
                        <img src={props.data.priority.icon} alt=""/>
                        {props.data.priority.name}
                    </div>
                    <div className="ml-2.5 w-fit text-white text-xs rounded-[0.9375rem] py-1 px-5 bg-pink">
                        დიზაინი
                    </div>
                    <span className="ml-auto text-xs text-primary-text">
                         {formatDate(props.data.due_date)}
                    </span>
                </div>


                <div className="px-2.5 mt-7">
                    <h3 className="text-primary-text text-[0.9375rem] font-medium">
                        {props.data.name}
                    </h3>

                    <p className="text-primary-text text-sm mt-3">
                        {props.data.description}
                    </p>
                </div>

                <div className="flex justify-between items-center mt-7">
                    <img className="w-[1.9375rem] h-[1.9375rem] object-cover rounded-full" src={props.data.employee.avatar} alt="Avatar Photo"/>

                    <div className="flex">
                        <img src={comments} alt="Comments"/>
                        <span className="ml-1">{props.data.total_comments}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}