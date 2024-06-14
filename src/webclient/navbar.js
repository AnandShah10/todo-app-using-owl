/** @odoo-module **/

// import { Component } from "@odoo/owl";
const { Component,xml } = owl;
import { useTodoStore } from "../todo/todo_store.js";

export class Navbar extends Component{
    static template = xml`<t t-name="todo_app.Navbar">
    <div class="o-navbar text-white d-flex align-items-center">
        <t t-foreach="props.apps" t-as="app" t-key="app.id">
            <span type="button" class="p-2"
                  t-att-class="{'o-active-app': app.id === props.currentApp}"
                  t-on-click="() => this.props.selectApp(app.id)">
                <t t-out="app.name"/>
            </span>
            <span class="flex-grow-1"/>
            <span class="badge bg-dark p-2 m-1">
                <t t-set="numbers" t-value="todoStore.getNumbers()"/>Todos:
                <t t-esc="numbers.Completed"/>/
                <t t-esc="numbers.total"/>
            </span>
        </t>
    </div>
</t>`;
    static props = {
        currentApp : String,
        apps : Array,
        selectApp : Function,
    };
    setup()
    {
        this.todoStore = useTodoStore();
    }
}