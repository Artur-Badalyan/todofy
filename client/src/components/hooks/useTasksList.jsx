import { useEffect, useState, useCallBack } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { useSnackbar } from 'notistack';
import { tasksActions } from "store/Tasks.store";

import TasksService from '../../services/tasksService';


const useTaskList = async() => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    try {
        const response = await TasksService.getTasksList();
        dispatch(tasksActions.getTasksList(response))
        // const tasks = useAppSelector((state) => state.tasks.tasks);
        // console.log("*************************************************************\n\n", response);
        return true;
    } catch (error) {
        enqueueSnackbar('Task successfully updated', { variant: 'error' });
        return [];
    }
};


export default useTaskList;
