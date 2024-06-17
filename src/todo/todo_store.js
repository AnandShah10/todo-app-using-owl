/**@odoo-module**/
// import { useEnv ,useState } from "@odoo/owl";
const {useEnv,useState} = owl;
const LOCAL_STORAGE_KEY = "todo_app_data";
export class TodoStore {
    static nextId = 1;
    static nextTodoId =1;
    constructor()
    {
    this.lists = this.loadFromLocalStorage();
    }
    saveToLocalStorage() {
        const data = {
            lists: this.lists,
            nextId: TodoStore.nextId,
            nextTodoId: TodoStore.nextTodoId,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (data) {
            const parsedData = JSON.parse(data);
            TodoStore.nextId = parsedData.nextId;
            TodoStore.nextTodoId = parsedData.nextTodoId;
            parsedData.lists.forEach(list => {
                list.todos.forEach(todo => {
                    if (!todo.hasOwnProperty('dueDate')) {
                        todo.dueDate = ''; // Assign a default value
                    }
                });
            });
            return parsedData.lists;
        }
        return [];
    }
    // getOverdueTodos() {
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0);
    //     const overdueTodos = [];

    //     for (let list of this.lists) {
    //         for (let todo of list.todos) {
    //             if (todo.dueDate && new Date(todo.dueDate) < today && !todo.isCompleted) {
    //                 overdueTodos.push(todo);
    //             }
    //         }
    //     }

    //     return overdueTodos;
    // }
    createList()
    {
    const id = TodoStore.nextId++;
    this.lists.push({id,name:`List ${id}`,todos: []});
    // this.saveToLocalStorage();
    }
    removeList(listId)
    {
        const list = this.lists.find((l)=>l.id === listId);
        this.lists.splice(list,1);
        this.saveToLocalStorage();
    }
    addTodo(listId,description)
    {
        const list = this.lists.find((l)=>l.id === listId);
        const todo = {
            id : TodoStore.nextTodoId++,
            listId,
            description,
            isCompleted :false,
            dueDate: '',
        };
        list.todos.push(todo);
        this.saveToLocalStorage();
    }
    toggleTodo(listId,todoId)
    {
        const list = this.lists.find((l)=>l.id === listId);
        const todo = list.todos.find((t)=>t.id === todoId);
        todo.isCompleted = !todo.isCompleted;
        this.saveToLocalStorage();
    }
    removeTodo(listId,todoId)
    {
        const list = this.lists.find((l)=>l.id === listId);
        const index = list.todos.find((t)=>t.id === todoId);
        list.todos.splice(index,1);
        this.saveToLocalStorage();
    }
    updateTodoDescription(listId, todoId, newDescription) {
        const list = this.lists.find(list => list.id === listId);
        const todo = list.todos.find(todo => todo.id === todoId);
        todo.description = newDescription;
        this.saveToLocalStorage();
    }

    updateListDescription(listId, newDescription) {
        const list = this.lists.find(list => list.id === listId);
        list.name = newDescription;
        this.saveToLocalStorage();
    }
    updateTodoDueDate(listId, todoId, dueDate) {
        const list = this.lists.find(list => list.id === listId);
        const todo = list.todos.find(todo => todo.id === todoId);
        todo.dueDate = dueDate;
        this.saveToLocalStorage();
    }
    getNumbers()
    {
        let Completed = 0;
        let total =0;
        for(let list of this.lists)
        {
            total += list.todos.length;
            for(let todo of list.todos)
            {
              if(todo.isCompleted)
              {
                 Completed++;
              }
            }
        }
        return { Completed,total };
    }
}
export function useTodoStore()
{
    const env = useEnv();
    return useState(env.todoStore);
}