import axios from 'axios';
import { APIURL, APIKEY } from "./config.js";

/**
 * Fetches the list of task statuses from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of statuses.
 *                           If an error occurs, it returns an empty array.
 */
export const getStatuses = async () => {
    try {
        const response = await axios.get(`${APIURL}/statuses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Statuses:', error);
        return [];
    }
};

/**
 * Updates the status of a specific task.
 *
 * This function sends a PUT request to the API to update the status of a task
 * identified by its `taskId`. The request includes the `status_id` of the new status.
 * If the request is successful. If there's an error, it logs the error.
 *
 * @param {string} taskId - The ID of the task to update.
 * @param {string} statusId - The ID of the new status to set for the task.
 * @returns {boolean} - Returns `true` if the task status was updated successfully, or `false` if there was an error.
 */
export const updateTaskStatus = async (taskId, statusId) => {
    try {
        await axios.put(`${APIURL}/tasks/${taskId}`, {
            status_id: statusId,
        }, {
            headers: { Authorization: `Bearer ${APIKEY}` },
        });

        return true;
    } catch (err) {
        console.error("Error updating task status:", err);
        return false;
    }
};

/**
 * Fetches the list of task priorities from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of priorities.
 *                           If an error occurs, it returns an empty array.
 */
export const getPriorities = async () => {
    try {
        const response = await axios.get(`${APIURL}/priorities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Priorities:', error);
        return [];
    }
};

/**
 * Fetches the list of departments from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of departments.
 *                           If an error occurs, it returns an empty array.
 */
export const getDepartments = async () => {
    try {
        const response = await axios.get(`${APIURL}/departments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Departments:', error);
        return [];
    }
};

/**
 * Fetches employee data from the API.
 *
 * This function sends a GET request to the API to retrieve a list of employees.
 * If the request is successful, it returns the employee data; otherwise, it logs the error and returns an empty array.
 *
 * @returns {Array} - An array containing the employee data if the request is successful, or an empty array if an error occurs.
 */
export const getEmployees = async () => {
    try {
        const response = await axios.get(`${APIURL}/employees`, {
            headers: {
                Authorization: `Bearer ${APIKEY}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
};

/**
 * Fetches the list of tasks from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 *                           If an error occurs, it logs the error and returns an empty array.
 */
export const getTasks = async () => {
    try {
        const response = await axios.get(`${APIURL}/tasks`, {
            headers: { Authorization: `Bearer ${APIKEY}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

/**
 * Fetches the details of a specific task from the API.
 *
 * This function sends a GET request to the API to retrieve the details of a task,
 * identified by its `taskId`. If the request is successful, it returns the task data.
 * If there is an error, it logs the error and returns `null`.
 *
 * @param {string} taskId - The ID of the task to retrieve.
 * @returns {Object|null} - The task data if the request is successful, or `null` if an error occurs.
 */
export const getTaskDetails = async (taskId) => {
    try {
        const response = await axios.get(`${APIURL}/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${APIKEY}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching task details:", error);
        return null;
    }
};

/**
 * Fetches the comments for a specific task from the API.
 *
 * This function sends a GET request to the API to retrieve a list of comments
 * for a specific task, identified by its `taskId`. If the request is successful,
 * it returns the comments data. If there is an error, it logs the error and returns an empty array.
 *
 * @param {string} taskId - The ID of the task for which comments are being fetched.
 * @returns {Array} - An array containing the task comments if the request is successful,
 *                    or an empty array if an error occurs.
 */
export const getTaskComments = async (taskId) => {
    try {
        const response = await axios.get(`${APIURL}/tasks/${taskId}/comments`, {
            headers: { Authorization: `Bearer ${APIKEY}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};

/**
 * Adds a new employee by sending a POST request to the API.
 *
 * This function takes the employee data, including the form data (such as name, surname, department, and avatar image),
 * and sends it to the backend to create a new employee. If the request is successful, it returns the response data.
 * If an error occurs, it logs the error and returns null.
 *
 * @param {FormData} formData - The form data containing the employee details and image to be uploaded.
 *
 * @returns {Object|null} - The response data from the API if successful, or null if an error occurs.
 */
export const addEmployee = async (formData) => {
    try {
        const response = await axios.post(`{APIURL}/employees`, formData, {
            headers: {
                "Authorization": `Bearer ${APIKEY}`,
                "Accept": "application/json",
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding employee:", error);
        return null;
    }
};

/**
 * Adds a new task by sending a POST request to the API.
 *
 * This function takes a payload containing the task details and sends a request to create the task on the server.
 * If the request is successful, it returns the response data; otherwise, it logs the error and returns null.
 *
 * @param {Object} formData - The task details to be added, including task name, description, etc.
 * @returns {Object|null} - The response data if successful, or null if an error occurs.
 */
export const addTask = async (formData) => {
    try {
        const response = await axios.post(`${APIURL}/tasks`, formData, {
            headers: {
                "Authorization": `Bearer ${APIKEY}`,
                "Accept": "application/json",
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        return null;
    }
};



