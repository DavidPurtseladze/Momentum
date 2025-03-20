import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Input from "../components/Input.jsx";
import checkGreen from "../assets/green-check.svg";
import checkRed from "../assets/red-check.svg";
import check from "../assets/check.svg";
import Select from "../components/Select.jsx";
import CustomDatePicker from "../components/DatePicker.jsx";
import {addTask, getDepartments, getEmployees, getPriorities, getStatuses} from "../Api.js";
import PopUp from "../components/PopUp.jsx";

export default function CreateTaskPage() {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState({date: null, error: false});
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
        const nameError = validateSingleInputOnSubmit(nameInput, setNameInput)
        const descriptionError = validateSingleInputOnSubmit(descriptionInput, setDescriptionInput)

        if (selectedDate.date === null) {
            setSelectedDate({ date: selectedDate.date, error: true });
            return;
        }
        console.log(selectedDate)

        if (nameError || descriptionError)
            return;

        const payload = {
            name: nameInput.input,
            description: descriptionInput.input,
            due_date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
            status_id: currentStatus ? currentStatus.id : null,
            employee_id: currentEmployee ? currentEmployee.id : null,
            priority_id: currentPriority ? currentPriority.id : null,
        };

        await addTask(payload);
    };


    useEffect(() => {
        const fetchData = async () => {
            const statuses = await getStatuses();
            setStatusesData(statuses);
            setCurrentStatus({
                id: statuses[0]?.id,
                name: statuses[0]?.name,
            });

            const priorities = await getPriorities();
            setPriorityData(priorities);
            setCurrentPriority({
                id: priorities[1]?.id,
                name: priorities[1]?.name,
                icon: priorities[1]?.icon,
            });

            const departments = await getDepartments();
            setDepartmentsData(departments);
            setCurrentDepartment({
                id: departments[0]?.id,
                name: departments[0]?.name,
            });

            const employees = await getEmployees();
            setEmployeeData(employees);
            setCurrentEmployee({
                id: employees[0]?.id,
                name: employees[0]?.name,
                avatar: employees[0]?.avatar,
            });
        };

        fetchData();
    }, []);

    const validateInput = (value) => {
        let min = true;
        let max = true;

        if (value.length === 0) {
            setDescriptionInput({ input: value, error: { min: null, max: null } });
            return;
        }

        if (value.length < 2)
            min = false;

        if (value.length > 255)
            max = false;

        setDescriptionInput({ input: value, error: { min: min, max: max } });
    };

    const validateSingleInputOnSubmit = (state, setState) => {
        let min = true;
        let max = true;
        let error = false;

        if (state.input.length < 2) {
            min = false;
            error = true;
        }

        if (state.input.length > 255) {
            max = false;
            error = true;
        }

        setState({ input: state.input, error: { min: min, max: max } });
        return error;
    };

    return (
        <>
            <Header openPopUp={open} setOpenPopUp={setOpen}/>

            <section className="max-w-[105rem] w-full mx-auto mt-10">
                <h1 className="font-semibold">
                    შექმენი ახალი დავალება
                </h1>

                <div className="w-[105rem] p-15 bg-light-pink rounded-sm mt-8">

                    <div className="w-[82.5rem] grid dp-grid-row-auto grid-cols-2 gap-x-[10rem] gap-y-10">
                        <div className="h-fit">
                            <Input label="სახელი*" input="name" state={nameInput} setState={setNameInput}></Input>
                        </div>

                        <div className="h-fit">
                            <label className="text-secondary-text text-base mb-1.5" htmlFor="">დეპარტამენტი*</label>
                            {(departmentsData && departmentsData.length > 0 && currentDepartment !== null) &&
                                <Select state={currentDepartment} setState={setCurrentDepartment}
                                        departamentData={departmentsData}/>
                            }
                        </div>

                        <div className="h-fit">
                            <label htmlFor="description">აღწერა</label>
                            <textarea name="description" id="description" value={descriptionInput.input}
                                onChange={(e) => validateInput(e.target.value)}
                                className={`w-full p-2.5 h-[8.125rem] bg-white resize-none outline-0 rounded-sm border border-[#CED4DA] ${(descriptionInput.error.min === false || descriptionInput.error.max === false) ? 'border-priority-high' : ''}`}></textarea>
                            <div className="flex items-center gap-0.5">
                                {descriptionInput.error.min === true && <img src={checkGreen} alt="Check"/>}
                                {descriptionInput.error.min === false && <img src={checkRed} alt="Check"/>}
                                {descriptionInput.error.min === null && <img src={check} alt="Check"/>}

                                <span
                                    className={`text-[0.625rem] font-[350] ` + (descriptionInput.error.min ? `text-priority-low` : descriptionInput.error.min === false ? `text-priority-high` : `text-secondary-text`)}>მინიმუმ 2 სიმბოლო</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {descriptionInput.error.max === true && <img src={checkGreen} alt="Check"/>}
                                {descriptionInput.error.max === false && <img src={checkRed} alt="Check"/>}
                                {descriptionInput.error.max === null && <img src={check} alt="Check"/>}

                                <span
                                    className={`text-[0.625rem] font-[350] ` + (descriptionInput.error.max ? `text-priority-low` : descriptionInput.error.max === false ? `text-priority-high` : `text-secondary-text`)}>მინიმუმ 255 სიმბოლო</span>
                            </div>
                        </div>

                        <div className="h-fit">
                            <label className="text-secondary-text text-base mb-1.5" htmlFor="">პასუხისმგებელი თანამშრომელი*</label>
                            {(employeeData && employeeData.length > 0 && currentEmployee !== null) &&
                                <Select state={currentEmployee} setState={setCurrentEmployee}
                                        departamentData={employeeData}/>
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-8 h-fit">
                            <div>
                                <label className="text-secondary-text text-base mb-1.5" htmlFor="">პრიორიტეტი*</label>
                                {(priorityData && priorityData.length > 0 && currentPriority !== null) &&
                                    <Select state={currentPriority} setState={setCurrentPriority}
                                            departamentData={priorityData}/>
                                }
                            </div>
                            <div>
                                <label className="text-secondary-text text-base mb-1.5" htmlFor="">სტატუსი*</label>
                                {(statusesData && statusesData.length > 0 && currentStatus !== null) &&
                                    <Select state={currentStatus} setState={setCurrentStatus}
                                            departamentData={statusesData}/>
                                }
                            </div>
                        </div>

                        <CustomDatePicker selectedDate={selectedDate}
                                          setSelectedDate={setSelectedDate}></CustomDatePicker>
                    </div>
                    <div className="w-[82.5rem] flex justify-end mt-[8.75rem]">
                        <button onClick={handleCreateTask} className="py-2.5 px-5 text-base bg-purple hover:bg-light-purple duration-300 text-white rounded-md">დავალების შექმნა</button>
                    </div>
                </div>

            </section>

            <PopUp open={open} setOpen={setOpen} departamentData={departmentsData}></PopUp>
        </>
    );
}
