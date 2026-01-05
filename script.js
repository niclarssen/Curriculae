// Funções para adicionar campos dinâmicos
function addExp() {
    const div = document.createElement('div');
    div.className = 'item-form';
    div.innerHTML = `
        <input type="text" placeholder="Empresa" class="exp-empresa" oninput="atualizar()">
        <input type="text" placeholder="Cargo" class="exp-cargo" oninput="atualizar()">
        <textarea placeholder="Descrição" class="exp-desc" oninput="atualizar()"></textarea>
    `;
    document.getElementById('form-experiencias').appendChild(div);
}

function addEdu() {
    const div = document.createElement('div');
    div.className = 'item-form';
    div.innerHTML = `
        <input type="text" placeholder="Curso" class="edu-curso" oninput="atualizar()">
        <input type="text" placeholder="Instituição" class="edu-inst" oninput="atualizar()">
    `;
    document.getElementById('form-educacao').appendChild(div);
}

// Atualização em tempo real
function atualizar() {
    // Básicos
    document.getElementById('out-nome').innerText = document.getElementById('in-nome').value || "Seu Nome";
    document.getElementById('out-cargo').innerText = document.getElementById('in-cargo').value || "Seu Cargo";
    
    // Contato
    const email = document.getElementById('in-email').value;
    const tel = document.getElementById('in-tel').value;
    const cid = document.getElementById('in-cidade').value;
    document.getElementById('out-contato').innerText = `${email} | ${tel} | ${cid}`;

    // Resumo
    const resumo = document.getElementById('in-resumo').value;
    document.getElementById('out-resumo').innerText = resumo;
    document.getElementById('secao-resumo').style.display = resumo ? 'block' : 'none';

    // Experiências
    const empresas = document.querySelectorAll('.exp-empresa');
    const cargos = document.querySelectorAll('.exp-cargo');
    const descs = document.querySelectorAll('.exp-desc');
    let htmlExp = "";
    empresas.forEach((emp, i) => {
        if(emp.value) htmlExp += `<div class='item'><strong>${cargos[i].value}</strong> - ${emp.value}<p>${descs[i].value}</p></div>`;
    });
    document.getElementById('out-exp').innerHTML = htmlExp;

    // Habilidades
    const habs = document.getElementById('in-hab').value.split(',');
    let htmlHab = "";
    habs.forEach(h => { if(h.trim()) htmlHab += `<li>${h.trim()}</li>`; });
    document.getElementById('out-hab').innerHTML = htmlHab;

    function atualizar() {
    // ... (outros códigos)
    
    const tel = document.getElementById('in-tel').value;
    const outContato = document.getElementById('out-contato');
    
    // Se o telefone estiver preenchido, exibe com o ícone
    let infoTel = tel ? `<span>📞 ${tel}</span>` : "";
    
    // Atualiza o local do contato no preview
    // Supondo que você tenha outros campos como email e cidade:
    const email = document.getElementById('in-email').value;
    let infoEmail = email ? `<span>📧 ${email}</span>` : "";
    
    outContato.innerHTML = `${infoEmail} ${infoTel}`;
    
    // ... (restante da função)
}
}

// Função para gerar PDF
function gerarPDF() {
    const element = document.getElementById('folha-curriculo');
    const opt = {
        margin: 0,
        filename: 'meu-curriculo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

function mascaraTelefone(input) {
    let v = input.value;
    
    // Remove tudo o que não for dígito
    v = v.replace(/\D/g, "");
    
    // Formata: (11) 99999-9999
    if (v.length > 0) {
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (v.length > 9) {
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (v.length > 5) {
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    
    input.value = v;
}