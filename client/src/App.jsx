import React from "react";

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
    const dispatch = useAppDispatch();

    const closeModalCreateTask = () => {
        dispatch(modalActions.closeModalCreateTask());
    };
    const createNewTaskHandler = async (task) => {
        console.log('111111111111')
        try {
            const res = await TasksService.createTask(task);
            dispatch(tasksActions.addNewTasks(res));
        } catch {

        }
    };
    
    return (<div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
      {modal.modalCreateTaskOpen && (<ModalCreateTask onClose={closeModalCreateTask} nameForm="Add a task" onConfirm={createNewTaskHandler}/>)}
      <Menu />
      <TasksSection />
      <Footer />
      <AccountData />
    </div>);
};

export default App;
