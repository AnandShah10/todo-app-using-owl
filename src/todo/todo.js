/** @odoo-module **/

// import { Component } from "@odoo/owl";
const {Component,xml} = owl;
import { TodoList } from "./todo_list.js";
import { useTodoStore } from "./todo_store.js";
import { Layout } from "../layout.js";


export class Todo extends Component {
    static template = xml`  <t t-name="todo_app.Todo">
        <Layout contentClass="'d-flex align-items-start p-1'">
            <t t-set-slot="control-panel">
                <button class="btn btn-primary btn-sm m-2" t-on-click="addNewList">
                    New Todo List
                </button>
            </t>
            <t t-foreach="store.lists" t-as="list" t-key="list.id">
                <TodoList list="list"/>
            </t>
        </Layout>
    </t>`;
    static components = { TodoList, Layout };
    setup()
    {
     this.store = useTodoStore();
    }
    addNewList()
    {
        this.store.createList();
    }
}