import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const Directory = () => {
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const directories = useAppSelector((state) => state.tasks.directories);
    const params = useParams();
    const navigate = useNavigate();
    useDescriptionTitle(`Tasks in "${params.dir}"`, params.dir ? params.dir + " directory" : "");
    const [tasksInCurrentDirectory, setTasksInCurrentDirectory] = useState([]);
    useEffect(() => {
        const dirExists = directories.includes(params.dir);
        if (!dirExists) {
            navigate("/");
        }
        const tasksFiltered = tasks.filter((task) => task.dir === params.dir);
        setTasksInCurrentDirectory(tasksFiltered);
    }, [directories, navigate, params.dir, tasks]);
    return (<LayoutRoutes title={`${params.dir}'s tasks`} tasks={tasksInCurrentDirectory}/>);
};

export default Directory;
