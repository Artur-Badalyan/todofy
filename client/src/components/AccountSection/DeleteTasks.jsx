import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { tasksActions } from "../../store/Tasks.store";
import ModalConfirm from "../Utilities/ModalConfirm";

const DeleteTasks = () => {
    const dispatch = useAppDispatch();
    const [showModal, setIsModalShown] = useState(false);
    const deleteAllDataHandler = () => {
        dispatch(tasksActions.deleteAllData());
    };
    
    return (<>
      {showModal && (<ModalConfirm onClose={() => setIsModalShown(false)} text="All data will be deleted permanently." onConfirm={deleteAllDataHandler}/>)}
      <button onClick={() => setIsModalShown(true)} class="mt-4 cursor-pointer flex justify-center items-center fill-slate-100 text-slate-100 bg-red-500 hover:bg-red-600 active:border active:border-red-400 font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:brightness-100 hover:animate-pulse active:animate-bounce">
        <svg className="mr-2 h-4 w-4 flex-no-shrink fill-current" height="20" viewBox="0 -960 960 960" width="20"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        Delete all data
      </button>
    </>);
};
export default React.memo(DeleteTasks);
