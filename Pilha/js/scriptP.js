const stackContainer = document.getElementById('stack-container');
const pushValueInput = document.getElementById('push-value');
const pushBtn = document.getElementById('push-btn');
const popBtn = document.getElementById('pop-btn');
const stackVisualization = document.getElementById('stack-visualization');

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.pop();
  }
}

let stack = new Stack();

pushBtn.addEventListener('click', () => {
  let value = pushValueInput.value;
  stack.push(value);
  updateStackVisualization();
});

popBtn.addEventListener('click', () => {
  stack.pop();
  updateStackVisualization();
});

function updateStackVisualization() {
  stackVisualization.innerHTML = '';
  renderStack(stack.items, stackVisualization);
}

function renderStack(items, container) {
  for (let item of items) {
    let itemElement = document.createElement('div');
    itemElement.className = 'node';
    itemElement.textContent = item;
    container.appendChild(itemElement);
  }
}