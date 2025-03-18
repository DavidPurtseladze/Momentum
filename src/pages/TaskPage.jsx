import React, { useEffect, useState } from 'react';
import Header from "../components/Header.jsx";
import { useParams } from "react-router-dom";
import { APIURL, APIKEY } from "../config.js";
import axios from "axios";
import pieChart from '../assets/pie-chart.svg';
import user from '../assets/user.svg';
import calendar from '../assets/calendar.svg';
import Select from "../components/Select.jsx";

export default function TaskPage() {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState(null);
    const [statusesData, setStatusesData] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [commentText, setCommentText] = useState("");
    const { taskId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APIURL}/tasks/${taskId}`, {
                    headers: { Authorization: `Bearer ${APIKEY}` },
                });
                setTask(response.data);

                const responseStatuses = await axios.get(`${APIURL}/statuses`);
                setStatusesData(responseStatuses.data);

                setCurrentStatus({
                    id: response.data.status.id,
                    name: response.data.status.name,
                });
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };

        if (taskId) fetchData();
    }, [taskId]);

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

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

    const formatDate = (isoString) => {
        const days = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
        const date = new Date(isoString);

        const dayOfWeek = days[date.getUTCDay()];
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1); // Months are 0-based
        const year = date.getUTCFullYear();

        return `${dayOfWeek} - ${day}/${month}/${year}`;
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) {
            alert("შეავსეთ კომენტარი");
            return;
        }
        try {
            await axios.post(`${APIURL}/tasks/${taskId}/comments`, {
                text: commentText,
                // parent_id: 1,
            }, {
                headers: { Authorization: `Bearer ${APIKEY}` },
            });

            setCommentText("");
            console.log("Comment submitted successfully!");
        } catch (err) {

        }
    };

    if (!task || !statusesData) return <p>Loading...</p>;

    return (
        <>
            <Header openPopUp={open} setOpenPopUp={setOpen}/>

            <section className="max-w-[105rem] w-full mx-auto mt-10">
                <div className="flex items-center">
                    <div
                        className={`w-fit rounded-sm flex gap-1 p-1 border font-medium text-base leading-[150%] ${
                            task?.priority?.id ? getColor(task.priority.id) : ""
                        }`}
                    >
                        {task?.priority?.icon && <img src={task.priority.icon} alt="Priority Icon"/>}
                        {task?.priority?.name}
                    </div>
                    <div className="ml-2.5 w-fit text-white text-base rounded-[0.9375rem] py-1 px-5 bg-pink">
                        დიზაინი
                    </div>
                </div>

                <h1 className="font-semibold mt-3 text-primary-text">
                    {task?.name}
                </h1>

                <p className="text-lg leading-[150%] mt-9 text-black">
                    {task?.description}
                </p>

                <h2 className="text-2xl font-medium text-black mt-16">
                    დავალების დეტალები
                </h2>

                <div className="w-[31.25rem] mt-4">
                    <div className="grid grid-cols-2 justify-center text-base leading-[150%] py-5">
                        <span className="flex items-center w-fit">
                            <img className="float-left mr-1.5" src={pieChart} alt="Pie Chart"/>
                            სტატუსი
                        </span>
                        <div className="flex items-center">
                            <Select state={currentStatus} setState={setCurrentStatus} departamentData={statusesData}/>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 justify-center py-5">
                        <span className="flex items-center w-fit">
                            <img className="float-left mr-1.5" src={user} alt="Pie Chart"/>
                            თანამშრომელი
                        </span>
                        <div className="flex items-center">
                            <img className="w-8 h-8 mr-3 object-cover rounded-full" src={task.employee.avatar}
                                 alt="Avatar"/>
                            <div>
                                <span className="text-xs font-light">{task.employee.department.name}</span>

                                <h4 className="text-sm leading-[150%]">{task.employee.name} {task.employee.surname}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 justify-center py-5">
                        <span className="flex items-center w-fit">
                            <img className="float-left mr-1.5" src={calendar} alt="Pie Chart"/>
                            დავალების ვადა
                        </span>
                        <div className="flex items-center">
                            <span className="text-sm leadin-[150%] text-light-black">{formatDate(task.due_date)}</span>
                        </div>
                    </div>
                </div>


            </section>

            <div className="py-10 px-11 bg-light-pink">
                <div className="relative h-[8.4375rem]">
                    <textarea
                        className="outline-0 w-full h-[8.4375rem] bg-white text-sm font-[350] px-5 py-7 border border-[#ADB5BD] rounded-[0.625rem]"
                        type="text" placeholder="დაწერე კომენტარი" value={commentText} onChange={handleCommentChange} />
                    <button className="absolute right-4 bottom-4 rounded-[1.25rem] py-2 px-5 text-base text-white bg-purple" onClick={handleCommentSubmit}>
                        დააკომენტარე
                    </button>
                </div>
            </div>
        </>
    );
}
