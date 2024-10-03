document.addEventListener("DOMContentLoaded", function() {
    const criarProvaBtn = document.getElementById("criarProva");

    criarProvaBtn.addEventListener("click", criarProva);

    function criarProva() {
        const numQuestoesInput = document.getElementById("numQuestoes");
        const tabelaGabarito = document.getElementById("tabelaGabarito");
        const numQuestoes = parseInt(numQuestoesInput.value, 10);

        tabelaGabarito.innerHTML = ''; // Limpa a tabela anterior

        if (isNaN(numQuestoes) || numQuestoes < 1) {
            alert("Insira um número válido de questões.");
            return;
        }

        // Cria as questões do gabarito
        let cabecalho = '<tr><th>Questão</th><th>Resposta</th></tr>';
        tabelaGabarito.innerHTML = cabecalho;

        for (let i = 1; i <= numQuestoes; i++) {
            let linha = `<tr><td>Questão ${i}</td><td><input type="text" class="resposta"></td></tr>`;
            tabelaGabarito.innerHTML += linha;
        }

        document.getElementById("gabaritoVisualizacao").style.display = 'block';
    }

    // Função para salvar o gabarito
    document.getElementById("salvarGabarito").addEventListener("click", function() {
        const respostas = document.querySelectorAll('.resposta');
        let gabarito = [];

        respostas.forEach((resposta, index) => {
            gabarito.push({ questao: index + 1, resposta: resposta.value });
        });

        localStorage.setItem('gabaritoProva', JSON.stringify(gabarito));
        alert("Gabarito salvo com sucesso!");
    });

    // Função para capturar e corrigir gabaritos via câmera (integração com API)
    const video = document.getElementById('cameraFeed');
    const capturarGabaritoBtn = document.getElementById('capturarGabarito');
    const resultadoCorrecao = document.getElementById('resultadoCorrecao');

    // Função para acessar a câmera
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream;
    }).catch(error => {
        console.error("Erro ao acessar a câmera: ", error);
    });

    capturarGabaritoBtn.addEventListener('click', function() {
        // Implementar captura de imagem e correção via API
        resultadoCorrecao.innerHTML = "Correção em andamento...";

        // Exemplo: Simulação de correção
        setTimeout(() => {
            resultadoCorrecao.innerHTML = "Correção completa: 8/10 acertos.";
        }, 2000);
    });
});
