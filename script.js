

// Função para formatar hora com dois dígitos
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

// Configurar data e hora atuais como padrão
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    
    // Formatar data (YYYY-MM-DD)
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('dataInput').value = `${yyyy}-${mm}-${dd}`;
    
    // Formatar hora (HH:MM)
    const horas = padTo2Digits(today.getHours());
    const minutos = padTo2Digits(today.getMinutes());
    document.getElementById('horarioInput').value = `${horas}:${minutos}`;
});

function showSuccessMessage() {
    const instructions = document.getElementById('instructions');
    instructions.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 24px; color: #25D366;">✔️ Mensagem copiada com sucesso!</div>
            <div style="margin-top: 15px; font-size: 18px;">📲 Agora cole no grupo do WhatsApp</div>
            <div style="margin-top: 10px;">
                <button onclick="window.close()">Fechar Janela</button>
            </div>
        </div>
    `;
    instructions.style.display = 'block';
    instructions.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('generateButton').addEventListener('click', async function() {
    // Validação do motorista e km
    if (!document.getElementById('kmInput').value.trim()) {
        alert('Por favor, preencha o Km da Viatura');
        return;
    }

    if (!document.getElementById('motoristaInput').value.trim()) {
        alert('Por favor, preencha o nome do motorista');
        return;
    }

    // Obter valores dos campos
    const data = document.getElementById('dataInput').value;
    const horario = document.getElementById('horarioInput').value;
    const atalaia = document.getElementById('atalaiaInput').value;
    const km = document.getElementById('kmInput').value || "Não informado";
    const oleo = document.getElementById('oleoInput').value;
    const agua = document.getElementById('aguaInput').value;
    const comb = document.getElementById('combInput').value;
    const radio = document.getElementById('radioInput').value;
    const sirene = document.getElementById('sireneInput').value;
    const pneus = document.getElementById('pneusInput').value;
    const motorista = document.getElementById('motoristaInput').value;
    const observacoes = document.getElementById('observacoesInput').value;
    
    // Formatar data
    let dataFormatada = data;
    if(data.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [yyyy, mm, dd] = data.split('-');
        dataFormatada = `${dd}/${mm}/${yyyy}`;
    }
    
    // Criar mensagem formatada
    const mensagem = `🌵*PMBA - CPE - CIPGd-FSA*🌵
      
🚔 - *Setor de Transporte*

*Assunção de Serviço*: Sede da CIPGd
*Data:* ${dataFormatada}
*Horário:* ${horario}
*Atalaia:* ${atalaia}
*Km Assunção Serviço:* ${km}
*Nível óleo:* ${oleo}
*Nível água:* ${agua}
*Nível Comb:* ${comb}
*Rádio:* ${radio}
*Sirene:* ${sirene}
*Pneus:* ${pneus}
*Motorista:* ${motorista}

*Observações*: 
${observacoes.split('\n').map(line => line.trim() ? '- ' + line : '').join('\n')}

*PMBA, _uma força a serviço do cidadão_*`;

    try {
        // Tentativa de cópia moderna
        await navigator.clipboard.writeText(mensagem);
        showSuccessMessage();
    } catch (err) {
        // Fallback para cópia tradicional
        const textarea = document.createElement('textarea');
        textarea.value = mensagem;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showSuccessMessage();
    }
});
