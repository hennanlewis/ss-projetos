const form = document.querySelector("#form")
const messageElement = document.querySelector("#message")

form.addEventListener("submit", function (event) {
    event.preventDefault()

    const nome = document.querySelector("#nome").value
    const veiculo = document.querySelector("#veiculo").value
    const quantidade_passageiros = document.querySelector("#quantidade_passageiros").value

    const formData = {
        nome,
        veiculo,
        quantidade_passageiros
    }

    fetch("/submit-motorista", {
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
