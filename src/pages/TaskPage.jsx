import React, { useEffect, useState } from 'react';
import Header from "../components/Header.jsx";
import { useParams } from "react-router-dom";
import pieChart from '../assets/pie-chart.svg';
import user from '../assets/user.svg';
import calendar from '../assets/calendar.svg';
import leftArrow from '../assets/left-arrow.svg';
import Select from "../components/Select.jsx";
import {addComment, getDepartments, getStatuses, getTaskComments, getTaskDetails, updateTaskStatus} from "../Api.js";
import PopUp from "../components/PopUp.jsx";

export default function TaskPage() {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState(null);
    const [departmentsData, setDepartmentsData] = useState(null);

    const [statusesData, setStatusesData] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState("");

    const [replyId, setReplyId] = useState();
    const [replyComment, setReplyComment] = useState("");


    const { taskId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const task = await getTaskDetails(taskId);
            setTask(task);

            const statuses = await getStatuses();
            setStatusesData(statuses);
            setCurrentStatus({
                id: task.status.id,
                name: task.status.name,
            });

            const comments = await getTaskComments(taskId);
            setComments(comments);

            const departments = await getDepartments();
            setDepartmentsData(departments);
        };

        if (taskId) fetchData();
    }, [taskId]);

    useEffect(() => {
        if (currentStatus === null) return;

        updateTaskStatus(taskId, currentStatus.id);
    }, [currentStatus]);

    const handleReplyCommentChange = (e) => {
        setReplyComment(e.target.value);
    };

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

    const handleCommentSubmit = async (isReply = false) => {
        const text = isReply ? replyComment : commentText;

        if (!text.trim()) {
            alert("შეავსეთ კომენტარი");
            return;
        }

        if (isReply) {
            const response = await addComment(taskId, text, replyId)

            if (!response) return;

            setComments((prevComments) => {
                const updatedComments = prevComments.map(comment => {
                    if (comment.id === replyId) {
                        if (!comment.sub_comments.some(subComment => subComment.id === response.id)) {
                            return {
                                ...comment,
                                sub_comments: [
                                    ...comment.sub_comments,
                                    {
                                        id: response.id,
                                        text: response.text,
                                        task_id: response.task_id,
                                        parent_id: response.parent_id,
                                        author_avatar: response.author_avatar,
                                        author_nickname: response.author_nickname
                                    }
                                ]
                            };
                        }
                    }
                    return comment;
                });
                return updatedComments;
            });

            setReplyComment("");
            setReplyId(null);
        } else {
            const response = await addComment(taskId, text)

            if (!response) return;

            setComments((prevComments) => [
                {
                    id: response.id,
                    parent_id: null,
                    text: response.text,
                    task_id: response.task_id,
                    author_avatar: response.author_avatar,
                    author_nickname: response.author_nickname,
                    sub_comments: []
                },
                ...prevComments,
            ]);

            setCommentText("");
        }
    };

    const handleReplyClick = (commentId) => {
        setReplyId(replyId === commentId ? null : commentId);
        setReplyComment("");
    };

    if (!task || !statusesData) return <p>Loading...</p>;

    return (
        <>
            <Header openPopUp={open} setOpenPopUp={setOpen}/>

            <section className="flex justify-between max-w-[105rem] w-full mx-auto mt-10">
                <div>
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
                </div>

                <div className="max-w-[46.25rem] w-full mt-15 py-10 px-11 bg-light-pink">
                    <div className="relative h-[8.4375rem]">
                        <textarea
                        className="outline-0 resize-none w-full h-[8.4375rem] bg-white text-sm font-[350] px-5 py-7 border border-[#ADB5BD] rounded-[0.625rem]"
                        type="text" placeholder="დაწერე კომენტარი" value={commentText} onChange={handleCommentChange}/>
                        <button
                            className="absolute right-4 bottom-4 rounded-[1.25rem] py-2 px-5 text-base text-white bg-purple"
                            onClick={() => handleCommentSubmit(false)}
                        >
                            დააკომენტარე
                        </button>
                    </div>

                    <div className="flex items-center mt-16">
                        <h2 className="font-medium text-xl text-black">კომენტარები</h2>
                        <span className="ml-2 bg-purple py-0.5 px-2.5 rounded-full text-sm text-white">
                             {Array.isArray(comments) ? comments.reduce((total, comment) => total + 1 + (comment.sub_comments ? comment.sub_comments.length : 0), 0) : 0}
                        </span>
                    </div>

                    {comments && comments.map((comment) => (
                        <div key={comment.id}>
                            <div className="mt-10 flex gap-3">
                                <img className="w-10 h-10 object-cover rounded-full"
                                     src={comment.author_avatar}
                                     alt="Avatar"/>
                                <div>
                                    <h3 className="text-lg font-medium text-primary-text">{comment.author_nickname}</h3>
                                    <p className="mt-2 text-base font-[350] text-secondary-text">{comment.text}</p>
                                </div>
                            </div>
                            <button className="ml-[3.125rem] mt-4 flex items-center gap-1.5 text-purple" onClick={() => handleReplyClick(comment.id)}>
                                <img src={leftArrow} alt="Arrow"/>
                                უპასუხე
                            </button>

                            {comment.sub_comments && comment.sub_comments.map((subComment) => (
                                <div key={subComment.id} className="ml-[3.125rem] mt-5 flex gap-3">
                                    <img className="w-10 h-10 object-cover rounded-full"
                                         src={subComment.author_avatar}
                                         alt="Avatar"/>
                                    <div>
                                        <h3 className="text-lg font-medium text-primary-text">{subComment.author_nickname}</h3>
                                        <p className="mt-2 text-base font-[350] text-secondary-text">{subComment.text}</p>
                                    </div>
                                </div>
                            ))}


                            {replyId === comment.id && (
                                <div className="relative h-[8.4375rem] mt-4 ml-[3.125rem]">
                                    <textarea
                                        className="outline-0 resize-none w-full h-[8.4375rem] bg-white text-sm font-[350] px-5 py-7 border border-[#ADB5BD] rounded-[0.625rem]"
                                        type="text"
                                        placeholder="დაწერე კომენტარი"
                                        value={replyComment}
                                        onChange={handleReplyCommentChange}
                                    />
                                    <button
                                        className="absolute right-4 bottom-4 rounded-[1.25rem] py-2 px-5 text-base text-white bg-purple"
                                        onClick={() => handleCommentSubmit(true)}
                                    >
                                        დააკომენტარე
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <PopUp open={open} setOpen={setOpen} departamentData={departmentsData}></PopUp>
        </>
    );
}
