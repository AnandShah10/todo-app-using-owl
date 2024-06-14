/**@odoo-module**/
// import { Component } from "@odoo/owl";
const {Component,xml} = owl;
import { useAutofocus } from "../utils.js";
import { TodoItem } from "./todo_item.js";
import { useTodoStore } from "./todo_store.js";


export class TodoList extends Component
{
    static template = xml`  <t t-name="todo_app.TodoList">
        <div class="o-todolist border m-1 p-2">
        <h3><t t-esc="props.list.name"/>
            <span role="button" class="fa fa-remove ms-3 text-danger" t-on-click="onRemove"></span>
        </h3>
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

}