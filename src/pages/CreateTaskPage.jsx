import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Input from "../components/Input.jsx";
import checkGreen from "../assets/green-check.svg";
import checkRed from "../assets/red-check.svg";
import check from "../assets/check.svg";
import axios from "axios";
import {APIKEY, APIURL} from "../config.js";
import Select from "../components/Select.jsx";
import CustomDatePicker from "../components/DatePicker.jsx";

export default function CreateTaskPage() {
    const [open, setOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);

    const [statusesData, setStatusesData] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);

    const [priorityData, setPriorityData] = useState(null);
    const [currentPriority, setCurrentPriority] = useState(null);

    const [departmentsData, setDepartmentsData] = useState(null);
    const [currentDepartment, setCurrentDepartment] = useState(null);

    const [employeeData, setEmployeeData] = useState(null);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const [nameInput, setNameInput] = useState({ input: "", error: { min: null, max: null } });
    const [descriptionInput, setDescriptionInput] = useState({ input: "", error: { min: null, max: null } });

    const handleCreateTask = async () => {
        // Validate name and description before submitting
        if (!nameInput.input.trim() || !descriptionInput.input.trim()) {
            alert("გთხოვთ შეავსოთ ყველა ველი");
            return;
        }

        try {
            const payload = {
                name: nameInput.input,
                description: descriptionInput.input,
                due_date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
                status_id: currentStatus ? currentStatus.id : null,
                employee_id: currentEmployee ? currentEmployee.id : null,
                priority_id: currentPriority ? currentPriority.id : null,
            };

            const response = await axios.post(`${APIURL}/tasks`, payload, {
                headers: { Authorization: `Bearer ${APIKEY}` },
            });

            console.log("Task created successfully!", response.data);
        } catch (err) {
            console.error("Error creating task:", err);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseStatuses = await axios.get(APIURL + '/statuses');
                setStatusesData(responseStatuses.data);

                setCurrentStatus({
                    id: responseStatuses.data[0].id,
                    name: responseStatuses.data[0].name,
                });

                const responsePriorities = await axios.get(APIURL + '/priorities');
                setPriorityData(responsePriorities.data);

                setCurrentPriority({
                    id: responsePriorities.data[0].id,
                    name: responsePriorities.data[0].name,
                    icon: responsePriorities.data[0].icon,
                });

                const responseDepartments = await axios.get(APIURL + '/departments');
                setDepartmentsData(responseDepartments.data);

                setCurrentDepartment({
                    id: responseDepartments.data[0].id,
                    name: responseDepartments.data[0].name,
                });

                const responseEmployee = await axios.get(APIURL + '/employees', {
                    headers: { Authorization: `Bearer ${APIKEY}` },
                });
                setEmployeeData(responseEmployee.data);

                setCurrentEmployee({
                    id: responseEmployee.data[0].id,
                    name: responseEmployee.data[0].name,
                    avatar: responseEmployee.data[0].avatar,
                });

            } catch (err) {

            }
        };

        fetchData();
    }, []);

    const validateInput = (value) => {
        const filteredValue = value.replace(/[^a-zA-Zა-ჰ\s]/g, "");

        let min = true;
        let max = true;

        if (filteredValue.length === 0) {
            setDescriptionInput({ input: filteredValue, error: { min: null, max: null } });
            return;
        }

        if (filteredValue.length < 2)
            min = false;

        if (filteredValue.length > 255)
            max = false;

        setDescriptionInput({ input: filteredValue, error: { min: min, max: max } });
    };

    return (
        <>
            <Header openPopUp={open} setOpenPopUp={setOpen}/>

            <section className="max-w-[105rem] w-full mx-auto mt-10">
                <h1 className="font-semibold">
                    შექმენი ახალი დავალება
                </h1>

                <div className="flex gap-[10rem] mt-8 rounded-sm p-15 bg-light-pink">
                    <div className="w-[34.375rem]">
                        <Input label="სახელი*" input="name" state={nameInput} setState={setNameInput}></Input>

                        <div>
                            <label htmlFor="description">აღწერა</label>
                            <textarea
                                name="description"
                                id="description"
                                value={descriptionInput.input}
                                onChange={(e) => validateInput(e.target.value)}
                                className="w-full bg-white resize-none outline-0 rounded-sm border border-[#CED4DA]"></textarea>
                            <div className="flex items-center gap-0.5">
                                {descriptionInput.error.min === true && <img src={checkGreen} alt="Check"/>}
                                {descriptionInput.error.min === false && <img src={checkRed} alt="Check"/>}
                                {descriptionInput.error.min === null && <img src={check} alt="Check"/>}

                                <span className={`text-[0.625rem] font-[350] ` + (descriptionInput.error.min ? `text-priority-low` : descriptionInput.error.min === false ? `text-priority-high` : `text-secondary-text`)}>მინიმუმ 2 სიმბოლო</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {descriptionInput.error.max === true && <img src={checkGreen} alt="Check"/>}
                                {descriptionInput.error.max === false && <img src={checkRed} alt="Check"/>}
                                {descriptionInput.error.max === null && <img src={check} alt="Check"/>}

                                <span className={`text-[0.625rem] font-[350] ` + (descriptionInput.error.max ? `text-priority-low` : descriptionInput.error.max === false ? `text-priority-high` : `text-secondary-text`)}>მინიმუმ 255 სიმბოლო</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="">პრიორიტეტი*</label>
                                {(priorityData && priorityData.length > 0 && currentPriority !== null) &&
                                    <Select state={currentPriority} setState={setCurrentPriority}
                                            departamentData={priorityData}/>
                                }
                            </div>
                            <div>
                                <label htmlFor="">სტატუსი*</label>
                                {(statusesData && statusesData.length > 0 && currentStatus !== null) &&
                                    <Select state={currentStatus} setState={setCurrentStatus}
                                            departamentData={statusesData}/>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-[34.375rem]">
                        <div>
                            <label htmlFor="">დეპარტამენტი*</label>
                            {(departmentsData && departmentsData.length > 0 && currentDepartment !== null) &&
                                <Select state={currentDepartment} setState={setCurrentDepartment}
                                        departamentData={departmentsData}/>
                            }
                        </div>
                        <div>
                            <label htmlFor="">პასუხისმგებელი თანამშრომელი*</label>
                            {(employeeData && employeeData.length > 0 && currentEmployee !== null) &&
                                <Select state={currentEmployee} setState={setCurrentEmployee}
                                        departamentData={employeeData}/>
                            }
                        </div>


                        <CustomDatePicker selectedDate={selectedDate}
                                          setSelectedDate={setSelectedDate}></CustomDatePicker>

                        <button onClick={handleCreateTask} className="py-2.5 px-5 text-base bg-purple text-white rounded-md">
                            დავალების შექმნა
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
}
