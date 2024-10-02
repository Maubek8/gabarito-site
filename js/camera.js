// Verifica se o navegador suporta a API de mídia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureButton = document.getElementById('captureButton');
    
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
            alert("QR Code detectado: " + code.data);
            // Aqui você pode processar o QR Code e enviar para o servidor ou banco de dados
        } else {
            alert("Nenhum QR Code detectado. Tente novamente.");
        }
    });
} else {
    alert("API de mídia não suportada no seu navegador.");
    console.error("API de mídia não suportada. Verifique se você está rodando a página em HTTPS.");
}
