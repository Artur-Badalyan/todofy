import React, { useEffect, useCallback } from "react";
import useTaskList from "components/hooks/useTasksList";

import TasksService from "services/tasksService";
// import {GetAllTasks} from "components/hooks/getTasks";

import LayoutRoutes from "../Utilities/LayoutRoutes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import { tasksActions } from "../../store/Tasks.store";
// import GetAllTasks from "components/hooks/getTasks";

const Home = () => {
    const dispatch = useAppDispatch();
  
    const tasks = useAppSelector((state) => state.tasks.tasks);
    useDescriptionTitle("Organize your tasks", "All tasks");


    const getTasksList = useCallback(async() => {
        try {
          const response = await TasksService.getAllTasks();
          dispatch(tasksActions.addTasksList(response.data.data))
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
  
      useEffect(() => {
          getTasksList();
          // useTaskList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    console.log('tasks = ', tasks)

    return <LayoutRoutes title="All tasks" tasks={tasks} />;

};

export default Home;
