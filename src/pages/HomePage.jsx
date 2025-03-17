import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header.jsx";
import DropDown from "../components/DropDown.jsx";
import Card from "../components/Card.jsx";
import PopUp from "../components/PopUp.jsx";
import { APIURL, APIKEY } from "../config.js";

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
            try {
                const responseStatuses = await axios.get(APIURL + '/statuses');
                setStatusesData(responseStatuses.data);

                const responsePriorities = await axios.get(APIURL + '/priorities');
                setPriorityData(responsePriorities.data);

                const responseDepartments = await axios.get(APIURL + '/departments');
                setDepartmentsData(responseDepartments.data);

                const responseEmployee = await axios.get(APIURL + '/employees', {
                    headers: { Authorization: `Bearer ${APIKEY}` },
                });
                setEmployeeData(responseEmployee.data);

                const responseTasks = await axios.get(APIURL + '/tasks', {
                    headers: { Authorization: `Bearer ${APIKEY}` },
                });
                setTasksData(responseTasks.data);

            } catch (err) {

            }
        };

        fetchData();
    }, []);

    console.log(tasksData)
    console.log(filters)

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
