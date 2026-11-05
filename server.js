const express = require ("express")
const cors = require ("cors")
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "db_discoteca"
})

db.connect((erro) =>{
    if(erro) {
       console.error("Erro ao conectar ao banco de dados:", erro) 
    }else{
        console.log("Conectado ao banco de dados")
    }
        
})

const mostrarJogos =(req, res) =>{
    const sql = "id, titulo, plataforma, desenvolvedora, imagem_url AS imagem, preco, data_cadastro"
db.query(sql,(erro, resultados)=>{
    if(erro){
        return res.status(500).send("Erro ao consultar banco de dados",erro)
    }
    res.send(resultados)
    })
}
const novoJogo =(req, res) =>{
    const {id, titulo, plataforma, desenvolvedora, imagem, preco, data_cadastro}=req.body
    if(id&& titulo && plataforma && desenvolvedora && imagem && preco && data_cadastro){
        const sql = "INSERT INTO discos (id, titulo, plataforma, desenvolvedora, imagem, preco, data_cadastro)VALUES(?,?,?,?,?,?,?)"
        const valores = [id, titulo, plataforma, desenvolvedora, imagem, preco, data_cadastro]

db.query(sql,(erro, resultados)=>{
    if(erro){
        return res.status(500).send("Erro ao criar jogo", erro)
    }
    res.send("Jogo cadastrado com sucesso")
})
    }else{
        res.status(400).send("Erro: Preencha todos os campos") 
    }
}
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const porta=3000

app.get("/jogos", mostrarJogos)
app.post("/jogo", novoJogo)

app.listen(porta,()=>{
    console.log(`Servidor rodando (alegria) porta ${porta}`)
})