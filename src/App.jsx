import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import TaskPage from "./pages/TaskPage.jsx";
import CreateTaskPage from "./pages/CreateTaskPage.jsx";

function App() {
    return (
        <>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/task/:taskId" element={<TaskPage />} />
                        <Route path="/create-task" element={<CreateTaskPage />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App
