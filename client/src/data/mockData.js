
const users = [
    {
        id: 1,
        name: "Arshak",
        lastName: "Badalyan",
        login: "aaaa",
        password: "aaaa"
    },
    {
        id: 2,
        name: "Artur",
        lastName: "Badalyan",
        login: "bbbbb",
        password: "bbbbb"
    },
]

const tasks = [
    {
        title: "Task 1",
        important: false,
        description: "This is the description for this task",
        date: "2023-04-12",
        dir: "Main",
        completed: true,
        id: 1,
        user_id: 1
    },
    {
        title: "Task 2",
        important: true,
        description: "This is the description for this task",
        date: "2023-05-15",
        dir: "Main",
        completed: true,
        id: 2,
        user_id: 1
    },
    {
        title: "Task 3",
        important: false,
        description: "This is the description for this task",
        date: "2023-08-21",
        dir: "Main",
        completed: false,
        id: 3,
        user_id: 1
    },
]

// const directory = {

// }

export default {
    getAllUsers: async (id) => {
        const users = id ? users.filter((id) => id === id) : users
        return users;
    },
    getAllTasks: (id) => {
        const allTask = id ? tasks.filter((id) => id === id) : task
        return allTask;
    }
}
