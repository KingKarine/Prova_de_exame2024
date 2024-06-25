
class ArvoreNode {
    constructor(value) {
        this.value = value; // Valor armazenado no nó
        this.left = null;   // Referência para o nó filho à esquerda
        this.right = null;  // Referência para o nó filho à direita
    }
}

// Raiz da árvore inicializada como null
let treeRoot = null;

// Função para inserir um nó na árvore
function insertNode() {
    // Obtém o valor do input e converte para um número inteiro
    const value = parseInt(document.getElementById('arvore-input').value);
    if (!isNaN(value)) {
        // Insere o valor na árvore e atualiza a raiz
        treeRoot = insertArvore(treeRoot, value);
        // Limpa o campo do input
        document.getElementById('arvore-input').value = '';
        renderArvore();
    } else {
        // Alerta o usuário se o valor não for um número válido
        alert('Por favor, insira um número válido.');
    }
}

// Função recursiva para inserir um valor na árvore
function insertArvore(node, value) {
    if (node === null) {
        // Cria um novo nó se o nó atual for null
        return new ArvoreNode(value);
    }
    if (value < node.value) {
        // Insere no subárvore esquerda se o valor for menor
        node.left = insertArvore(node.left, value);
    } else if (value > node.value) {
        // Insere no subárvore direita se o valor for maior
        node.right = insertArvore(node.right, value);
    }
    return node;
}

// Função para remover um nó da árvore
function removeNode() {
    // Obtém o valor do input e converte para um número inteiro
    const value = parseInt(document.getElementById('arvore-input').value);
    if (!isNaN(value)) {
        // Remove o valor da árvore e atualiza a raiz
        treeRoot = deleteNode(treeRoot, value);
        // Limpa o campo do input
        document.getElementById('arvore-input').value = '';
        // Atualiza a visualização da árvore
        renderArvore();
    } else {
        // Alerta o usuário se o valor não for um número válido
        alert('Por favor, insira um número válido.');
    }
}

// Função recursiva para remover um valor da árvore
function deleteNode(node, value) {
    if (node === null) {
        return node;
    }
    if (value < node.value) {
        // Remove do subárvore esquerda se o valor for menor
        node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
        // Remove do subárvore direita se o valor for maior
        node.right = deleteNode(node.right, value);
    } else {
        // Caso o valor seja encontrado, há três casos possíveis:
        if (node.left === null) {
            // Nó com apenas um filho ou nenhum filho (direita)
            return node.right;
        } else if (node.right === null) {
            // Nó com apenas um filho ou nenhum filho (esquerda)
            return node.left;
        }
        // Nó com dois filhos: obtém o menor valor do subárvore direita
        node.value = minValue(node.right);
        // Remove o menor valor do subárvore direita
        node.right = deleteNode(node.right, node.value);
    }
    return node;
}

// Função para encontrar o menor valor em uma subárvore
function minValue(node) {
    let min = node.value;
    while (node.left !== null) {
        min = node.left.value;
        node = node.left;
    }
    return min;
}

// Função para renderizar a árvore na tela
function renderArvore() {
    const container = document.getElementById('arvore-container');
    container.innerHTML = '';

    if (treeRoot) {
        const width = 600;
        const height = 400;
        const svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("background-color", "#b126a5");

        // Cria uma hierarquia a partir da raiz da árvore
        const root = d3.hierarchy(treeRoot, d => [d.left, d.right].filter(n => n !== null));
        // Cria um layout de árvore com tamanho definido
        const arvoreLayout = d3.tree().size([width - 40, height - 40]);
        const arvoreData = arvoreLayout(root);

        // Desenha as ligações entre os nós
        const links = svg.selectAll(".link")
            .data(arvoreData.links())
            .enter().append("line")
            .attr("class", "link")
            .attr("x1", d => d.source.x + 20)
            .attr("y1", d => d.source.y + 20)
            .attr("x2", d => d.target.x + 20)
            .attr("y2", d => d.target.y + 20)
            .attr("stroke", "#ffffff");

        // Desenha os nós da árvore
        const nodes = svg.selectAll(".node")
            .data(arvoreData.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x + 20},${d.y + 20})`);

        // Desenha os círculos representando os nós
        nodes.append("circle")
            .attr("r", 12)
            .attr("fill", d => d.data.found ? "#ffcc00" : "#273172")
            .attr("stroke", "#ffffff");

        // Adiciona texto aos nós
        nodes.append("text")
            .attr("dy", 4)
            .attr("fill", "#000000")
            .attr("x", d => d.children ? -12 : 12)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.value);
    }
}
