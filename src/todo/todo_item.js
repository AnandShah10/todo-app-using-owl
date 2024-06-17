/**@odoo-module**/
// import { Component } from "@odoo/owl";
const {Component,xml,useState} = owl;
import { useTodoStore } from "./todo_store.js";

export class TodoItem extends Component{
    static template = xml` <t t-name="todo_app.TodoItem">
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
            t-att-id="props.todo.id" t-att-checked="props.todo.isCompleted"
            t-on-change="onChange"/>
            <label t-att-for="props.todo.id"
                   t-att-class="props.todo.isCompleted ? 'text-decoration-line-through text-muted' : ''">
                <span t-esc="props.todo.id" class="me-2 text-primary fw-bold"/> 
                <span t-esc="props.todo.description"  t-if="!isEditing.value" class="me-2"/>
                <input type="text" t-if="isEditing.value" t-model="newDescription.value" class="form-control d-inline-block" style="width: auto;"/>
                <small t-if="props.todo.dueDate &amp;&amp; !isEditing.value" t-att-class="isPastDue() ? 'text-danger me-2' : 'text-muted me-2'">Due: <t t-esc="props.todo.dueDate"/></small>
            </label>
            <input type="date" t-if="isEditing.value" t-model="newDueDate.value" class="form-control d-inline-block" style="width: auto;"/>
            <span role="button" class="bi bi-edit ms-3 text-primary" t-on-click="startEdit" t-if="!isEditing.value">✏️</span>
            <span role="button" class="bi bi-trash ms-3 text-danger" t-on-click="onRemove">🗑</span>
            <button t-if="isEditing.value" class="btn btn-success btn-sm me-2" t-on-click="finishEdit">✅</button>
            <button t-if="isEditing.value" class="btn btn-secondary btn-sm" t-on-click="cancelEdit">✖️</button>
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
                dueDate: { type: String, optional: true },
            },
        },
    };
    setup()
    {
        this.store = useTodoStore();
        this.isEditing = useState({ value: false });
        this.newDescription = useState({ value: this.props.todo.description });
        this.newDueDate = useState({ value: this.props.todo.dueDate });
        this.isPastDue = () => {
            const dueDate = new Date(this.props.todo.dueDate);
            const today = new Date();
            // Ensure to set time to 00:00:00 to only compare dates
            dueDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            return dueDate < today;
        };
         // Check if due date is passed and notify
         if (this.isPastDue()) {
            this.notifyOverdue();
        }
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
  startEdit() {
    this.isEditing.value = true;
}

finishEdit() {
    this.store.updateTodoDescription(this.props.todo.listId, this.props.todo.id, this.newDescription.value.trim());
    this.store.updateTodoDueDate(this.props.todo.listId, this.props.todo.id, this.newDueDate.value);
    this.isEditing.value = false;
}

cancelEdit() {
    this.newDescription.value = this.props.todo.description;
    this.newDueDate.value = this.props.todo.dueDate;
    this.isEditing.value = false;
}
  // Notify if the todo is overdue
  notifyOverdue() {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Todo Overdue", {
            body: `The todo "${this.props.todo.description}" is overdue!`,
            // icon: "due.png" // Optional: add an icon path
        });
    }
}
}