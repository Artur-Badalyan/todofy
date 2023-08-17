import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import ModalConfirm from "../../Utilities/ModalConfirm";
import { ReactComponent as Trash } from "../../../assets/trash.svg";
import tasksService from "services/tasksService";

const BtnDeleteTask = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
    const [showModal, setIsModalShown] = useState(false);

    const removeTaskHandler = async() => {
      try {
        console.log("---------------------delete id ", taskId);
        const response = await tasksService.deleteTask(taskId);
        // if (response) {
        //   dispatch(tasksActions.removeTask(taskId));
        //   enqueueSnackbar('Task successfully deleted', { variant: 'success' });
        // }
      } catch (error) {
        enqueueSnackbar('Error fetching data:', { variant: 'error' });
      }

    };
    return (<>
      {showModal && (<ModalConfirm onClose={() => setIsModalShown(false)} text="This task will be deleted permanently." onConfirm={removeTaskHandler}/>)}
      <button onClick={() => setIsModalShown(true)} title="delete task" className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200">
        <Trash className="w-5 h-5 sm:w-6 sm:h-6"/>
      </button>
    </>);
};

export default React.memo(BtnDeleteTask);
