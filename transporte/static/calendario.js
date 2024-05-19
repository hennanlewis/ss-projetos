function createElement(elementParent, elementType, textContent, className, href) {
    const element = document.createElement(elementType)
    if (!!className) element.classList.add(className)
    if (!!href) element.href = href
    element.textContent = textContent
    elementParent.appendChild(element)
}

function monthsForLocale(position) {
    const format = new Intl
        .DateTimeFormat("pt-BR", { month: "long" }).format
    return [...Array(12).keys()]
        .map((m) => format(new Date(Date.UTC(2021, (m + 1) % 12))))[position - 1]
}

function generateCalendar() {
    const date = new Date()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const daysInMonth = new Date(year, month, 0).getDate()

    const firstDay = new Date(year, month - 1, 1).getDay()
    const lastDay = new Date(year, month, 0).getDay()

    let prevMonthDays = new Date(year, month - 1, 0).getDate()

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

    const calendar = document.querySelector("#calendar")
    weekDays.forEach(day => createElement(calendar, "div", day, "title"))

    for (let day = 0; day < firstDay; day++) {
        const value = prevMonthDays - firstDay + day + 1
        createElement(calendar, "div", value, "last-month")
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const className = day == date.getDate() && "today"
        const currentDate = `${year}-${String(month).padStart("2", "0")}-${String(day).padStart("2", "0")}`
        const href = `/lista-viagens?date=${currentDate}`;
        createElement(calendar, "a", day, className, href)
    }

    for (let day = 0; day < 6 - lastDay; day++) {
        createElement(calendar, "div", day + 1, "next-month")
    }
}

generateCalendar()
