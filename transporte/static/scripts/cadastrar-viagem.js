const form = document.querySelector("#form")
const pesquisarCpfButton = document.querySelector("#pesquisar-cpf")
const cpfInput = document.querySelector("#cpf")
const viagemFields = document.querySelectorAll(".inputs input, .inputs select, .actions button")
const cadastrarButton = form.querySelector("button[type='submit']")

viagemFields.forEach(field => field.disabled = true)

pesquisarCpfButton.addEventListener("click", function () {
    const cpf = cpfInput.value

    if (cpf == "") return

    fetch("/buscar-paciente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpf })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Erro ao validar CPF")
            }
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            if (data && typeof data === "object" && data.length > 0) {
                viagemFields.forEach(field => field.disabled = false)

                document.querySelector("#nome").value = data[0].nome || ""
                document.querySelector("#endereco").value = data[0].endereco || ""
                document.querySelector("#bairro").value = data[0].bairro || ""
                document.querySelector("#contato").value = data[0].contato || ""
                document.querySelector("#cpf").value = data[0].cpf || ""

            } else {
                alert("CPF inválido. Por favor, verifique ou insira o novo paciente.")
            }
        })
        .catch(function (error) {
            console.error("Erro:", error)
            alert("Erro ao validar CPF. Por favor, tente novamente.")
        })
})

form.addEventListener("submit", function (event) {
    event.preventDefault()

    const cpf = document.querySelector("#cpf").value
    const nome = document.querySelector("#nome").value
    const endereco = document.querySelector("#endereco").value
    const bairro = document.querySelector("#bairro").value
    const contato = document.querySelector("#contato").value
    const data = document.querySelector("#data").value
    const cidade_destino = document.querySelector("#cidadeDestino").value
    const local = document.querySelector("#local").value
    const acompanhante = document.querySelector("#acompanhante").value
    const obs = document.querySelector("#obs").value
    const motivo = document.querySelector("#motivo").value

    const formData = {
        cpf,
        nome,
        endereco,
        bairro,
        contato,
        data,
        cidade_destino,
        local,
        acompanhante,
        obs,
        motivo
    }

    console.log(formData)

    fetch("/submit-viagem", {
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
            alert(data.message)
            form.reset()
            viagemFields.forEach(field => field.disabled = true)
        })
        .catch(function (error) {
            console.error("Erro:", error)
            alert("Erro ao enviar dados. Por favor, tente novamente.")
        })
})
