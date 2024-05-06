const tasks = []
const addTasksButton = document.querySelector("#addTasks")
const popTasksButton = document.querySelector("#popTasks")

const updateList = (option) => {
    const tasksList = document.querySelector("#tasks")
    
    if (option == "add") {
        const listElement = document.createElement("li")
        listElement.textContent = tasks.at(-1)
        tasksList.appendChild(listElement)
    }

    const lastElement = tasksList.lastElementChild
    if (option == "pop" && lastElement) {
        tasksList.removeChild(lastElement)
    }
}

const addTasks = () => {
    const tasksInput = document.querySelector("#tasksInput")
    tasks.push(tasksInput.value)
    updateList("add")
    tasksInput.focus()
}

const popTasks = () => {
    const tasksInput = document.querySelector("#tasksInput")
    tasks.pop(tasksInput.value)
    updateList("pop")
    tasksInput.focus()
}

addTasksButton.addEventListener("click", addTasks)
popTasksButton.addEventListener("click", popTasks)
