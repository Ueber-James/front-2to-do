const nomeUsuario = document.getElementById("nomeUsuario");
const listaPendente = document.querySelector("#tarefasPendentes");
const listaTerminadas = document.querySelector("#tarefasTerminadas");

window.onload = function () {
  receberUsuario();

  listarTarefas();
};

function receberUsuario() {
  
  const apiURL = "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe";
  

  const jwt = localStorage.getItem("token");

  const requisicao = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: jwt,
    },
  };

  
  fetch(apiURL,  requisicao,)
    .then((response) => response.json())

    .then(function (data) {
      const dados = `${data.firstName} ${data.lastName}`;

      nomeUsuario.innerHTML = dados;

      
    })

    .catch((err) => {
      console.log(err);
    });
};








const criarTarefa = (evento) => {

  evento.preventDefault()
  const lista = document.querySelector('.tarefas-pendentes')
  const input = document.getElementById('novaTarefa')
  const valor = input.value

  const tarefa = document.createElement('div')

  



// const novaTarefa = document.getElementById('butao')

// novaTarefa.addEventListener('subimt', criarTarefa)
  const jwt = localStorage.getItem("token");
  const apiC = "https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks";
  const data = {
    description: input.value,
    completed: false,
  };
  
  console.log(data);
  
  const configuracaoRequisicao = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": jwt
    },
    body: JSON.stringify(data),
  };
  
  fetch(apiC,  configuracaoRequisicao)
    .then((response) => response.json())

    .then(function (resposta) {
      console.log(resposta)
      const conteudo = `
  <li class="tarefa">
    <div class="not-done"></div>
    <div class="descricao">
      <p class="nome">${valor}</p>
      <p class="timestamp">Criada em:</p>
  </li>
`

  tarefa.innerHTML = conteudo

  lista.appendChild(tarefa)
  input.value = " "

      

      
    })

    .catch((err) => {
      console.log(err);
    });


}






function renderizarTarefas(tasks) {

  listaPendente.innerHTML = "";
  listaTerminadas.innerHTML = "";

  setTimeout(() => {


    for( let task of tasks){

      const dataFormatada = new Date(task.createdAt).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      )

      if(task.completed) {
        listaTerminadas.innerHTML = 
        `<li class="tarefa">
                <div class="not-done"
                onclick="RemoverTarefa(${task.id})></div>
                <div class="descricao">
                  <p class="nome">${task.description}</p>
                  <p class="timestamp"> "Criada em:" ${dataFormatada}</p>
                </div>
              </li>`
      }else{
        listaPendente.innerHTML =  `<li class="tarefa">
        <div class="not-done" onclick="atualizarTarefa(${task.id},true)"></div>
        <div class="descricao">
          <p class="nome">${task.description}</p>
          <p class="timestamp"> Criada em: ${dataFormatada}</p>
        </div>
      </li>`
      }
  }
  
  
}, 2000)

}




function listarTarefas() {

  const urlListar = "https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks"

  const configuracaoListar = {
    method: "GET",
    headers: {

      "Content-type": "application/json",
      "Authorization": localStorage.getItem("token")

    }
  }

  fetch(urlListar,configuracaoListar)
  .then((response) => response.json()).then((data) => {
console.log(data)

  renderizarTarefas(data)

})



}