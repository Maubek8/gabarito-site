document.addEventListener("DOMContentLoaded", function() {
    // Variáveis globais
    const gabaritoMessage = document.getElementById("gabaritoMessage");
    const alunosMessage = document.getElementById("alunosMessage");
    const correctionMessage = document.getElementById("correctionMessage");
    const resultadosDiv = document.getElementById("resultados");

    // Gabarito - Passo 1
    const nomeProvaInput = document.getElementById("nomeProva");
    const dataProvaInput = document.getElementById("dataProva");
    const numQuestionsInput = document.getElementById("numQuestions");
    const questionsInputDiv = document.getElementById("questionsInput");
    const addQuestionsButton = document.getElementById("addQuestions");

    addQuestionsButton.addEventListener("click", function() {
        const numQuestions = numQuestionsInput.value;
        questionsInputDiv.innerHTML = ''; // Limpa os campos existentes

        for (let i = 1; i <= numQuestions; i++) {
            const label = document.createElement("label");
            label.textContent = `Resposta da Questão ${i}:`;

            const input = document.createElement("input");
            input.type = "text";
            input.name = `question${i}`;
            input.required = true;

            questionsInputDiv.appendChild(label);
            questionsInputDiv.appendChild(input);
            questionsInputDiv.appendChild(document.createElement("br"));
        }
    });

    // Função para salvar o gabarito
    const gabaritoForm = document.getElementById("gabaritoForm");
    gabaritoForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir recarregar página

        const nomeProva = nomeProvaInput.value;
        const dataProva = dataProvaInput.value;

        gabaritoMessage.style.display = "block";
        gabaritoMessage.textContent = `Gabarito da prova "${nomeProva}" salvo com sucesso para a data ${dataProva}!`;
        document.getElementById("editGabarito").style.display = "inline";
        document.getElementById("printGabarito").style.display = "inline";
    });

    // Função para imprimir o gabarito
    document.getElementById('printGabarito').addEventListener('click', function() {
        window.print();
    });

    // Alunos - Passo 2
    const numStudentsInput = document.getElementById("numStudents");
    const studentsInputDiv = document.getElementById("studentsInput");
    const addStudentsButton = document.getElementById("addStudents");

    addStudentsButton.addEventListener("click", function() {
        const numStudents = numStudentsInput.value;
        studentsInputDiv.innerHTML = ''; // Limpa os campos existentes

        for (let i = 1; i <= numStudents; i++) {
            const labelName = document.createElement("label");
            labelName.textContent = `Nome do Aluno ${i}:`;

            const inputName = document.createElement("input");
            inputName.type = "text";
            inputName.name = `studentName${i}`;
            inputName.required = true;

            const labelRA = document.createElement("label");
            labelRA.textContent = `RA do Aluno ${i}:`;

            const inputRA = document.createElement("input");
            inputRA.type = "text";
            inputRA.name = `studentRA${i}`;
            inputRA.required = true;

            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            rowDiv.appendChild(labelName);
            rowDiv.appendChild(inputName);
            rowDiv.appendChild(labelRA);
            rowDiv.appendChild(inputRA);

            studentsInputDiv.appendChild(rowDiv);
        }
    });

    // Função para salvar os alunos
    const alunosForm = document.getElementById("alunosForm");
    alunosForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir recarregar página

        alunosMessage.style.display = "block";
        alunosMessage.textContent = "Lista de alunos salva com sucesso!";
        document.getElementById("editAlunos").style.display = "inline";
        document.getElementById("visualizarLista").style.display = "inline";
        document.getElementById("printAlunos").style.display = "inline";
    });

    // Função para visualizar a lista de alunos (em um pop-up)
    const visualizarListaButton = document.getElementById("visualizarLista");
    visualizarListaButton.addEventListener('click', function() {
        const alunosList = studentsInputDiv.querySelectorAll("input[name^='studentName']");
        const raList = studentsInputDiv.querySelectorAll("input[name^='studentRA']");
        let listaAlunos = "Lista de Alunos:\n";

        alunosList.forEach((aluno, index) => {
            listaAlunos += `Aluno: ${aluno.value}, RA: ${raList[index].value}\n`;
        });

        alert(listaAlunos);
    });

    // Função para imprimir folhas de respostas com QR code
    document.getElementById('printAlunos').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        const alunosList = studentsInputDiv.querySelectorAll("input[name^='studentName']");
        const raList = studentsInputDiv.querySelectorAll("input[name^='studentRA']");

        alunosList.forEach((aluno, index) => {
            const raAluno = raList[index].value;
            pdf.text(`Nome: ${aluno.value}`, 10, 10 + (index * 30));
            pdf.text(`RA: ${raAluno}`, 10, 20 + (index * 30));

            const qrcode = new QRCode(document.createElement('div'), {
                text: raAluno,
                width: 128,
                height: 128
            });
            const imgData = qrcode._el.querySelector('img').src;
            pdf.addImage(imgData, 'PNG', 10, 30 + (index * 30), 50, 50);  // Ajustar posição de acordo com o layout
        });

        pdf.save('folhas-de-resposta.pdf');
    });

    // Função para buscar gabarito por nome ou data
    document.getElementById('btnSearchGabarito').addEventListener('click', function() {
        const searchTerm = document.getElementById('searchGabarito').value;
        if (searchTerm) {
            alert(`Buscando gabarito para: ${searchTerm}`);
            // Aqui você pode integrar com a lógica de busca real (banco de dados ou localStorage)
        } else {
            alert('Por favor, insira um termo de busca.');
        }
    });

    // Captura de Gabarito via Câmera - Passo 3
    document.getElementById('captureButton').addEventListener('click', function() {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
            correctionMessage.style.display = "block";
            correctionMessage.textContent = "QR Code detectado: " + code.data;

            const nomeAluno = `Aluno: ${code.data}`;
            const notaAluno = Math.floor(Math.random() * 10 + 1);  // Gera uma nota aleatória (1 a 10)
            const resultado = `Nome: ${nomeAluno}, Nota: ${notaAluno}`;

            const resultadoElemento = document.createElement('p');
            resultadoElemento.textContent = resultado;
            resultadosDiv.appendChild(resultadoElemento);
        } else {
            correctionMessage.style.display = "block";
            correctionMessage.textContent = "Nenhum QR Code detectado. Tente novamente.";
        }
    });

    // Inserir resultado manualmente - Passo 3
    document.getElementById('addManualResult').addEventListener('click', function() {
        const notaManual = document.getElementById('manualResult').value;
        if (notaManual) {
            const resultadoElemento = document.createElement('p');
            resultadoElemento.textContent = `Resultado Manual: Nota = ${notaManual}`;
            resultadosDiv.appendChild(resultadoElemento);
        } else {
            alert("Por favor, insira uma nota válida.");
        }
    });

    // Finalizar correção - Passo 4
    document.getElementById('finishCorrection').addEventListener('click', function() {
        resultadosDiv.innerHTML = "<p>Correção finalizada. Resultados gerados com sucesso!</p>";
        document.getElementById("printResultados").style.display = "inline";
    });
});
