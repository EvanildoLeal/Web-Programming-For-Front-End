// Elementos do DOM
const form = document.getElementById("imcForm");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const resultadoDiv = document.getElementById("resultado");
const imcValorSpan = document.getElementById("imcValor");
const classificacaoDiv = document.getElementById("classificacao");
const dicaDiv = document.getElementById("dica");

// Função para calcular o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Função para classificar o IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            classificacao: "Abaixo do peso",
            classe: "abaixo-peso",
            dica: "Considere consultar um nutricionista para uma dieta adequada."
        };
    } else if (imc < 24.99) {
        return {
            classificacao: "Peso normal",
            classe: "peso-normal",
            dica: "Mantenha uma alimentação equilibrada e pratique exercícios regularmente."
        };
    } else if (imc < 29.99) {
        return {
            classificacao: "Sobrepeso",
            classe: "sobrepeso",
            dica: "Adote uma dieta saudável e aumente a atividade física."
        };
    } else if (imc < 34.99) {
        return {
            classificacao: "Obesidade Grau I",
            classe: "obesidade-grau-1",
            dica: "Procure orientação médica para um plano de perda de peso."
        };
    } else if (imc < 39.99) {
        return {
            classificacao: "Obesidade Grau II",
            classe: "obesidade-grau-2",
            dica: "É importante buscar ajuda profissional para um tratamento adequado."
        };
    } else {
        return {
            classificacao: "Obesidade Grau III",
            classe: "obesidade-grau-3",
            dica: "Procure um médico para avaliação e tratamento especializado."
        };
    }
}

// Função para exibir resultados
function exibirResultados(imc, classificacao) {
    imcValorSpan.textContent = imc.toFixed(1);
    classificacaoDiv.textContent = classificacao.classificacao;
    classificacaoDiv.className = `classificacao ${classificacao.classe}`;
    dicaDiv.textContent = classificacao.dica;
    resultadoDiv.classList.remove("hidden");
    
    // Rolagem suave para o resultado
    resultadoDiv.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Função para validar dados
function validarDados(peso, altura) {
    if (isNaN(peso) || peso <= 0 || peso > 500) {
        alert("Por favor, insira um peso válido entre 1 e 500 kg.");
        return false;
    }
    if (isNaN(altura) || altura <= 0 || altura > 3) {
        alert("Por favor, insira uma altura válida entre 0,5 e 3 metros.");
        return false;
    }
    return true;
}

// Event listeners para os inputs (esconder resultado quando editar)
pesoInput.addEventListener("input", function() {
    resultadoDiv.classList.add("hidden");
});

alturaInput.addEventListener("input", function() {
    resultadoDiv.classList.add("hidden");
});

// Event listener para o formulário
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    
    // Validar dados
    if (!validarDados(peso, altura)) {
        return;
    }
    
    // Calcular IMC
    const imc = calcularIMC(peso, altura);
    
    // Classificar IMC
    const classificacao = classificarIMC(imc);
    
    // Exibir resultados
    exibirResultados(imc, classificacao);
});

// Focar no primeiro input ao carregar a página
window.addEventListener('load', function() {
    pesoInput.focus();
});