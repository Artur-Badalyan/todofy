import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import TasksService from "services/tasksService";

import { useAppDispatch } from "store/hooks";
import { tasksActions } from "store/Tasks.store";
import { ReactComponent as StarLine } from "assets/star-line.svg";

const BtnMarkAsImportant = ({ taskId, taskImportant }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch()

  const markAsImportantHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("--------- markAsImportant  ------------  ", taskId, taskImportant);
      const response = await TasksService.editTask(taskId, { important: !taskImportant });
      if (response) {
        dispatch(tasksActions.markAsImportant(response));
        enqueueSnackbar('Task successfully updated', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Error fetching data:', { variant: 'error' });
    }
  };

  return (
    <form onSubmit={markAsImportantHandler}>
      <button type="submit" title={taskImportant ? "unmark as important" : "mark as important"} className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto" >
        <StarLine className={`w-5 h-5 sm:w-6 sm:h-6 ${taskImportant ? "fill-rose-500 stroke-rose-500 " : "fill-none"}`} />
      </button>
    </form>
  );
};

BtnMarkAsImportant.propTypes = {
  taskId: PropTypes.number.isRequired,
  taskImportant: PropTypes.bool.isRequired
}

export default React.memo(BtnMarkAsImportant);
