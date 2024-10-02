document.addEventListener("DOMContentLoaded", function() {
    // Variáveis globais
    const gabaritoMessage = document.getElementById("gabaritoMessage");
    const alunosMessage = document.getElementById("alunosMessage");
    const correctionMessage = document.getElementById("correctionMessage");

    // Gabarito - Passo 1
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

        gabaritoMessage.style.display = "block";
        gabaritoMessage.textContent = "Gabarito salvo com sucesso!";
        document.getElementById("editGabarito").style.display = "inline";
        document.getElementById("printGabarito").style.display = "inline";
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

            studentsInputDiv.appendChild(labelName);
            studentsInputDiv.appendChild(inputName);
            studentsInputDiv.appendChild(labelRA);
            studentsInputDiv.appendChild(inputRA);
            studentsInputDiv.appendChild(document.createElement("br"));
        }
    });

    // Função para salvar os alunos
    const alunosForm = document.getElementById("alunosForm");
    alunosForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir recarregar página

        alunosMessage.style.display = "block";
        alunosMessage.textContent = "Lista de alunos salva com sucesso!";
        document.getElementById("editAlunos").style.display = "inline";
        document.getElementById("printAlunos").style.display = "inline";
    });

    // Finalizar correção - Passo 4
    const finishButton = document.getElementById("finishCorrection");
    const resultadosDiv = document.getElementById("resultados");
    finishButton.addEventListener("click", function() {
        resultadosDiv.innerHTML = "<p>Correção finalizada. Resultados gerados com sucesso!</p>";
        document.getElementById("printResultados").style.display = "inline";
    });
});
