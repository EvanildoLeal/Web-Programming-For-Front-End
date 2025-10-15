const cep = document.querySelector('#cep');
const uf = document.querySelector('#uf');
const cidade = document.querySelector('#cidade');
const bairro = document.querySelector('#bairro');
const rua  = document.querySelector('#rua');
const alert = document.querySelector('.alerts');
const loader = document.querySelector('.loader');


const validarCep = (e) => {
   e.target.value = e.target.value.replace(/[^0-9]/, '');
}


const buscarCep = async (e) => {
    let cepPesquisado = e.target.value;
    loader.style.display = 'inline-block';

    if(!cepPesquisado) {
        loader.style.display = 'none';
        return;
    }


    const url = `https://viacep.com.br/ws/${cepPesquisado}/json/`;

    const response = await fetch(url);

    const data = await response.json();
    desabilitarForms(true);

    try{
        if(data.erro) {
            throw new Error('CEP não Encontrado, verifique o numero e tente novamente');
        }

        preencherDados(data)
        setTimeout(() => {
            desabilitarForms(false);
        }, 2000);

    } catch(error) {
        erroHandler(error);
    }

}


const erroHandler = (error = "Algo deu errado !") => {
    alert.classList.add('show--alert')
    alert.textContent = `${error.message}`;

    setTimeout(() => {
        loader.style.display = 'none';
        alert.classList.remove('show--alert')
        desabilitarForms(false);
    }, 2000);

}



const preencherDados = (dados) => {
    uf.value = dados.uf
    bairro.value = dados.bairro
    cidade.value = dados.localidade
    rua.value = dados.logradouro

    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
}


const desabilitarForms = (state) => {
    uf.disabled = state;
    bairro.disabled = state;
    cidade.disabled = state;
    rua.disabled = state;

}




cep.addEventListener('input', validarCep);
cep.addEventListener('blur', buscarCep);