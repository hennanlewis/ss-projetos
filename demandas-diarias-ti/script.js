const tasks = []
const addTasksButton = document.querySelector("#addTasks")
const popTasksButton = document.querySelector("#popTasks")
const generateTasksButton = document.querySelector("#generateTasks")


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

    if (tasksInput.value.length > 0) {
        tasks.push(tasksInput.value)
        updateList("add")
    }

    tasksInput.focus()
}

const popTasks = () => {
    const tasksInput = document.querySelector("#tasksInput")
    tasks.pop(tasksInput.value)
    updateList("pop")
    tasksInput.focus()
}

const formattedWeekday = (date) => {
    const options = { weekday: "long" }
    const formatter = new Intl.DateTimeFormat("pt-BR", options)
    const [dayOfWeek] = formatter.format(date).split("-")
    return dayOfWeek.toUpperCase()

}

const formattedDayAndMonth = (date) => {
    const options = { day: "2-digit", month: "2-digit" }
    const formattedDate = date.toLocaleDateString("pt-BR", options)
    return formattedDate
}

const addToMain = (elementParent, elementText) => {
    let element

    if (elementText) {
        element = document.createElement("div")
        element.textContent = elementText
        elementParent.appendChild(element)
        return element
    }

    element = document.createElement("br")
    elementParent.appendChild(element)
    return element
}

const addFirstHalf = (mainElement, formattedDate) => {
    addToMain(mainElement, "Vamos lá, segue as demandas:")
    addToMain(mainElement, `Data: ${formattedDate}`)
    addToMain(mainElement)
    addToMain(mainElement, "Obs.: O suporte hoje ficaram com Sr.s @Renan T.I @Romário @JOÃO T.I @Samuel")
    addToMain(mainElement)
    addToMain(mainElement, "Bom dia a todos!")
    addToMain(mainElement)
}

const addList = (parentElement) => {
    const list = document.createElement("ul")

    tasks.forEach(itemText => {
        const listItem = document.createElement("li")
        listItem.textContent = "⛔ " + itemText
        list.appendChild(listItem)
    })

    parentElement.appendChild(list)
}

const addSecondHalf = (mainElement) => {
    addToMain(mainElement, "Demais demandas, avisar no meu Privado. Conto com a AJUDA DO TRANSPORTE DAS UBS PARA PODEMOS IR NA UNIDADE⚠💾✅")
    addToMain(mainElement)
    addToMain(mainElement, "Obs.: CASO ALGUMA UBS PRECISE DE TINTA PARA IMPRESSORA AVISE ANTES QUE ACABE ⚠🫡📍")
}

const generateTasks = () => {
    const date = new Date()
    const formattedDate = `${formattedDayAndMonth(date)} ${formattedWeekday(date)}`

    const mainElement = document.querySelector("main")
    mainElement.textContent = ""
    addFirstHalf(mainElement, formattedDate)
    addList(mainElement)
    addSecondHalf(mainElement)
}

addTasksButton.addEventListener("click", addTasks)
popTasksButton.addEventListener("click", popTasks)
generateTasksButton.addEventListener("click", generateTasks)
