import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import TasksService from 'services/tasksService';

const defaultTasks = [
    {
        title: "Task 1",
        important: false,
        description: "This is the description for this task",
        date: "2023-08-08",
        dir: "Main",
        completed: true,
        id: "t1",
    },
    {
        title: "Task 2",
        important: true,
        description: "This is the description for this task",
        date: "2023-05-15",
        dir: "Main",
        completed: true,
        id: "t2",
    },
    {
        title: "Task 3",
        important: false,
        description: "This is the description for this task",
        date: "2023-08-21",
        dir: "Main",
        completed: false,
        id: "t3",
    },
];

const getSavedDirectories = () => {
    let dirList = [];
    if (localStorage.getItem("directories")) {
        dirList = JSON.parse(localStorage.getItem("directories"));
        const mainDirExists = dirList.some((dir) => dir === "Main");
        if (!mainDirExists) {
            dirList.push("Main");
        }
    }
    else {
        dirList.push("Main");
    }
    if (localStorage.getItem("tasks")) {
        const savedTasksList = JSON.parse(localStorage.getItem("tasks"));
        let dirNotSaved = [];
        savedTasksList.forEach((task) => {
            if (!dirList.includes(task.dir)) {
                if (!dirNotSaved.includes(task.dir)) {
                    dirNotSaved.push(task.dir);
                }
            }
        });
        dirList = [...dirList, ...dirNotSaved];
    }
    return dirList;
};

// const fetchTasksList = async () => {
//     try {
//         console.log("----aaaaaaaaaaaaa------");
//         const payload = JSON.stringify({ filter: { completed: true } })
//         const response = await TasksService.getTasksList({ params: payload });
//         return response;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
//     return false;
// };


const initialState = {
    tasks: [],
    importantTasks: [],
    completedTasks: [],
    directories: getSavedDirectories(),
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        addTasksList(state, action) {
            state.tasks = [...action.payload];
        },
        addImportantTasksList(state, action) {
            state.importantTasks = [...action.payload];
        },
        addCompletedTasksList(state, action) {
            state.completedTasks = [...action.payload];
        },
        addNewTask(state, action) {
            console.log("------- action paylod ", action.payload);
            console.log("------- state ", state);
            state.tasks = [action.payload, ...state.tasks];
        },
        removeTask(state, action) {
            const newTasksList = state.tasks.filter((task) => task.id !== action.payload);
            state.tasks = newTasksList;
        },
        markAsImportant(state, action) {
            const { id, important } = action.payload;
            const newTaskFavorited = state.tasks.find((task) => task.id === id);
            newTaskFavorited.important = important;
        },
        editTask(state, action) {
            const taskId = action.payload.id;
            const newTaskEdited = state.tasks.find((task) => task.id === taskId);
            const indexTask = state.tasks.indexOf(newTaskEdited);
            state.tasks[indexTask] = action.payload;
        },
        toggleTaskCompleted(state, action) {
            const { id, completed, isListInView1 } = action.payload;
            const currTask = state.tasks.find((task) => task.id === id);
            currTask.completed = !completed
        },
        deleteAllData(state) {
            state.tasks = [];
            state.directories = ["Main"];
        },
        createDirectory(state, action) {
            const newDirectory = action.payload;
            const directoryAlreadyExists = state.directories.includes(newDirectory);
            if (directoryAlreadyExists)
                return;
            state.directories = [newDirectory, ...state.directories];
        },
        deleteDirectory(state, action) {
            const dirName = action.payload;
            state.directories = state.directories.filter((dir) => dir !== dirName);
            state.tasks = state.tasks.filter((task) => task.dir !== dirName);
        },
        editDirectoryName(state, action) {
            const { newDirName } = action.payload;
            const { previousDirName } = action.payload;
            const directoryAlreadyExists = state.directories.includes(newDirName);
            if (directoryAlreadyExists)
                return;
            const dirIndex = state.directories.indexOf(previousDirName);
            state.directories[dirIndex] = newDirName;
            state.tasks.forEach((task) => {
                if (task.dir === previousDirName) {
                    task.dir = newDirName;
                }
            });
        },
        // getTasksList(state, action) {
        //     const tasks = await fetchTasksList();
        //     console.log('\n\n\n tasks', tasks);
        //     state.tasks = [action.payload]
        // }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchContent.pending, (state) => {
    //       state.isLoading = true
    //     })
    //     builder.addCase(fetchContent.fulfilled, (state, action) => {
    //       state.isLoading = false
    //       state.contents = action.payload
    //     })
    //     builder.addCase(fetchContent.rejected, (state, action) => {
    //       state.isLoading = false
    //       state.error = action.error.message
    //     })
    //   },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;

export const tasksMiddleware = (store) => (next) => (action) => {
    const nextAction = next(action);
    const actionChangeOnlyDirectories = tasksActions.createDirectory.match(action);
    const isADirectoryAction = action.type
        .toLowerCase()
        .includes("directory");

    if (action.type.startsWith("tasks/") && !actionChangeOnlyDirectories) {
        const tasksList = store.getState().tasks.tasks;
        localStorage.setItem("tasks", JSON.stringify(tasksList));
    }
    if (action.type.startsWith("tasks/") && isADirectoryAction) {
        const dirList = store.getState().tasks.directories;
        localStorage.setItem("directories", JSON.stringify(dirList));
    }
    if (tasksActions.deleteAllData.match(action)) {
        localStorage.removeItem("tasks");
        localStorage.removeItem("directories");
        localStorage.removeItem("darkmode");
    }
    if (tasksActions.removeTask.match(action)) {
        console.log(JSON.parse(localStorage.getItem("tasks")));
        if (localStorage.getItem("tasks")) {
            const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
            if (localStorageTasks.length === 0) {
                localStorage.removeItem("tasks");
            }
        }
    }
    return nextAction;
};
