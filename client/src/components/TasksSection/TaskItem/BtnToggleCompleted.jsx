import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import TasksService from "services/tasksService";

import { useAppDispatch } from "store/hooks";
import { tasksActions } from "store/Tasks.store";
import { ReactComponent as SvgX } from "assets/x.svg";
import { ReactComponent as Check } from "assets/check.svg";

const BtnToggleCompleted = ({ taskCompleted, taskId, isListInView1 }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar();

  console.log('location = ', location)

  const markAsCompletedHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("--------- markAsComplited ------------  ", taskCompleted, taskId, isListInView1);
      const response = await TasksService.editTask(taskId, { completed: taskCompleted, isListInView1 });
      if (response) {
        dispatch(tasksActions.toggleTaskCompleted(response));
        // navigate(`${location.pathname}`);
        // TODO: store.markAsImportant create notification view
        enqueueSnackbar('Task successfully updated', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Error fetching data:', { variant: 'error' });
    }


  };

  return (
    <form onSubmit={markAsCompletedHandler}>
      <button type="submit" title={taskCompleted ? "mark as uncompleted" : "mark as completed"} className={`${taskCompleted
        ? "bg-emerald-200 text-emerald-800 "
        : "bg-amber-200 text-amber-800 "} ${isListInView1 ? "mr-4" : "mr-4 order-0"} rounded-full font-medium`} >
        <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
          {taskCompleted ? "completed" : "uncompleted"}
        </span>
        <span className=" sm:hidden w-6 h-6 grid place-items-center">
          {taskCompleted ? (<Check className="w-3 h-3" />) : (<SvgX className="w-3 h-3" />)}
        </span>
      </button>
    </form>
  );
};

BtnToggleCompleted.propTypes = {
  taskId: PropTypes.number.isRequired,
  taskCompleted: PropTypes.bool.isRequired,
  isListInView1: PropTypes.bool.isRequired,
}

export default React.memo(BtnToggleCompleted);
