const form = document.querySelector("#form")
const dadosContainer = document.querySelector("#dados")

const atualizarPaciente = (formData) => {
    fetch("editar-paciente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Erro ao enviar dados")
            }
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            document.querySelector("#edit-form").remove()
            alert(data.message)
        })
        .catch(function (error) {
            console.error("Erro:", error)
            alert("Erro ao enviar dados. Por favor, tente novamente.")
        })
}

const removeCards = (row) => {
    dadosContainer.innerHTML = ""

    const editForm = document.createElement("form")
    editForm.id = "edit-form"
    editForm.classList.add("contentForm")

    editForm.innerHTML = `
        <div class="inputs">
            <label>
                <span>CPF</span>
                <input type="text" id="cpf" name="cpf" value="${row.cpf}" required>
            </label>
            <label>
                <span>Nome</span>
                <input type="text" id="nome" name="nome" value="${row.nome}" required>
            </label>
            <label>
                <span>Endereço</span>
                <input type="text" id="endereco" name="endereco" value="${row.endereco}" required>
            </label>
            <label>
                <span>Bairro</span>
                <input type="text" id="bairro" name="bairro" value="${row.bairro}" required>
            </label>
            <label>
                <span>Contato</span>
                <input type="text" id="contato" name="contato" value="${row.contato}">
            </label>
        </div>
        <div class="actions">
            <button type="submit">Editar</button>
        </div>
    `

    editForm.addEventListener("submit", function (event) {
        event.preventDefault()

        const formData = {
            id: String(row.id),
            cpf: document.getElementById("cpf").value,
            nome: document.getElementById("nome").value,
            endereco: document.getElementById("endereco").value,
            bairro: document.getElementById("bairro").value,
            contato: document.getElementById("contato").value
        }

        atualizarPaciente(formData)
    })

    dadosContainer.appendChild(editForm)
}

form.addEventListener("submit", function (event) {
    event.preventDefault()

    const cpf = document.querySelector("[name='cpf']").value

    fetch("buscar-paciente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpf })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Erro ao enviar dados")
            }
            return response.json()
        })
        .then(function (data) {
            dadosContainer.innerHTML = ""

            if (data.length === 0) {
                dadosContainer.textContent = "Nenhum paciente encontrado."
                return
            }

            data.forEach(function (row) {
                const card = document.createElement("div")
                card.classList.add("card")

                const cardContent = `
                <h2>${row.nome}</h2>
                <p><strong>CPF:</strong> ${row.cpf}</p>
                <p><strong>Endereço:</strong> ${row.endereco}, ${row.bairro}</p>
                <p><strong>Contato:</strong> ${row.contato}</p>
                <button class="botaoEditar" data-id="${row.id}">Editar</button>
            `
                card.innerHTML = cardContent

                const editButton = card.querySelector(".botaoEditar")
                editButton.addEventListener("click", () => removeCards(row))

                dadosContainer.appendChild(card)
            })
        })
        .catch(function (error) {
            console.error("Erro:", error)
        })
})
