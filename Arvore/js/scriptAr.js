class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(root) {
        this.root = new Node(root);
    }

    insert(value) {
        this.root = this._insertRecursive(this.root, value);
    }

    _insertRecursive(node, value) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this._insertRecursive(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertRecursive(node.right, value);
        }

        return node;
    }

    render(container) {
        container.innerHTML = ''; // Clear the container before rendering the tree
        this._renderRecursive(this.root, container);
    }

    _renderRecursive(node, container) {
        let nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.innerHTML = `<span>${node.value}</span>`;
        container.appendChild(nodeElement);

        if (node.left) {
            let leftChildElement = document.createElement('div');
            leftChildElement.className = 'left-child';
            nodeElement.appendChild(leftChildElement);
            this._renderRecursive(node.left, leftChildElement);
        }

        if (node.right) {
            let rightChildElement = document.createElement('div');
            rightChildElement.className = 'right-child';
            nodeElement.appendChild(rightChildElement);
            this._renderRecursive(node.right, rightChildElement);
        }
    }
}

let tree = new Tree(10);

document.getElementById('insert-button').addEventListener('click', () => {
    let value = parseInt(document.getElementById('input-value').value);
    tree.insert(value);
    tree.render(document.getElementById('tree-visualization'));
});