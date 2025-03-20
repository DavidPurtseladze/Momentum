import React, { useEffect, useState } from 'react';
import Header from "../components/Header.jsx";
import DropDown from "../components/DropDown.jsx";
import Card from "../components/Card.jsx";
import PopUp from "../components/PopUp.jsx";
import closeFilter from "../assets/close-filters.svg";
import {getStatuses, getPriorities, getDepartments, getEmployees, getTasks} from "../Api.js";

export default function () {
    const [open, setOpen] = useState(false)
    const [tasksData, setTasksData] = useState(null);
    const [statusesData, setStatusesData] = useState(null);
    const [priorityData, setPriorityData] = useState(null);
    const [departmentsData, setDepartmentsData] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [filters, setFilters] = useState([]);

    const getColor = (number) => {
        switch (number) {
            case 1:
                return "bg-yellow";
            case 2:
                return "bg-orange";
            case 3:
                return "bg-pink";
            default:
                return "bg-blue";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const statuses = await getStatuses();
            setStatusesData(statuses);

            const priorities = await getPriorities();
            setPriorityData(priorities);

            const departments = await getDepartments();
            setDepartmentsData(departments);

            const employee = await getEmployees();
            setEmployeeData(employee);

            const tasks = await getTasks();
            setTasksData(tasks);

        };

        fetchData();
    }, []);

    return (
        <>
            <Header openPopUp={open} setOpenPopUp={setOpen}></Header>

            <section className="max-w-[105rem] w-full mx-auto mt-10">
                <h1>
                    დავალებების გვერდი
                </h1>


                <div className="mt-13 max-w-[43rem] relative flex justify-between rounded-[0.625rem] border border-light-gray">
                    <DropDown name="დეპარტამენტი" type="department" data={departmentsData} filters={filters} setFilters={setFilters}></DropDown>
                    <DropDown name="პრიორიტეტი" type="priority" data={priorityData} filters={filters} setFilters={setFilters}></DropDown>
                    <DropDown name="თანამშრომელი" type="employee" data={employeeData} filters={filters} setFilters={setFilters}></DropDown>
                </div>

                {filters.length !== 0 &&
                    <div className="flex gap-2 mt-6">
                        {filters.map((filter, taskIndex) => (
                            <span key={taskIndex} className="px-2.5 py-1.5 flex items-center gap-1 text-sm text-secondary-text border border-[#CED4DA] rounded-[2.5rem]">
                                {filter.name}
                                <img src={closeFilter} alt="Close"
                                     onClick={() => setFilters((prev) =>
                                         prev.filter((el) => el.id !== filter.id || el.type !== filter.type)
                                     )}/>
                            </span>
                        ))}
                        <span onClick={() => setFilters([])} className="cursor-pointer px-2.5 py-1.5 flex items-center gap-1 text-sm text-secondary-text">
                            გასუფთავება
                        </span>
                    </div>
                }

                <div className="grid grid-cols-4 gap-13 mt-10">
                    {statusesData && statusesData.map((item, index) => (
                        <div key={item.id} className="flex flex-col gap-[1.875rem]" data-id={item.id}>
                            <div className={`w-full py-[0.9375rem] rounded-[0.625rem] ${getColor(item.id)}`}>
                                <h2 className="text-center text-xl font-medium text-white">{item.name}</h2>
                            </div>

                            {tasksData &&
                                tasksData
                                    .filter(task => task.status.id === item.id)
                                    .filter(task =>
                                        filters.length === 0 ||
                                        !filters.some(f => f.type === "department") ||
                                        filters.some(f => f.type === "department" && f.id === task.department.id)
                                    )
                                    .filter(task =>
                                        filters.length === 0 ||
                                        !filters.some(f => f.type === "priority") ||
                                        filters.some(f => f.type === "priority" && f.id === task.priority.id)
                                    )
                                    .filter(task =>
                                        filters.length === 0 ||
                                        !filters.some(f => f.type === "employee") ||
                                        filters.some(f => f.type === "employee" && f.id === task.employee.id)
                                    )
                                    .map((task, taskIndex) => (
                                        <Card key={task.id} data={task} />
                                    ))
                            }

                        </div>
                    ))}
                </div>


            </section>

            <PopUp open={open} setOpen={setOpen} departamentData={departmentsData}></PopUp>
        </>
    );
};
