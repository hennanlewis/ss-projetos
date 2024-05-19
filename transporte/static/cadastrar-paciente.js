const form = document.querySelector("#form")
const messageElement = document.querySelector("#message")

form.addEventListener("submit", function (event) {
    event.preventDefault()

    const cpf = document.querySelector("#cpf").value
    const nome = document.querySelector("#nome").value
    const endereco = document.querySelector("#endereco").value
    const bairro = document.querySelector("#bairro").value
    const contato = document.querySelector("#contato").value

    const formData = {
        cpf,
        nome,
        endereco,
        bairro,
        contato
    }

    fetch("submit-pessoa", {
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
        })
        .catch(function (error) {
            console.error("Erro:", error)
            alert("Erro ao enviar dados. Por favor, tente novamente.")
        })
})
