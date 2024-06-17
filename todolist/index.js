import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';

export class TodoList extends LitElement {
  static properties = {
    todoList: {},
    title: {}
  };

  static styles = css`
    input {
      width: 85%;
      padding: 10px 0 10px 10px;
    }
    .add > button {
      width: 10%
    }
    .todo-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #6C7BFF;
    }
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    ul {
      list-style-type: none; /* Quitar los puntos de la lista */
      padding: 0;
    }
    li {
      background: #fff;
      margin: 5px 0;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button {
      background: #1423AB;
      border: none;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background: #1423AB;
    }
    
  `


  constructor() {
    super();
    this.todoList = [
      { id: 1, task: 'Todo 1' },
      { id: 2, task: 'Todo 2' }
    ];
    this.title = "TODO1"
  }



  render() {
    return html`
      <div class="todo-container">
        <h2>${this.title}</h2>
        <slot name="header"></slot>
        <div class="row add">
          <input id="newTask" type="text" placeholder="Nuevo item" @keyup="${this._handleKeyup}" />
          <button @click="${this._addTodo}">+</button>
        </div>
        <ul>
          ${repeat(this.todoList, todo => todo.id, todo => html`
            <li>
              ${todo.task}
              <button @click="${() => this._removeTodo(todo.id)}">-</button>
            </li>
          `)}
        </ul>
        <slot name="footer"></slot>
      </div>
    `;
  }

  _handleKeyup(event) {
    if (event.key === 'Enter') {
      this._addTodo();
    }
  }

  _addTodo() {
    const input = this.shadowRoot.getElementById('newTask');
    const task = input.value.trim();
    if (task) {
      this.todoList = [
        ...this.todoList,
        { id: Date.now(), task }
      ];
      input.value = '';
    }
  }

  _removeTodo(id) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
  }
}


customElements.define('todo-list', TodoList);
