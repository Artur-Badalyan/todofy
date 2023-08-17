import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import ModalCreateTask from "../../Utilities/ModalTask";
import { ReactComponent as OptionsSvg } from "../../../assets/options.svg";
import tasksService from "services/tasksService";
import { useSnackbar } from "notistack";

const BtnEditTask = ({ task }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);
  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };
  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };
  const editTaskHandler = async (task) => {
    try {
      console.log("---------------------edit data  ", task);
      const response = await tasksService.editTask(task.id, task);
      // if (response) {
      //   dispatch(tasksActions.editTask(task));
      //   enqueueSnackbar('Task successfully updated', { variant: 'success' });
      // }
    } catch (error) {
      enqueueSnackbar('Error fetching data:', { variant: 'error' });
    }



  };
  return (<>
    <button title="edit task" className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700" onClick={openModalEditTask}>
      <OptionsSvg className="w-4 sm:w-5 h-4 sm:h-5" />
    </button>
    {modalEditTaskOpen && (<ModalCreateTask onClose={closeModalEditTask} task={task} nameForm="Edit task" onConfirm={editTaskHandler} />)}
  </>);
};

export default BtnEditTask;
