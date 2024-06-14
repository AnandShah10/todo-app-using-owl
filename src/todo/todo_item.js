/**@odoo-module**/
// import { Component } from "@odoo/owl";
const {Component,xml} = owl;
import { useTodoStore } from "./todo_store.js";

export class TodoItem extends Component{
    static template = xml` <t t-name="todo_app.TodoItem">
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
            t-att-id="props.todo.id" t-att-checked="props.todo.isCompleted"
            t-on-change="onChange"/>
            <label t-att-for="props.todo.id"
                   t-att-class="props.todo.isCompleted ? 'text-decoration-line-through text-muted' : ''">
                    <t t-esc="props.todo.id"/>
                <t t-esc="props.todo.description"/>
            </label>
            <span role="button" class="bi bi-trash ms-3 text-danger" t-on-click="onRemove">🗑</span>
        </div>
    </t>`;
    static props = {
        todo : {
            type : Object,
            shape : {
                id : Number,
                listId : Number,
                description : String,
                isCompleted : Boolean,
            },
        },
    };
    setup()
    {
        this.store = useTodoStore();
    }
    onChange()
    {
        const todo= this.props.todo;
        this.store.toggleTodo(todo.listId,todo.id);
    }
    onRemove() {
        const todo = this.props.todo;
        this.store.removeTodo(todo.listId, todo.id);
  }
}