import React, { useCallback, useEffect } from "react";

import TasksService from "services/tasksService";

import useCompletedTasks from "components/hooks/useCompletedTasks";
import { useAppDispatch,useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import { tasksActions } from "../../store/Tasks.store";

const DoneTasks = ({ done, title }) => {
    const dispatch = useAppDispatch();

    const getAllTasks = useCallback(async() => {
      try {
        const payload = JSON.stringify({ filter: { completed: true } })
        // const payload = { params: { filter: { completed: true }} }
        const response = await TasksService.getAllTasks({ params: payload});
        const data = await response.json();
        dispatch(tasksActions.addNewTasks(data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      }
    },[]);

    useEffect(() => {
        getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tasks = useAppSelector((state) => state.tasks.tasks);
    const { tasks: tasksFiltered } = useCompletedTasks({ tasks, done });
    useDescriptionTitle("All tasks done", title);
    
    return <LayoutRoutes title={title} tasks={tasksFiltered} />;
};

export default DoneTasks;
