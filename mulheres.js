const express = require("express") //iniciando o express
const router = express.Router() //configurando a a primeira parte da rota
const cors = require("cors") // trazendo o pacote cors pra assumir essa api no front-end
//const { v4: uuidv4 } = require('uuid'); //copiada do site https://www.npmjs.com/package/uuid

const conectaBancoDeDados = require("./bancoDeDados") //conexão com o arquivo banco de dados
conectaBancoDeDados() //chamando a função que conecta o banco de dados

const Mulher = require("./mulherModel")

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //criando a porta

// //criando a lista inicial de mulheres na tec
// const mulheres = [
//     {
//         id: "1",
//         nome: "Adriana Gutierrez",
//         imagem: "",
//         minibio: "Desenvolvedora Web Jr 40+"
//     },
//     {
//         id: "2",
//         nome: "Simara Conceição",
//         imagem: "",
//         minibio: "Profa do curso Programaria"
//     }
// ]

//GET
async function mostraMulheres(request, response){
    try {
        const mulheresDoBancoDados = await Mulher.find()
        response.json(mulheresDoBancoDados)

    } catch (error) {
        console.log(error);
    }

}

//POST
async function criaMulher(request, response){
    const novaMulher = new Mulher({
        //id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    //mulheres.push(novaMulher)
    
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
        
    } catch (error) {
        console.log(error);
    }
}

//PATCH
async function corrigeMulher(request, response){
    //function encontraMulher(mulher){
    //    if(mulher.id === request.params.id){
    //        return mulher
    //    }
    // }

    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
    
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if(request.body.imagem){
            mulherEncontrada = request.body.imagem
        }

        if(request.body.citacao){
            mulherEncontrada = request.body.citacao
        }
        
        const mulherAtualizadaBancoDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaBancoDados)

    } catch (error) {
        console.log(error);
    }

    //const mulherEncontrada = mulheres.find(encontraMulher)

}

//DELETE
async function deletaMulher(request, response){

    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: "Mulher deletada com sucesso!"})
        
    } catch (error) {
        console.log(error);
    }

}

//Porta
function mostraPorta(){
    console.log("Servidor criado e rodando na porta: ", porta);
}

app.use(router.get("/mulheres", mostraMulheres)) //configuração da rota GET /mulheres
app.use(router.post("/mulheres", criaMulher)) //configuração da rota POST /mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher)) //configuração da rota PATCH /mulheres/:id
app.use(router.delete("/mulheres/:id", deletaMulher)) //configuração da rota Delete /mulheres

app.listen(porta, mostraPorta) //servirdor ouvindo a porta