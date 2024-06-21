const linkedListContainer = document.getElementById('linked-list-container');
const insertValueInput = document.getElementById('insert-value');
const insertBtn = document.getElementById('insert-btn');
const removeValueInput = document.getElementById('remove-value');
const removeBtn = document.getElementById('remove-btn');
const linkedListVisualization = document.getElementById('linked-list-visualization');

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(value) {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
  }

  remove(value) {
    if (this.head.value === value) {
      this.head = this.head.next;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          currentNode.next = currentNode.next.next;
          break;
        }
        currentNode = currentNode.next;
      }
    }
  }
}

let linkedList = new LinkedList();

insertBtn.addEventListener('click', () => {
  let value = insertValueInput.value;
  linkedList.insert(value);
  updateLinkedListVisualization();
});

removeBtn.addEventListener('click', () => {
  let value = removeValueInput.value;
  linkedList.remove(value);
  updateLinkedListVisualization();
});

function updateLinkedListVisualization() {
  linkedListVisualization.innerHTML = '';
  renderLinkedList(linkedList.head, linkedListVisualization);
}

function renderLinkedList(node, container) {
  let nodeElement = document.createElement('div');
  nodeElement.className = 'node';
  nodeElement.textContent = node.value;
  container.appendChild(nodeElement);

  if (node.next) {
    renderLinkedList(node.next, container);
  }
}