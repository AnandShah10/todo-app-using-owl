/**@odoo-module**/
// import { Component } from "@odoo/owl";
const {Component,xml,useState} = owl;
import { useAutofocus } from "../utils.js";
import { TodoItem } from "./todo_item.js";
import { useTodoStore } from "./todo_store.js";


export class TodoList extends Component
{
    static template = xml`  <t t-name="todo_app.TodoList">
        <div class="o-todolist border m-1 p-2">
        <input type="text" t-if="isEditing.value" t-model="newDescription.value" class="form-control"/>
        <h3 t-else=""><t t-esc="props.list.name"/>
            <span role="button" class="fa fa-edit ms-3 text-primary" t-on-click="startEdit"/>
            <span role="button" class="fa fa-remove ms-3 text-danger" t-on-click="onRemove"></span>
        </h3>
            <button t-if="isEditing.value" class="btn btn-success btn-sm me-2" t-on-click="finishEdit">Save</button>
            <button t-if="isEditing.value" class="btn btn-secondary btn-sm" t-on-click="cancelEdit">Cancel</button>
            <input type="text" placeholder="Add a Todo"
            t-ref="input" class="form-control mb-3"
            t-on-keyup="addTodo"/>
            <div class="m-2">
                <t t-foreach="props.list.todos" t-as="todo" t-key="todo.id">
                    <TodoItem todo="todo"/>
                </t>
            </div>
        </div>
    </t>`;
    static components = { TodoItem };
    static props = { list : Object };

    setup()
    {
        this.store = useTodoStore();
        useAutofocus("input");
        this.isEditing = useState({ value: false });
        this.newDescription = useState({ value: this.props.list.name });
    }
    addTodo(ev)
    {
        if(ev.keyCode === 13 && ev.target.value != '')
        {
            this.store.addTodo(this.props.list.id,ev.target.value);
            ev.target.value = '';
        }
    }
    onRemove() {
        const listId = this.props.list.id;
        this.store.removeList(listId);
  }
  startEdit() {
    this.isEditing.value = true;
}

finishEdit() {
    this.store.updateListDescription(this.props.list.id, this.newDescription.value.trim());
    this.isEditing.value = false;
}

cancelEdit() {
    this.newDescription.value = this.props.list.name;
    this.isEditing.value = false;
}

}