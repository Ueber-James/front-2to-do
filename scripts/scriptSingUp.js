const nameSing = document.querySelector(".name");
const lastName = document.querySelector(".lastName");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const repeatePassword = document.querySelector(".repeatePassword");
const regexNum = /[a-z0-9.]+[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
const button = document.querySelector(".button");
const apiURL = "https://ctd-fe2-todo-v2.herokuapp.com/v1/users";

button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("prevent");

  if (
    nameSing.value != "" &&
    lastName.value != "" &&
    email.value!="" &&
    regexNum.test(password.value) &&
    repeatePassword.value == password.value
    
  ) {
    button.removeAttribute("disabled");
    button.classList.remove("buttonRed");

    const data = {
      firstName: nameSing.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    }
  
  const requisicao = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  
  fetch(apiURL, requisicao)
    
    .then((response) => {

       
      if (response.status == 201) {
        return response.json()
      }
      
    }).then(function (resposta) {
      cadastroSucesso(nameSing.value, lastName.value, email.value, resposta.jwt)
      console.log(resposta)
    })
    
    .catch(error => {
      cadastroErro(error)
    });

  } 
  else {
    
    button.classList.add("buttonRed");
    alert("Todos os campos devem ser preenchidos para que possa prosseguir")
  }

  
});
function cadastroSucesso(nome, sobrenome, email, jsonRecebido) {

  
  localStorage.setItem("user", JSON.stringify({ nome: nome, sobrenome: sobrenome, email: email, token: jsonRecebido }));
  alert("Usuário cadastrado com sucesso")

 
}


function cadastroErro(statusRecebido) {
  console.log("Erro ao cadastrar");
  console.log(statusRecebido);
}