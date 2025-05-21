// Função utilitária para dois dígitos
const pad2 = n => n.toString().padStart(2, '0');

// Elementos do formulário (pegos uma única vez)
const elData = document.getElementById('dataInput');
const elHorario = document.getElementById('horarioInput');
const elAtalaia = document.getElementById('atalaiaInput');
const elKm = document.getElementById('kmInput');
const elOleo = document.getElementById('oleoInput');
const elAgua = document.getElementById('aguaInput');
const elComb = document.getElementById('combInput');
const elRadio = document.getElementById('radioInput');
const elSirene = document.getElementById('sireneInput');
const elPneus = document.getElementById('pneusInput');
const elMotorista = document.getElementById('motoristaInput');
const elObs = document.getElementById('observacoesInput');
const elBtn = document.getElementById('generateButton');
const elInstructions = document.getElementById('instructions');

// Define data e hora ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    elData.value = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
    elHorario.value = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
});

function validarCamposObrigatorios() {
    if (!elKm.value.trim()) {
        alert('Por favor, preencha o Km da Viatura');
        elKm.focus();
        return false;
    }
    if (!elMotorista.value.trim()) {
        alert('Por favor, preencha o nome do motorista');
        elMotorista.focus();
        return false;
    }
    return true;
}

function showSuccessMessage() {
    elInstructions.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 24px; color: #25D366;">✔️ Mensagem copiada com sucesso!</div>
            <div style="margin-top: 15px; font-size: 18px;">📲 Agora cole no grupo do WhatsApp</div>
            <div style="margin-top: 10px;">
                <button onclick="window.close()">Fechar Janela</button>
            </div>
        </div>
    `;
    elInstructions.style.display = 'block';
    elInstructions.scrollIntoView({ behavior: 'smooth' });
}

elBtn.addEventListener('click', async function() {
    if (!validarCamposObrigatorios()) return;

    // Formata data para DD/MM/YYYY
    const [yyyy, mm, dd] = elData.value.split('-');
    const dataFormatada = `${dd}/${mm}/${yyyy}`;

    const mensagem = `🌵*PMBA - CPE - CIPGd-FSA*🌵

🚔 - *Setor de Transporte*

*Assunção de Serviço*: Sede da CIPGd
*Data:* ${dataFormatada}
*Horário:* ${elHorario.value}
*Atalaia:* ${elAtalaia.value}
*Km Assunção Serviço:* ${elKm.value || "Não informado"}
*Nível óleo:* ${elOleo.value}
*Nível água:* ${elAgua.value}
*Nível Comb:* ${elComb.value}
*Rádio:* ${elRadio.value}
*Sirene:* ${elSirene.value}
*Pneus/Step:* ${elPneus.value}
*Motorista:* ${elMotorista.value}

*Observações*: 
${elObs.value.split('\n').map(l => l.trim() ? '- ' + l : '').join('\n')}

*PMBA, _uma força a serviço do cidadão_*`;

    try {
        await navigator.clipboard.writeText(mensagem);
        showSuccessMessage();
    } catch {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = mensagem;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showSuccessMessage();
    }
});
