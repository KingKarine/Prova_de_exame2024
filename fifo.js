// Declaração da fila FIFO como um array vazio
const fifoQueue = [];

// Função para adicionar um número à fila
function addNumber() {
    // Obtém o valor do input do número pelo ID 'numberInput'
    const numberInput = document.getElementById('numberInput');
    const number = numberInput.value;

    // Verifica se o campo do input está vazio
    if (number === '') {
        // Alerta o usuário se o campo estiver vazio
        alert('Por favor, insira um número.');
        return;
    }

    // Adiciona o número ao final da fila
    fifoQueue.push(number);
    // Limpa o campo do input após a adição
    numberInput.value = '';
    // Atualiza a visualização da fila
    renderQueue();
}

// Função para remover um número da fila
function removeNumber() {
    // Verifica se a fila está vazia
    if (fifoQueue.length === 0) {
        // Alerta o usuário se a fila estiver vazia
        alert('A fila está vazia.');
        return;
    }

    // Remove o primeiro elemento da fila
    fifoQueue.shift();
    // Atualiza a visualização da fila
    renderQueue();
}

// Função para renderizar a fila na tela
function renderQueue() {
    // Obtém o elemento de visualização da fila pelo ID 'vvisualization'
    const vvisualization = document.getElementById('vvisualization');
    // Limpa o conteúdo atual do elemento de visualização
    vvisualization.innerHTML = '';

    // Itera sobre cada número na fila
    fifoQueue.forEach(number => {
        // Cria um novo elemento div para representar o número
        const circle = document.createElement('div');
        // Define a classe CSS 'circle' para o novo elemento
        circle.className = 'circle';
        // Define o texto do novo elemento como o número
        circle.textContent = number;
        // Adiciona o novo elemento ao elemento de visualização
        vvisualization.appendChild(circle);
    });
}

