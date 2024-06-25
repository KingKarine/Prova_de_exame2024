// Declaração da pilha LIFO como um array vazio
const lifoStack = [];

// Função para adicionar um número à pilha
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

    // Adiciona o número ao topo da pilha
    lifoStack.push(number);
    // Limpa o campo do input após a adição
    numberInput.value = '';
    // Atualiza a visualização da pilha
    renderStack();
}

// Função para remover um número da pilha
function removeNumber() {
    // Verifica se a pilha está vazia
    if (lifoStack.length === 0) {
        // Alerta o usuário se a pilha estiver vazia
        alert('A pilha está vazia.');
        return;
    }

    // Remove o elemento do topo da pilha
    lifoStack.pop();
    // Atualiza a visualização da pilha
    renderStack();
}

// Função para renderizar a pilha na tela
function renderStack() {
    // Obtém o elemento de visualização da pilha pelo ID 'visualization'
    const visualization = document.getElementById('visualization');
    // Limpa o conteúdo atual do elemento de visualização
    visualization.innerHTML = '';

    // Itera sobre cada número na pilha
    lifoStack.forEach(number => {
        // Cria um novo elemento div para representar o número
        const circle = document.createElement('div');
        // Define a classe CSS 'circle' para o novo elemento
        circle.className = 'circle';
        // Define o texto do novo elemento como o número
        circle.textContent = number;
        // Adiciona o novo elemento ao elemento de visualização
        visualization.appendChild(circle);
    });
}
