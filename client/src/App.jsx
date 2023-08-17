import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TasksService from "services/tasksService";

import AccountData from "./components/AccountSection/AccountData";
import Footer from "./components/Footer";
import Menu from "./components/Menu/Menu";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { tasksActions } from "./store/Tasks.store";

const App = () => {
    const modal = useAppSelector((state) => state.modal);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const closeModalCreateTask = () => {
        dispatch(modalActions.closeModalCreateTask());
    };

    const createNewTaskHandler = async (task) => {
        try {
            console.log("------createNewTaskHandler------- ", task);
            const response = await TasksService.createTask(task);
            dispatch(tasksActions.addNewTask(response));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log("---modal-------", modal);

    return (
        !user.isLogin ?
            <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
                {modal.modalCreateTaskOpen && (<ModalCreateTask onClose={closeModalCreateTask} nameForm="Add a task" onConfirm={createNewTaskHandler} />)}
                <Menu />
                <TasksSection />
                <Footer />
                <AccountData />
            </div>
            :
            (
                // <Routes >
                <>login</>
                // </Routes >
            )
    );
};

export default App;


