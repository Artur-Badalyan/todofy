import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";

const useTodayTasks = () => {
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const [todaysTasks, setTodaysTasks] = useState([]);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
    useEffect(() => {
        let filteredTasks = tasks.filter((task) => task.date === dateTimeFormat);
        setTodaysTasks(filteredTasks);
    }, [dateTimeFormat, tasks]);
    
    return todaysTasks;
};

export default useTodayTasks;
