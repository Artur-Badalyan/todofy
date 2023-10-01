import React from "react";
import BtnEditTask from "./BtnEditTask";
import BtnMarkAsImportant from "./BtnMarkAsImportant";
import BtnDeleteTask from "./BtnDeleteTask";
import BtnToggleCompleted from "./BtnToggleCompleted";

const ActionsTaskItem = ({ task, isListInView1 }) => {
  
    return (<>
      <div className={`flex border  ${isListInView1 ? "items-center borderNone" : "border-t-2 w-full pt-4 mt-4"}`}>
        <BtnToggleCompleted taskCompleted={task.completed} taskId={task.id} isListInView1={isListInView1}/>
        <BtnMarkAsImportant taskId={task.id} taskImportant={task.important}/>
        <BtnDeleteTask taskId={task.id}/>
        <BtnEditTask task={task}/>
      </div>
    </>);
};
export default ActionsTaskItem;
