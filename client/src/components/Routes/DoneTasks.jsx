import React, { useCallback, useEffect } from "react";
import PropTypes from 'prop-types';

import TasksService from "services/tasksService";

import useCompletedTasks from "components/hooks/useCompletedTasks";
import { useAppDispatch,useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import { tasksActions } from "../../store/Tasks.store";

const DoneTasks = ({ done, title }) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.completedTasks);



    const { tasks: tasksFiltered } = useCompletedTasks({ tasks, done });
    useDescriptionTitle("All tasks done", title);
    
    return <LayoutRoutes title={title} tasks={tasksFiltered} />;
 
};

DoneTasks.propTypes = {
  done: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default DoneTasks;
