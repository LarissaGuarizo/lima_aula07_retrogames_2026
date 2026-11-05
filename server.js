const express = require ("express")
const cors = require ("cors")
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "db_retrogames"
})

db.connect((erro) =>{
    if(erro) {
       console.error("Erro ao conectar ao banco de dados:", erro) 
    }else{
        console.log("Conectado ao banco de dados")
    }
        
})

const mostrarJogos =(req, res) =>{
    const sql = "select id, titulo, plataforma, desenvolvedora, imagem_url AS imagem, preco from jogos"
db.query(sql,(erro, resultados)=>{
    if(erro){
        return res.status(500).send("Erro ao consultar banco de dados",erro)
    }
    res.send(resultados)
    })
}
const novoJogo =(req, res) =>{
    const {titulo, plataforma, desenvolvedora, imagem, preco}=req.body
    if(titulo && plataforma && desenvolvedora && imagem && preco){
        const sql = "INSERT INTO jogos (titulo, plataforma, desenvolvedora, imagem, preco)VALUES(?,?,?,?,?)"
        const valores = [titulo, plataforma, desenvolvedora, imagem, preco]

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

app.get("/listar", mostrarJogos)
app.post("/cadastrar", novoJogo)

app.listen(porta,()=>{
    console.log(`Servidor rodando (alegria) porta ${porta}`)
})