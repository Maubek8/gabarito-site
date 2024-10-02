// Verifica se o navegador suporta a API de mídia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureButton = document.getElementById('captureButton');
    const correctionMessage = document.getElementById('correctionMessage');
    const resultadosDiv = document.getElementById('resultados');

    // Acessa a câmera do dispositivo
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.error("Erro ao acessar a câmera: ", err);
            alert("Erro ao acessar a câmera: " + err.message);
        });

    // Captura a imagem do vídeo quando o botão é clicado
    captureButton.addEventListener('click', function() {
        // Desenha o vídeo no canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Converte o conteúdo do canvas em uma imagem para análise de QR code
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        
        // Verifica se um QR code foi detectado
        if (code) {
            correctionMessage.style.display = "block";
            correctionMessage.textContent = "QR Code detectado: " + code.data;

            // Aqui você pode processar o QR code, buscar o aluno no banco de dados ou lista, e calcular a nota
            const nomeAluno = `Aluno: ${code.data}`;  // Simulação de busca do nome do aluno
            const notaAluno = Math.floor(Math.random() * 10 + 1);  // Gera uma nota aleatória (1 a 10)
            const resultado = `Nome: ${nomeAluno}, Nota: ${notaAluno}`;

            // Exibe o resultado no elemento de resultados
            const resultadoElemento = document.createElement('p');
            resultadoElemento.textContent = resultado;
            resultadosDiv.appendChild(resultadoElemento);
        } else {
            correctionMessage.style.display = "block";
            correctionMessage.textContent = "Nenhum QR Code detectado. Tente novamente.";
        }
    });
} else {
    alert("API de mídia não suportada no seu navegador.");
    console.error("API de mídia não suportada. Verifique se você está rodando a página em HTTPS.");
}
