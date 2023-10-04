const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response){
    response.json({
        nome: "Adriana Gutierrez",
        imagem: "",
        minibio: "Faço parte da turma 40+, sou mãe e desenvolvedora web jr.",
        citacao: ""
    })
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta: ", porta);
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta)