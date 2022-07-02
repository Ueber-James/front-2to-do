const nome = document.getElementById('nome')
const sobrenomee = document.getElementById('sobrenome')
const senha = document.getElementById('password')
const resenha = document.getElementById('repassword')
const email = document.getElementById('email')
const bnt = document.getElementById('botao')


// const regexsenha =  /^(?=.*[a-z]) (?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,15})$/
const regexNum = /[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/

bnt.addEventListener('click', (evento)=>{

    evento.preventDefault()
    console.log('prevent');


    const habilitaBtnSing= (disab) =>{
        if(disab){
          bnt.removeAttribute('disabled')
        }
        else{
          bnt.setAttribute('disabled' , ' ')
        }
      };

    
    function validacao(){
         if(
          regexNum.test(email.value) && senha.value.length && senha.value == resenha.value && nome.value != '' && sobrenomee.value !='')
    {
        alert('usuario criado')

    }else{
        bnt.setAttribute('disabled', '' )
        bnt.classList.add('buttonRed')
    };
};


});
