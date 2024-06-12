let clientes = [];
let encomendas = [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function cadastrarCliente() {
    const nome = document.getElementById('nomeCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;

    if (nome && telefone) {
        clientes.push({ nome, telefone });
        alert('Cliente cadastrado com sucesso!');
        document.getElementById('nomeCliente').value = '';
        document.getElementById('telefoneCliente').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function cadastrarEncomenda() {
    const clienteIndex = parseInt(document.getElementById('clienteIndex').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const largura = parseFloat(document.getElementById('largura').value);
    const frase = document.getElementById('frase').value;
    const corSuperficie = document.getElementById('corSuperficie').value;
    const corTexto = document.getElementById('corTexto').value;
    const dataEntrega = document.getElementById('dataEntrega').value;
    const valorServico = parseFloat(document.getElementById('valorServico').value);
    const valorSinal = parseFloat(document.getElementById('valorSinal').value);

    if (clienteIndex >= 0 && clienteIndex < clientes.length && altura && largura && frase && corSuperficie && corTexto && dataEntrega && valorServico && valorSinal) {
        if (valorSinal < MIN_SIGNAL * valorServico) {
            alert('O valor do sinal deve ser pelo menos 50% do valor do serviço.');
            return;
        }

        encomendas.push({
            cliente: clientes[clienteIndex],
            altura,
            largura,
            frase,
            corSuperficie,
            corTexto,
            dataEntrega,
            valorServico,
            valorSinal
        });
        alert('Encomenda cadastrada com sucesso!');
        document.getElementById('clienteIndex').value = '';
        document.getElementById('altura').value = '';
        document.getElementById('largura').value = '';
        document.getElementById('frase').value = '';
        document.getElementById('corSuperficie').value = '';
        document.getElementById('corTexto').value = '';
        document.getElementById('dataEntrega').value = '';
        document.getElementById('valorServico').value = '';
        document.getElementById('valorSinal').value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function calcularValorPlaca() {
    const altura = parseFloat(document.getElementById('calcAltura').value);
    const largura = parseFloat(document.getElementById('calcLargura').value);
    const frase = document.getElementById('calcFrase').value;

    if (altura && largura && frase) {
        const area = altura * largura;
        const custoMaterial = area * CUSTO_MATERIAL;
        const custoLettering = frase.length * CUSTO_LETTERING;
        const valorPlaca = custoMaterial + custoLettering;
        document.getElementById('valorPlaca').textContent = `Valor da placa: R$ ${valorPlaca.toFixed(2)}`;
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function calcularPrazoEntrega() {
    const prazoEntrega = Math.ceil(encomendas.length / 5);
    document.getElementById('prazoEntrega').textContent = `Prazo de entrega: ${prazoEntrega} dias`;
}

function desenharPlaca() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const ultimaEncomenda = encomendas[encomendas.length - 1];

    if (!ultimaEncomenda) {
        alert('Nenhuma encomenda cadastrada.');
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ultimaEncomenda.corSuperficie === 'Branca' ? '#ffffff' : '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = ultimaEncomenda.corTexto.toLowerCase();
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(ultimaEncomenda.frase, canvas.width / 2, canvas.height / 2);
}

// Constantes utilizadas no cálculo
const MIN_SIGNAL = 0.5;
const CUSTO_MATERIAL = 43.90;
const CUSTO_LETTERING = 0.38;
