import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header.jsx";
import DropDown from "../components/DropDown.jsx";
import Card from "../components/Card.jsx";
import CheckBox from "../components/CheckBox.jsx";

export default function () {
    const APIKEY = import.meta.env.VITE_API_KEY;
    const APIURL = import.meta.env.VITE_API_URL;

    const [tasksData, setTasksData] = useState(null);
    const [statusesData, setStatusesData] = useState(null);
    const [priorityData, setPriorityData] = useState(null);
    const [departmentsData, setDepartmentsData] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);

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

    return (
        <>
            <Header></Header>

            <section className="max-w-[105rem] w-full mx-auto mt-10">
                <h1>
                    დავალებების გვერდი
                </h1>


                <div className="mt-13 max-w-[43rem] relative flex justify-between rounded-[0.625rem] border border-light-gray">
                    <DropDown name="დეპარტამენტი" type="departament" data={departmentsData}></DropDown>
                    <DropDown name="პრიორიტეტი" type="priority" data={priorityData}></DropDown>
                    <DropDown name="თანამშრომელი" type="empolyee" data={employeeData}></DropDown>
                </div>

                <div className="grid grid-cols-4 gap-13">
                    {/*<div className="flex flex-col gap-[1.875rem]">*/}
                    {/*    <div className="w-full py-[0.9375rem] rounded-[0.625rem] bg-yellow">*/}
                    {/*        <h2 className="text-center text-xl font-medium text-white">დასაწყები</h2>*/}
                    {/*    </div>*/}

                    {/*    <Card></Card>*/}
                    {/*</div>*/}

                    {/*<div className="flex flex-col gap-[1.875rem]">*/}
                    {/*    <div className="w-full py-[0.9375rem] rounded-[0.625rem] bg-orange">*/}
                    {/*        <h2 className="text-center text-xl font-medium text-white">პროგრესში</h2>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="flex flex-col gap-[1.875rem]">*/}
                    {/*    <div className="w-full py-[0.9375rem] rounded-[0.625rem] bg-pink">*/}
                    {/*        <h2 className="text-center text-xl font-medium text-white">მზად ტესტირებისთვის</h2>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="flex flex-col gap-[1.875rem]">*/}
                    {/*    <div className="w-full py-[0.9375rem] rounded-[0.625rem] bg-blue">*/}
                    {/*        <h2 className="text-center text-xl font-medium text-white">დასრულებული</h2>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {statusesData && statusesData.map((item, index) => (
                        <div key={item.id} className="flex flex-col gap-[1.875rem]" data-id={item.id}>
                            <div className="w-full py-[0.9375rem] rounded-[0.625rem] bg-blue">
                                <h2 className="text-center text-xl font-medium text-white">{item.name}</h2>
                            </div>
                            {tasksData && tasksData
                                .filter(task => task.status.id === item.id)
                                .map((task, taskIndex) => (
                                    <Card key={task.id} data={task}></Card>
                                ))
                            }

                        </div>
                    ))}
                </div>


            </section>
        </>
    );
};
