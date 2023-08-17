import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';

import { useAppSelector } from "store/hooks";
import Modal from "./Modal";

const InputCheckbox = ({ isChecked, setChecked, label }) => (
  <>
    <label htmlFor="setChecked" className="mb-0 flex items-center cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (<span className="bg-rose-500 w-2 h-2 block rounded-full" />)}
      </div>
      <span className="order-1 flex-1">{label}</span>
    </label>
    <input id="setChecked" type="checkbox" className="sr-only" checked={isChecked} onChange={() => setChecked((prev) => !prev)}/>
  </>
);


const ModalCreateTask = ({ onClose, task, nameForm, onConfirm }) => {
    const directories = useAppSelector((state) => state.tasks.directories);
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();
    if (day < 10) {
        day = +(`0${  day}`);
    }
    if (month < 10) {
        month = +(`0${  month}`);
    }
    const todayDate = `${year  }-${  month  }-${  day}`;
    const maxDate = `${year + 1  }-${  month  }-${  day}`;
    const [description, setDescription] = useState(() => task ? task.description : '');
    const [title, setTitle] = useState(() => task ? task.title : '');
    const [date, setDate] = useState(() => task ? task.date : '');
    const isTitleValid = useRef(false);
    const isDateValid = useRef(false);
    const [isImportant, setIsImportant] = useState(() => task ? task.important : false);
    const [isCompleted, setIsCompleted] = useState(() => task ? task.completed: false);
    const [selectedDirectory, setSelectedDirectory] = useState(() => task ? task.dir : directories[0]);

    const addNewTaskHandler = async (event) => {
        event.preventDefault();
        isTitleValid.current = title.trim().length > 0;
        isDateValid.current = date.trim().length > 0;
        if (isTitleValid.current && isDateValid.current) {
            const newTask = {
                title,
                description,
                date,
                completed: isCompleted,
                important: isImportant,
                // TODO: dirID write logic
                directoryId: null
            };

            console.log('\n\n\n newTask = ',newTask)
            await onConfirm(newTask);
            onClose();
        }
    };

    return (<Modal onClose={onClose} title={nameForm}>
      <form className="flex flex-col stylesInputsField" onSubmit={addNewTaskHandler}>
        <label htmlFor="title" >Title</label>
        <input id="title" type="text" placeholder="e.g, study for the test" required value={title} onChange={({ target }) => setTitle(target.value)} className="w-full"/>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" className="w-full" value={date} required onChange={({ target }) => setDate(target.value)} min={todayDate} max={maxDate}/>
        <label htmlFor="description">
          Description (optional)
        </label>
        <textarea id='description' placeholder="e.g, study for the test" className="w-full" value={description} onChange={({ target }) => setDescription(target.value)} />
        <label>
          Select a directory
          <select className="block w-full" value={selectedDirectory} onChange={({ target }) => setSelectedDirectory(target.value)}>
            {directories.map((dir) => (<option key={dir} value={dir} className="bg-slate-100 dark:bg-slate-800">
                {dir}
              </option>))}
          </select>
        </label>
        <InputCheckbox isChecked={isImportant} setChecked={setIsImportant} label="Mark as important"/>
        <InputCheckbox isChecked={isCompleted} setChecked={setIsCompleted} label="Mark as completed"/>
        <button type="submit" className="btn mt-5">
          {nameForm}
        </button>
      </form>
    </Modal>);
};

InputCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

ModalCreateTask.propTypes = {
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  nameForm: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired
}


export default ModalCreateTask;
