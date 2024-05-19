const queryString = window.location.search
const params = new URLSearchParams(queryString)
const form = document.querySelector("#form")
const dadosContainer = document.querySelector("#dados")

const buscarEExibirViagens = (date) => {
    fetch("buscar-lista", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ date })
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
                dadosContainer.textContent = "Nenhuma viagem encontrada."
                return
            }
            data.forEach(function (viagem) {
                const card = document.createElement("div")
                card.classList.add("card")
                const cardContent = `
                <h2>${viagem.nome}</h2>
                <p><strong>CPF:</strong> ${viagem.cpf}</p>
                <p><strong>Endereço:</strong> ${viagem.endereco}, ${viagem.bairro}</p>
                <p><strong>Contato:</strong> ${viagem.contato}</p>
                <p><strong>Data:</strong> ${viagem.data}</p>
                <p><strong>Destino:</strong> ${viagem.destino}</p>
                <p><strong>Local:</strong> ${viagem.local}</p>
                <p><strong>Acompanhante:</strong> ${viagem.acompanhante}</p>
                <p><strong>Tipo de Viagem:</strong> ${viagem.tipo_viagem}</p>
            `
                card.innerHTML = cardContent
                dadosContainer.appendChild(card)
            })
        })
        .catch(function (error) {
            console.error("Erro:", error)
        })
}

if (params.has("date")) {
    const date = params.get("date")
    console.log("A data fornecida é:", date)
    buscarEExibirViagens(date) 
} else {
    console.log("Não há parâmetro de data na URL.")
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    const formData = new FormData(form)
    const date = formData.get("date")

    buscarEExibirViagens(date)
})
