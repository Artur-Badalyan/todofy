import React, { useState, useEffect, useCallback } from "react";

import TasksService from "services/tasksService";

import { useAppSelector, useAppDispatch } from "store/hooks";
import useDescriptionTitle from "components/hooks/useDescriptionTitle";
import LayoutRoutes from "components/Utilities/LayoutRoutes";
import { tasksActions } from "../../store/Tasks.store";

const ImportantTasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.importantTasks);

    const getTasksList = useCallback(async() => {
      try {
        const payload = JSON.stringify({ filter: { important: true } })
        const response = await TasksService.getAllTasks({ params: payload});
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

    
    useDescriptionTitle("Tasks marked as important", "Important tasks");
    return (<LayoutRoutes title="Important tasks" tasks={tasks} />);
 
};

export default ImportantTasks;



// import React, { useState, useEffect } from "react";
// import { useAppSelector } from "../../store/hooks";
// import useDescriptionTitle from "../hooks/useDescriptionTitle";
// import LayoutRoutes from "../Utilities/LayoutRoutes";

// const ImportantTasks = () => {
//     const dispatch = useAppDispatch();
//     const tasks = useAppSelector((state) => state.tasks.tasks);
//     // const [importantTasks, setImportantTasks] = useState([]);
//     useEffect(() => {
//        dispatch(tasksActions.addImportantTasksList(response.data.data)
//         const filteredTasks = tasks.filter((task) => task.important);
//         setImportantTasks(filteredTasks);
//     }, [tasks]);
//     useDescriptionTitle("Tasks marked as important", "Important tasks");
//     return (<LayoutRoutes title="Important tasks" tasks={importantTasks}></LayoutRoutes>);
// };

// export default ImportantTasks;
