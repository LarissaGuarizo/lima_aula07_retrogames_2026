const API_URL = "http://localhost:3000"
const btnCadastrar = document.getElementById('btnCadastrar')
const btnCancelar = document.getElementById("btnCancelar")
const modal = document.getElementById('Cadastro')
const form = document.getElementById("formJogo")
const lista = document.getElementById("listarJogos")
const mensagem = document.getElementById("mensagemVazia")

btnCadastrar.addEventListener("click", ()=>{
    modal.showModal()
})
btnCancelar.addEventListener("click",()=>{
    modal.closest()
})

async function carregarJogos() {
     try{
        const resposta = await fetch(API_URL + '/listar')
        const jogos = await resposta.json()

        lista.innerHTML=""
        if(jogos.length == 0){
            mensagemVazia.hidden = false
            lista.appendChild(mensagemVazia)
            return
        }

        mensagemVazia.hidden = true
        //Renderize os discos encontrados
        jogos.forEach(jogo => {
            criarCard(jogo.album, jogo.artista, jogo.genero, jogo.imagem, jogo.preco)
        })
    }catch (erro){
        console.error("Erro ao carregar jogos: ", erro)
        alert("Não foi possível conectar ao servidor")
    }
}
form.addEventListener("submit",(evento)=>{
    evento.preventDefault()
    const jogo = document.getElementById("jogo").value.trim()
    const plataforma = document.getElementById("plataforma").value.trim()
    const desenvolvedora = document.getElementById("desenvolvedora").value.trim()
    const imagem = document.getElementById("imagem").value.trim()
    const preco = Number(document.getElementById("preco").value)

    criarCard(jogo,plataforma,desenvolvedora,imagem,preco)
    form.reset()
    modal.close()
})
function criarCard(jogo, plataforma,desenvolvedora, imagem, preco){
    mensagemVazia.hidden = true;

    const card = document.createElement("article")
    card.classList.add("card-jogo")
    const capa = document.createElement("div")
capa.classList.add("capa")
const imagemCapa = document.createElement("img")
imagemCapa.src = imagem
capa.appendChild(imagemCapa)
const info = document.createElement("div")
info.classList.add("info-jogo" )
const titulo =document.createElement("h3")
titulo.textContent = jogo
const tituloJogo = document.createElement("p")
tituloJogo.textContent = "Jogo: " + jogo
const nomePlataforma = document.createElement("p")
nomePlataforma.textContent = "Plataforma: " + plataforma
const nomeDesenvolvedora = document.createElement("p")
nomeDesenvolvedora.textContent = "Desenvolvedora: " + desenvolvedora
const valor = document.createElement("strong")
valor.classList.add("preco")
valor.textContent = preco.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
    info.append(jogo,plataforma,desenvolvedora,imagem,preco)
    card.append(capa,info)
    lista.appendChild(card)


}